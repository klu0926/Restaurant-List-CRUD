// Restaurants List App Version 1.0.0
// Get Modules
const express = require("express")
const exphbs = require("express-handlebars")
const Handlebars = require('handlebars')
const mongoose = require('mongoose')
const restaurant = require("./models/restaurant")
const Restaurant = require('./models/restaurant')
const helpers = require("./public/javascripts/helpers")

// Use dotenv when developing
if (process.env.NODE_ENV !== "production") {
  require('dotenv').config()
}
// 資料庫
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// create express app
const app = express()

// set up app view engine
app.engine('handlebars', exphbs({
  helpers: helpers,
  defaultLayout: "main"
}))
app.set('view engine', 'handlebars')

// set use public folder
app.use(express.static('public'))
// set use urlencoded for reading POST data
app.use(express.urlencoded({ extended: true }))

// set up routes
// 轉去瀏覽全部餐廳
app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

// 瀏覽全部
app.get('/restaurants', (req, res) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate')

  Restaurant.find()
    .lean()
    .then(restaurants => {
      res.render('index', { restaurants })
    })
    .catch(error => {
      console.log(error)
    })
})

// 新增餐廳 頁面 (這route必須寫在 "瀏覽一個" 前面)
app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

// 瀏覽一個
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate')

  Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      res.render('detail', { restaurant })
    })
    .catch(error => {
      console.log(error)
    })
})

// 新增餐廳 POST
app.post('/restaurants/new', (req, res) => {
  // get req.body from POST
  const data = req.body
  // set default image
  if (data.image === "") {
    data.image = "/images/default.jpg"
  }
  // add new restaurant data
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
    .then(() => {
      res.redirect("/restaurants")
    })
    .catch(error => {
      console.log(error)
    })
})

// 修改 GET
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  Restaurant.findById(id)
    .lean()
    .then(restaurant => {
      res.render('edit', { restaurant })
    })
    .catch(error => {
      console.log(error)
    })
})


// 修改 POST
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const data = req.body
  // set default image if needed
  if (data.image === "") {
    data.image = "/images/default.jpg"
  }
  // modify restaurant, and save to data
  return Restaurant.findById(id)
    .then(restaurant => {
      restaurant.name = data.name,
        restaurant.name_en = data.name_en,
        restaurant.category = data.category,
        restaurant.image = data.image,
        restaurant.location = data.location,
        restaurant.phone = data.phone,
        restaurant.google_map = data.google_map,
        restaurant.rating = data.rating,
        restaurant.description = data.description,
        restaurant.save()
    })
    .then(() => {
      res.redirect(`/restaurants/${id}/`)
    })
    .catch(error => {
      console.log(error)
    })

})

// 刪除
app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  // delete restaurant data
  Restaurant.findById(id)
    .then(restaurant => {
      restaurant.remove()
    })
    .then(() => {
      // 不要存cache, revalidate page before showing to user
      res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
      res.redirect('/restaurants')
    })
    .catch(error => {
      console.log(error)
    })
})


// server start and listen
app.listen(3000, () => {
  console.log('sever is live on http://localhost:3000')
  console.log('connecting to mongoDB...')
})



