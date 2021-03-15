const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    isConfirmed: Boolean,
    confirmationCode: String,
    numberConfirmationAttempts: Number,
    refreshToken: String,
    fingerprint: String,
})

module.exports = mongoose.model('User', userSchema)
