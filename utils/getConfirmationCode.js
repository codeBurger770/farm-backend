const md5 = require('md5')

module.exports = function getConfirmationCode() {
    const min = Number.MIN_SAFE_INTEGER
    const max = Number.MAX_SAFE_INTEGER
    const randomInt = Math.floor(Math.random() * (max - min)) + min
    const hash = md5(process.env.APP_SECRET_KEY + randomInt)
    const confirmationCode = hash.slice(0, 6).toUpperCase()
    return confirmationCode
}
