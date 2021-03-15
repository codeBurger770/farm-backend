const express = require('express')

const authController = require('../controllers/authController.js')

const authRouter = express.Router()

authRouter.post('/auth/signup-1', authController.signup1)
authRouter.post('/auth/signup-2', authController.signup2)
authRouter.post('/auth/signin', authController.signin)
authRouter.post('/auth/signout', authController.signout)
authRouter.post('/auth/refresh-tokens', authController.refreshTokens)
authRouter.post('/auth/change-password-1', authController.changePassword1)
authRouter.post('/auth/change-password-2', authController.changePassword2)

module.exports = authRouter
