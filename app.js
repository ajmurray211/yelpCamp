const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const app = express()
dotenv.config()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req,res)=> {
    res.render('home')
})

app.listen(process.env.PORT, () => [
    console.log(`Listening on port: ${process.env.PORT}`)
])