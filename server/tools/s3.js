
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

  const storyName = randomImageName()
  const params = {
    Bucket: process.env.BUCKET_NAME,
    Key: storyName,
    Body: file.buffer,
    ContentType: file.mimetype
  }

  const command = new PutObjectCommand(params)
  await s3.send(command)
  return 'success'
}

module.exports = { getImagesfromS3, putImagestoS3 }
