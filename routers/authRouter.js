const express = require('express')

const authRouter = express.Router()

authRouter.post('/auth/signup-1', (req, res) => res.send('/auth/signup-1'))
authRouter.post('/auth/signup-2', (req, res) => res.send('/auth/signup-2'))
authRouter.post('/auth/signin', (req, res) => res.send('/auth/signin'))
authRouter.post('/auth/signout', (req, res) => res.send('/auth/signout'))
authRouter.post('/auth/refresh-tokens', (req, res) => res.send('/auth/refresh-tokens'))
authRouter.post('/auth/change-password-1', (req, res) => res.send('/auth/change-password-1'))
authRouter.post('/auth/change-password-2', (req, res) => res.send('/auth/change-password-2'))

module.exports = authRouter
