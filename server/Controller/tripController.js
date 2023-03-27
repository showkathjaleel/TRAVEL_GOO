const Trip = require('../models/Trip')
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand
} = require('@aws-sdk/client-s3')
require('dotenv').config()
const crypto = require('crypto')
const sharp = require('sharp')
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner')
const { getImagesfromS3 } = require('../tools/s3')
const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
const accessKey = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey
  },
  region: bucketRegion
})

module.exports = {
  createTrip: async (req, res) => {
    const { locations, activities, departureDate, endingDate, tripName, tripDescription, totalMembers, accomodationCost, transportationCost, otherCost, totalCost, hostId } = req.body
    const tripImage = []
    const places = []
    const activity = []

    if (req.files) {
      let index = -1
      const files = req.files
      for (const file of files) {
        index++
        const randomImageName = (bytes = 32) =>
          crypto.randomBytes(bytes).toString('hex')
        const buffer = await sharp(file.buffer)
          .resize({ height: 600, width: 800, fit: 'cover', withoutEnlargement: true })
          .toBuffer()
        const imageName = randomImageName()

        const params = {
          Bucket: bucketName,
          Key: imageName,
          Body: buffer,
          ContentType: file.mimetype
        }
        const command = new PutObjectCommand(params)
        await s3.send(command)
        tripImage[index] = imageName
        places[index] = locations
        activity[index] = activities
      }
    }

    const obj = {
      tripData: {
        departureDate,
        endingDate,
        tripName,
        tripDescription,
        totalMembers
      },

      destinationData: {
        tripImages: tripImage,
        locations: places,
        activities: activity
      },

      costData: {
        accomodationCost,
        transportationCost,
        otherCost,
        totalCost
      },

      hostId
    }

    const newTrip = new Trip(obj)
    try {
      const savedTrip = await newTrip.save()
      res.status(200).json(savedTrip)
    } catch (err) {
      res.status(500).json(err)
    }
  },

  getAllTrips: async (req, res) => {
    const trips = await Trip.find({})

    function processTripImages (trips) {
      return new Promise((resolve, reject) => {
        const promises = []

        for (const trip of trips) {
          const tripPromises = trip.destinationData.tripImages.map((img, idx) => {
            return getImagesfromS3(img).then((resultUrl) => {
              trip.destinationData.tripImages[idx] = resultUrl
            })
          })

          promises.push(Promise.all(tripPromises))
        }

        Promise.all(promises)
          .then(() => {
            resolve(trips)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
    await processTripImages(trips)
    res.status(200).json({ trips })
  },

  // -----------------------------------------------------------------------//
  getTrip: async (req, res) => {
    const trip = await Trip.findById(req.params.tripId)

    function processTripImages (trip) {
      return new Promise((resolve, reject) => {
        const promises = trip.destinationData.tripImages.map((img, idx) => {
          return getImagesfromS3(img).then((resultUrl) => {
            trip.destinationData.tripImages[idx] = resultUrl
          })
        })

        Promise.all(promises)
          .then(() => {
            resolve(trip)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
    await processTripImages(trip)
    res.status(200).json({ trip })
  },

  enrollToTrip: async (req, res) => {
    try {
      const trip = await Trip.findById(req.params.tripId)
      if (!trip.JoinedMembers.includes(req.body.userId)) {
        await trip.updateOne({ $push: { JoinedMembers: req.body.userId } })
        res.status(200).json('you joined in this group')
      } else {
        res.status(200).json('you are already in this trip')
      }
    } catch (err) {
      console.log(err)
    }
  }

}
