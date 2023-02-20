const router = require('express').Router()
const tripController = require('../Controller/tripController')
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

router.post('/addTrip', upload.array('images', 12), tripController.createTrip)

router.get('/getAlltrips', tripController.getAllTrips)

router.get('/getTrip/:tripId', tripController.getTrip)

router.put('/enrollToTrip/:tripId', tripController.enrollToTrip)

module.exports = router
