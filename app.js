const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const authRouter = require('./routers/authRouter.js')

dotenv.config()

const app = express()

app.use('/api', authRouter)

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}, () => {
    console.log(`Mongoose запустился по адресу ${process.env.DB_URI}!`)

    app.listen(process.env.APP_PORT, async () => {
        console.log(`Express запустился на ${process.env.APP_PORT} порту!`)
    })
})
