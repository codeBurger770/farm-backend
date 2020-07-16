const express = require('express')
const dotenv = require('dotenv')

const authRouter = require('./routers/authRouter.js')

dotenv.config()

const app = express()

app.use('/api', authRouter)

app.listen(process.env.APP_PORT, async () => {
    console.log(`Express запустился на ${process.env.APP_PORT} порту!`)
})
