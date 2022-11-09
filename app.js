const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose')
const Campground = require('./models/campgrounds')

const app = express()
dotenv.config()
mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error'))
db.once('open', () => {
    console.log('Database connected')
})

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    res.render('home')
})
app.get('/makecampground', async (req, res) => {
    const camp = new Campground({ title: 'My backyard',description: 'cheap camping', price: 0 })
    await camp.save()
    res.send(camp)
})

app.listen(process.env.PORT, () => [
    console.log(`Listening on port: ${process.env.PORT}`)
])