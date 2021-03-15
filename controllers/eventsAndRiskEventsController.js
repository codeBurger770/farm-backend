const ProjectModel = require('../models/projectModel')
const EventOrRiskEventModel = require('../models/eventOrRiskEventModel')

exports.create = async function (req, res) {
    const { userId } = req
    const { projectId } = req.params
    const { type, description, probability, consequences } = req.body

    const project = await ProjectModel.findOne({
        userId,
        _id: projectId
    })

    let tag = ''
    if (type === 'RISK_EVENT') {
        project.createdRiskEvents++
        tag = `RE${project.createdRiskEvents}`
    } else {
        project.createdEvents++
        tag = `E${project.createdEvents}`
    }
    await project.save()

    const eventOrRiskEvent = new EventOrRiskEventModel({
        projectId: project._id,
        tag,
        type,
        description,
        probability,
        consequences: type === 'RISK_EVENT' ? consequences : 0
    })
    await eventOrRiskEvent.save()

    return res.json({
        success: {
            id: eventOrRiskEvent._id,
            tag: eventOrRiskEvent.tag,
            type: eventOrRiskEvent.type,
            description: eventOrRiskEvent.description,
            probability: eventOrRiskEvent.probability,
            consequences: eventOrRiskEvent.consequences
        }
    })
}

exports.readAll = async function (req, res) {
    const { userId } = req
    const { projectId } = req.params

    const project = await ProjectModel.findOne({
        userId,
        _id: projectId
    })

    const eventsAndRiskEvents = await EventOrRiskEventModel.find({ projectId: project._id })

    return res.json({
        success: eventsAndRiskEvents.map(eventOrRiskEvent => ({
            id: eventOrRiskEvent._id,
            tag: eventOrRiskEvent.tag,
            type: eventOrRiskEvent.type,
            description: eventOrRiskEvent.description,
            probability: eventOrRiskEvent.probability,
            consequences: eventOrRiskEvent.consequences
        }))
    })
}

exports.update = async function (req, res) {
    const { userId } = req
    const { projectId, eventOrRiskEventId } = req.params
    const { type, description, probability, consequences } = req.body

    const project = await ProjectModel.findOne({
        userId,
        _id: projectId
    })

    const eventOrRiskEvent = await EventOrRiskEventModel.findOneAndUpdate({
        projectId: project._id,
        _id: eventOrRiskEventId
    }, {
        $set: {
            description,
            probability,
            consequences: type === 'RISK_EVENT' ? consequences : 0
        }
    }, {
        new: true
    })

    if (type !== eventOrRiskEvent.type) {
        let tag = ''
        if (type === 'RISK_EVENT') {
            project.createdRiskEvents++
            tag = `RE${project.createdRiskEvents}`
        } else {
            project.createdEvents++
            tag = `E${project.createdEvents}`
        }
        await project.save()
        eventOrRiskEvent.tag = tag
        eventOrRiskEvent.type = type
        await eventOrRiskEvent.save()
    }

    return res.json({
        success: {
            id: eventOrRiskEvent._id,
            tag: eventOrRiskEvent.tag,
            type: eventOrRiskEvent.type,
            description: eventOrRiskEvent.description,
            probability: eventOrRiskEvent.probability,
            consequences: eventOrRiskEvent.consequences
        }
    })
}

exports.delete = async function (req, res) {
    const { userId } = req
    const { projectId, eventOrRiskEventId } = req.params

    const project = await ProjectModel.findOne({
        userId,
        _id: projectId
    })

    const eventOrRiskEvent = await EventOrRiskEventModel.findOneAndDelete({
        projectId: project._id,
        _id: eventOrRiskEventId
    })

    return res.json({
        success: {
            id: eventOrRiskEvent._id
        }
    })
}
