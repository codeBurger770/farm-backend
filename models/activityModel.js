const mongoose = require('mongoose')

const activitySchema = new mongoose.Schema({
    projectId: mongoose.Schema.Types.ObjectId,
    eventOrRiskEventId: mongoose.Schema.Types.ObjectId,
    logicalOperatorId: mongoose.Schema.Types.ObjectId,
    tag: String,
    type: {
        type: String,
        enum: ['UPDATE_EVENT_OR_RISK_EVENT', 'DELETE_EVENT_OR_RISK_EVENT', 'DELETE_LOGICAL_OPERATOR']
    },
    description: String,
    cost: Number,
    probability: Number,
    consequences: Number
})

module.exports = mongoose.model('Activity', activitySchema)
