const express = require('express')
const dotenv = require('dotenv')
const app = express()
dotenv.config()

app.listen(process.env.PORT, () => [
    console.log(`Listening on port: ${process.env.PORT}`)
])