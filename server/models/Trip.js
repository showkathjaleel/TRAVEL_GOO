const mongoose = require('mongoose')
const TripSchema = new mongoose.Schema(
  {
    hostId: {
      type: String,
      required: true
    },
    tripData: {
      departureDate: Date,
      endingDate: Date,
      tripName: String,
      tripDescription: String,
      totalMembers: String
    },
    destinationData: {
      tripImages: [String],
      locations: [String],
      activities: [String]
    },
    costData: {
      accomodationCost: Number,
      transportationCost: Number,
      otherCost: Number,
      totalCost: Number
    },
    img: {
      type: String
    },
    JoinedMembers: {
      type: Array,
      default: []
    }

  },

  { timestamps: true }
)

module.exports = mongoose.model('Trip', TripSchema)
