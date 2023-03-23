// define data schema : restaurant
const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
  "name": {
    type: String,
    require: true,
  },
  "name_en": {
    type: String,
  },
  "category": {
    type: String,
  },
  "image": {
    type: String,
  },
  "location": {
    type: String,
  },
  "phone": {
    type: String,
  },
  "google_map": {
    type: String,
  },
  "rating": {
    type: Number,
    require: true,
  },
  "description": {
    type: String,
    require: true,
  },
})

module.exports = mongoose.model('Restaurant', restaurantSchema)