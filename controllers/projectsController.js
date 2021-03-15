const ProjectModel = require('../models/projectModel')

exports.create = async function (req, res) {
    const { userId } = req
    const { name, description } = req.body

    const project = new ProjectModel({
        userId,
        name,
        description,
        createdEvents: 0,
        createdRiskEvents: 0,
        createdLogicalOperatorsAnd: 0,
        createdLogicalOperatorsOr: 0,
        createdActivities: 0
    })
    await project.save()

    return res.json({
        success: {
            id: project._id,
            name: project.name,
            description: project.description
        }
    })
}

exports.readAll = async function (req, res) {
    const { userId } = req

    const projects = await ProjectModel.find({ userId })

    return res.json({
        success: projects.map(project => ({
            id: project._id,
            name: project.name,
            description: project.description
        }))
    })
}

exports.update = async function (req, res) {
    const { userId } = req
    const { projectId } = req.params
    const { name, description } = req.body

    const project = await ProjectModel.findOneAndUpdate({
        userId,
        _id: projectId
    }, {
        $set: {
            name,
            description
        }
    }, {
        new: true
    })

    return res.json({
        success: {
            id: project._id,
            name: project.name,
            description: project.description
        }
    })
}

exports.delete = async function (req, res) {
    const { userId } = req
    const { projectId } = req.params

    const project = await ProjectModel.findOneAndDelete({
        userId,
        _id: projectId
    })

    return res.json({
        success: {
            id: project._id
        }
    })
}
