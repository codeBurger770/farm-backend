const ProjectModel = require('../models/projectModel')
const EventOrRiskEventModel = require('../models/eventOrRiskEventModel')
const LogicalOperatorModel = require('../models/logicalOperatorModel')

exports.create = async function (req, res) {
    const { userId } = req
    const { projectId } = req.params
    const { type, firstInputEventOrRiskEventId, secondInputEventOrRiskEventId, outputEventOrRiskEventId } = req.body

    const project = await ProjectModel.findOne({
        userId,
        _id: projectId
    })

    let tag = ''
    if (type === 'OR') {
        project.createdLogicalOperatorsOr++
        tag = `OR${project.createdLogicalOperatorsOr}`
    } else {
        project.createdLogicalOperatorsAnd++
        tag = `AND${project.createdLogicalOperatorsAnd}`
    }
    await project.save()

    const firstInputEventOrRiskEvent = await EventOrRiskEventModel.findOne({
        projectId: project._id,
        _id: firstInputEventOrRiskEventId
    })
    const secondInputEventOrRiskEvent = await EventOrRiskEventModel.findOne({
        projectId: project._id,
        _id: secondInputEventOrRiskEventId
    })
    const outputEventOrRiskEvent = await EventOrRiskEventModel.findOne({
        projectId: project._id,
        _id: outputEventOrRiskEventId
    })

    const logicalOperator = new LogicalOperatorModel({
        projectId: project._id,
        firstInputEventOrRiskEventId: firstInputEventOrRiskEvent._id,
        secondInputEventOrRiskEventId: secondInputEventOrRiskEvent._id,
        outputEventOrRiskEventId: outputEventOrRiskEvent._id,
        tag,
        type
    })
    await logicalOperator.save()

    return res.json({
        success: {
            id: logicalOperator._id,
            tag: logicalOperator.tag,
            type: logicalOperator.type,
            firstInputEventOrRiskEventId: logicalOperator.firstInputEventOrRiskEventId,
            secondInputEventOrRiskEventId: logicalOperator.secondInputEventOrRiskEventId,
            outputEventOrRiskEventId: logicalOperator.outputEventOrRiskEventId
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

    const logicalOperators = await LogicalOperatorModel.find({ projectId: project._id })

    return res.json({
        success: logicalOperators.map(logicalOperator => ({
            id: logicalOperator._id,
            tag: logicalOperator.tag,
            type: logicalOperator.type,
            firstInputEventOrRiskEventId: logicalOperator.firstInputEventOrRiskEventId,
            secondInputEventOrRiskEventId: logicalOperator.secondInputEventOrRiskEventId,
            outputEventOrRiskEventId: logicalOperator.outputEventOrRiskEventId
        }))
    })
}

exports.update = async function (req, res) {
    const { userId } = req
    const { projectId, logicalOperatorId } = req.params
    const { type, firstInputEventOrRiskEventId, secondInputEventOrRiskEventId, outputEventOrRiskEventId } = req.body

    const project = await ProjectModel.findOne({
        userId,
        _id: projectId
    })

    const firstInputEventOrRiskEvent = await EventOrRiskEventModel.findOne({
        projectId: project._id,
        _id: firstInputEventOrRiskEventId
    })
    const secondInputEventOrRiskEvent = await EventOrRiskEventModel.findOne({
        projectId: project._id,
        _id: secondInputEventOrRiskEventId
    })
    const outputEventOrRiskEvent = await EventOrRiskEventModel.findOne({
        projectId: project._id,
        _id: outputEventOrRiskEventId
    })

    const logicalOperator = await LogicalOperatorModel.findOneAndUpdate({
        projectId: project._id,
        _id: logicalOperatorId
    }, {
        $set: {
            firstInputEventOrRiskEventId: firstInputEventOrRiskEvent._id,
            secondInputEventOrRiskEventId: secondInputEventOrRiskEvent._id,
            outputEventOrRiskEventId: outputEventOrRiskEvent._id
        }
    }, {
        new: true
    })

    if (type !== logicalOperator.type) {
        let tag = ''
        if (type === 'OR') {
            project.createdLogicalOperatorsOr++
            tag = `OR${project.createdLogicalOperatorsOr}`
        } else {
            project.createdLogicalOperatorsAnd++
            tag = `AND${project.createdLogicalOperatorsAnd}`
        }
        await project.save()
        logicalOperator.tag = tag
        logicalOperator.type = type
        await logicalOperator.save()
    }

    return res.json({
        success: {
            id: logicalOperator._id,
            tag: logicalOperator.tag,
            type: logicalOperator.type,
            firstInputEventOrRiskEventId: logicalOperator.firstInputEventOrRiskEventId,
            secondInputEventOrRiskEventId: logicalOperator.secondInputEventOrRiskEventId,
            outputEventOrRiskEventId: logicalOperator.outputEventOrRiskEventId
        }
    })
}

exports.delete = async function (req, res) {
    const { userId } = req
    const { projectId, logicalOperatorId } = req.params

    const project = await ProjectModel.findOne({
        userId,
        _id: projectId
    })

    const logicalOperator = await LogicalOperatorModel.findOneAndDelete({
        projectId: project._id,
        _id: logicalOperatorId
    })

    return res.json({
        success: {
            id: logicalOperator._id
        }
    })
}
