const story = require('../models/Story')
const { putImagestoS3 } = require('../tools/s3')

module.exports = {
  addStory: async (req, res) => {
    const { userId } = req.body
    const file = req.file

    try {
      if (file) {
        const type = file.mimetype.includes('image')
          ? 'image'
          : file.mimetype.includes('video')
            ? 'video'
            : ''
        putImagestoS3(file).then((result) => {
          console.log(result, 'resultttttttttoooooooooooooooooo')
        })
        //   return new Promise (resolve ,reject )=>{
        //   }
      }
    } catch (err) {

    }
  }
}
