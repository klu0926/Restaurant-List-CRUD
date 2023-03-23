// 資料庫初始化使用
const mongoose = require('mongoose')
const Restaurant = require('../restaurant')

// 使用json資料
const restaurantData = require('../../restaurant').results

// Use Environment variable
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

mongoose.set('strictQuery', true);

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log("creating seed...")
  let i = 0
  // create seed base on jason data
  restaurantData.forEach(data => {
    Restaurant.create({
      name: data.name,
      name_en: data.name_en,
      category: data.category,
      image: data.image,
      location: data.location,
      phone: data.phone,
      google_map: data.google_map,
      rating: data.rating,
      description: data.description,
    })
    i++
  });
  console.log(`${i} seed data created!`)
  console.log('DONE')
})