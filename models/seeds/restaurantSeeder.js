// 資料庫初始化使用
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')
const restaurantData = require('./restaurant.json').results

// Use Environment variable
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection

console.log("creating seed...")

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  // create seed base on jason data
  Restaurant.create(restaurantData)
    .then(() => {
      console.log('seed created!')
    })
    .catch(error => {
      console.log(error)
    })
})