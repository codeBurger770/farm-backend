const express = require('express')

const authController = require('../controllers/authController.js')

const authRouter = express.Router()

authRouter.post('/auth/signup-1', authController.signup1)
authRouter.post('/auth/signup-2', authController.signup2)
authRouter.post('/auth/signin', authController.signin)
authRouter.post('/auth/signout', authController.signout)
authRouter.post('/auth/refresh-tokens', authController.refreshTokens)
authRouter.post('/auth/change-password-1', (req, res) => res.send('/auth/change-password-1'))
authRouter.post('/auth/change-password-2', (req, res) => res.send('/auth/change-password-2'))

module.exports = authRouter
