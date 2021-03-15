const express = require('express')

const projectsController = require('../controllers/projectsController.js')
const eventsAndRiskEventsController = require('../controllers/eventsAndRiskEventsController.js')
const logicalOperatorsController = require('../controllers/logicalOperatorsController.js')
const activitiesController = require('../controllers/activitiesController.js')

const projectsRouter = express.Router()

projectsRouter.post('/projects', projectsController.create)
projectsRouter.get('/projects', projectsController.readAll)
projectsRouter.put('/projects/:projectId', projectsController.update)
projectsRouter.delete('/projects/:projectId', projectsController.delete)

projectsRouter.post('/projects/:projectId/events-and-risk-events', eventsAndRiskEventsController.create)
projectsRouter.get('/projects/:projectId/events-and-risk-events', eventsAndRiskEventsController.readAll)
projectsRouter.put('/projects/:projectId/events-and-risk-events/:eventOrRiskEventId', eventsAndRiskEventsController.update)
projectsRouter.delete('/projects/:projectId/events-and-risk-events/:eventOrRiskEventId', eventsAndRiskEventsController.delete)

projectsRouter.post('/projects/:projectId/logical-operators', logicalOperatorsController.create)
projectsRouter.get('/projects/:projectId/logical-operators', logicalOperatorsController.readAll)
projectsRouter.put('/projects/:projectId/logical-operators/:logicalOperatorId', logicalOperatorsController.update)
projectsRouter.delete('/projects/:projectId/logical-operators/:logicalOperatorId', logicalOperatorsController.delete)

projectsRouter.post('/projects/:projectId/activities', activitiesController.create)
projectsRouter.get('/projects/:projectId/activities', activitiesController.readAll)
projectsRouter.put('/projects/:projectId/activities/:activityId', activitiesController.update)
projectsRouter.delete('/projects/:projectId/activities/:activityId', activitiesController.delete)

module.exports = projectsRouter
