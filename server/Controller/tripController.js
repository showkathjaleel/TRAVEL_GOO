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
    // +++++++++++++++++++++++++++++++++++++
    console.log(req.body, 'req.bodyyyyyyyyyyyyyyyyy')

    console.log(req.file, 'req.fileeeeeeeeeeeeeeeeee')
    // +++++++++++++++++++++++++++++++++++++
    if (req.file) {
      console.log('req.body.destinationData.tripImages il keri')
      const file = req.file

      const randomImageName = (bytes = 32) =>
        crypto.randomBytes(bytes).toString('hex')
      const buffer = await sharp(file.buffer)
        .resize({ height: 1920, width: 1080, fit: 'contain' })
        .toBuffer()
      console.log(buffer, 'bufferrrr')
      const imageName = randomImageName()

      const params = {
        Bucket: bucketName,
        Key: imageName,
        Body: buffer,
        ContentType: file.mimetype
      }
      console.log(params)
      const command = new PutObjectCommand(params)
      console.log(command)
      await s3.send(command)
      req.body.destinationData.tripImages = imageName
    }
    // +++++++++++++++++++++++++++++++++++++

    const newTrip = new Trip(req.body)
    // try {
    const savedTrip = await newTrip.save()
    res.status(200).json(savedTrip)
    // } catch (err) {
    //   res.status(500).json(err)
    // }
  },

  getAllTrips: async (req, res) => {
    console.log('**********')
    console.log('**********')
    const trips = await Trip.find({})
    res.status(200).json({ trips })
    // console.log();
  },

  getTrip: async (req, res) => {
    console.log('get a trip il keri')
    console.log(req.params.tripId, 'eq.params.tripI')
    const trip = await Trip.findById(req.params.tripId)
    console.log(trip, 'tripeeee')
    res.status(200).json({ trip })
  },

  enrollToTrip: async (req, res) => {
    try {
      console.log(req.params.tripId, 'enroll to trip il keri')
      console.log(req.body.userId)
      const trip = await Trip.findById(req.params.tripId)
      console.log(trip, '222222222')

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

//
