const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const mongoose = require('mongoose')
const { urlencoded } = require('express')
const methodOverride = require('method-override')
const morgan = require('morgan')
const ejsMate = require('ejs-mate')
const campgrounds = require('./routes/campgrounds')
const reviews = require('./routes/reviews')
const session = require('express-session')

const app = express()
dotenv.config()
mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error'))
db.once('open', () => {
    console.log('Database connected')
})

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(morgan('tiny'))
app.use(express.static(path.join(__dirname, 'public')))
const sessionConfig = {
    secret: 'thisshouldbeabettersecret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
}
app.use(session(sessionConfig))

app.use('/campgrounds', campgrounds)
app.use('/campgrounds/:id/reviews', reviews)

app.get('/', (req, res) => {
    res.render('home')
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err
    if (!err.message) err.message = 'Oh no something went wrong!'
    res.status(statusCode).render('error', { err })
})

app.listen(process.env.PORT, () => [
    console.log(`Listening on port: ${process.env.PORT}`)
])