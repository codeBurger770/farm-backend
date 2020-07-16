const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

const app = express()

app.listen(process.env.APP_PORT, async () => {
    console.log(`Express запустился на ${process.env.APP_PORT} порту!`)
})
