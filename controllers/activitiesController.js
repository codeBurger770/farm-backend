const ProjectModel = require('../models/projectModel')
const EventOrRiskEventModel = require('../models/eventOrRiskEventModel')
const LogicalOperatorModel = require('../models/logicalOperatorModel')
const ActivityModel = require('../models/activityModel')

exports.create = async function (req, res) {
    const { userId } = req
    const { projectId } = req.params
    const { eventOrRiskEventOrLogicalOperatorId, type, description, cost, probability, consequences } = req.body

    const project = await ProjectModel.findOne({
        userId,
        _id: projectId
    })

    project.createdActivities++
    const tag = `A${project.createdActivities}`
    await project.save()

    if (type === 'DELETE_LOGICAL_OPERATOR') {
        const logicalOperator = await LogicalOperatorModel.findOne({
            projectId: project._id,
            _id: eventOrRiskEventOrLogicalOperatorId
        })

        const activity = new ActivityModel({
            projectId: project._id,
            eventOrRiskEventId: null,
            logicalOperatorId: logicalOperator._id,
            tag,
            type,
            description,
            cost,
            probability: 0,
            consequences: 0
        })
        await activity.save()

        return res.json({
            success: {
                id: activity._id,
                eventOrRiskEventId: activity.eventOrRiskEventId,
                logicalOperatorId: activity.logicalOperatorId,
                tag: activity.tag,
                type: activity.type,
                description: activity.description,
                cost: activity.cost,
                probability: activity.probability,
                consequences: activity.consequences
            }
        })
    } else {
        const eventOrRiskEvent = await EventOrRiskEventModel.findOne({
            projectId: project._id,
            _id: eventOrRiskEventOrLogicalOperatorId
        })

        const activity = new ActivityModel({
            projectId: project._id,
            eventOrRiskEventId: eventOrRiskEvent._id,
            logicalOperatorId: null,
            tag,
            type,
            description,
            cost,
            probability: probability || 0,
            consequences: consequences || 0
        })
        await activity.save()

        return res.json({
            success: {
                id: activity._id,
                eventOrRiskEventId: activity.eventOrRiskEventId,
                logicalOperatorId: activity.logicalOperatorId,
                tag: activity.tag,
                type: activity.type,
                description: activity.description,
                cost: activity.cost,
                probability: activity.probability,
                consequences: activity.consequences
            }
        })
    }
}

exports.readAll = async function (req, res) {
    const { userId } = req
    const { projectId } = req.params

    const project = await ProjectModel.findOne({
        userId,
        _id: projectId
    })

    const activities = await ActivityModel.find({ projectId: project._id })

    return res.json({
        success: activities.map(activity => ({
            id: activity._id,
            eventOrRiskEventId: activity.eventOrRiskEventId,
            logicalOperatorId: activity.logicalOperatorId,
            tag: activity.tag,
            type: activity.type,
            description: activity.description,
            cost: activity.cost,
            probability: activity.probability,
            consequences: activity.consequences
        }))
    })
}

exports.update = async function (req, res) {
    const { userId } = req
    const { projectId, activityId } = req.params
    const { eventOrRiskEventOrLogicalOperatorId, type, description, cost, probability, consequences } = req.body

    const project = await ProjectModel.findOne({
        userId,
        _id: projectId
    })

    if (type === 'DELETE_LOGICAL_OPERATOR') {
        const logicalOperator = await LogicalOperatorModel.findOne({
            projectId: project._id,
            _id: eventOrRiskEventOrLogicalOperatorId
        })

        const activity = await ActivityModel.findOneAndUpdate({
            projectId: project._id,
            _id: activityId
        }, {
            $set: {
                eventOrRiskEventId: null,
                logicalOperatorId: logicalOperator._id,
                type,
                description,
                cost
            }
        }, {
            new: true
        })

        return res.json({
            success: {
                id: activity._id,
                eventOrRiskEventId: activity.eventOrRiskEventId,
                logicalOperatorId: activity.logicalOperatorId,
                tag: activity.tag,
                type: activity.type,
                description: activity.description,
                cost: activity.cost,
                probability: activity.probability,
                consequences: activity.consequences
            }
        })
    } else {
        const eventOrRiskEvent = await EventOrRiskEventModel.findOne({
            projectId: project._id,
            _id: eventOrRiskEventOrLogicalOperatorId
        })

        const activity = await ActivityModel.findOneAndUpdate({
            projectId: project._id,
            _id: activityId
        }, {
            $set: {
                eventOrRiskEventId: eventOrRiskEvent._id,
                logicalOperatorId: null,
                type,
                description,
                cost,
                probability: probability || 0,
                consequences: consequences || 0
            }
        }, {
            new: true
        })

        return res.json({
            success: {
                id: activity._id,
                eventOrRiskEventId: activity.eventOrRiskEventId,
                logicalOperatorId: activity.logicalOperatorId,
                tag: activity.tag,
                type: activity.type,
                description: activity.description,
                cost: activity.cost,
                probability: activity.probability,
                consequences: activity.consequences
            }
        })
    }
}

exports.delete = async function (req, res) {
    const { userId } = req
    const { projectId, activityId } = req.params

    const project = await ProjectModel.findOne({
        userId,
        _id: projectId
    })

    const activity = await ActivityModel.findOneAndDelete({
        projectId: project._id,
        _id: activityId
    })

    return res.json({
        success: {
            id: activity._id
        }
    })
}
