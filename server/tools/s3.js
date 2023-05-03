
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand
} = require('@aws-sdk/client-s3')
require('dotenv').config()
console.log(process.env.AWS_BUCKET_NAME, 'bucketname in s3.js tools')
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

const getImagesfromS3 = async (imageUrl) => {
  const getObjectParams = {
    Bucket: bucketName,
    Key: imageUrl
  }
  console.log(getObjectParams, '22222222222222222222')
  const command = new GetObjectCommand(getObjectParams)
  console.log(command, '33333333333333333333333333')
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
  return url
}

const putImagestoS3 = async (file) => {
  const randomImageName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString('hex')

  const imageName = randomImageName()
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: file.buffer,
    ContentType: file.mimetype
  }
  console.log('params', params)
  const command = new PutObjectCommand(params)
  console.log('command', command)
  const response = await s3.send(command)
  console.log(response, 'response')
  return imageName
}

const deleteImagesfromS3 = async (imageName) => {
  const params = {
    Bucket: bucketName,
    Key: imageName
  }
  console.log(params, '444444444444444444444444444444')
  const command = new DeleteObjectCommand(params)
  console.log(command, '555555555555555555555555')
  const response = await s3.send(command)
  console.log(response, '6666666666666666666666')
  return 'success'
  // const url = await getSignedUrl(s3, command, { expiresIn: 3600 })
}

module.exports = { getImagesfromS3, putImagestoS3, deleteImagesfromS3 }
