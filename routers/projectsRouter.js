const express = require('express')

const projectsController = require('../controllers/projectsController.js')

const projectsRouter = express.Router()

projectsRouter.post('/projects', projectsController.create)
projectsRouter.get('/projects', projectsController.readAll)
projectsRouter.put('/projects/:projectId', projectsController.update)
projectsRouter.delete('/projects/:projectId', projectsController.delete)

module.exports = projectsRouter
