const mongoose = require('mongoose')

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

module.exports = mongoose.model('Project', projectSchema)
