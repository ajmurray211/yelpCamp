const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campgrounds')
const campgrounds = require('../models/campgrounds')

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error'))
db.once('open', () => {
    console.log('Database seeded with stock information')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            location: `${cities[random1000].city} ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'vgbhknlm/da kaldhhgVABSNl/dma;dlsjfkahDBbfa;sdlkjhfsbg,mwseffvv;kzsjfv;se tkskbfpsukgvvp ouuabr;wfbbsperjgbs;djjbflskhhcvbpuishp;flknawlklffnzocy absuhdfna;woihfoaywgebclervcnseuivblsehrbvwlersubvwoehrbv n seliufdhbgvnsouifdzlkv',
            price
        })
        await camp.save()
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})