const mongoose = require('mongoose')

const EventOrRiskEventModel = require('./eventOrRiskEventModel')
const LogicalOperatorModel = require('./logicalOperatorModel')
const ActivityModel = require('./activityModel')

const projectSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    description: String,
    createdEvents: Number,
    createdRiskEvents: Number,
    createdLogicalOperatorsAnd: Number,
    createdLogicalOperatorsOr: Number,
    createdActivities: Number
})

projectSchema.post('findOneAndDelete', async project => {
    await EventOrRiskEventModel.deleteMany({ projectId: project._id })
    await LogicalOperatorModel.deleteMany({ projectId: project._id })
    await ActivityModel.deleteMany({ projectId: project._id })
})

module.exports = mongoose.model('Project', projectSchema)
