const mongoose = require('mongoose')

const ActivityModel = require('./activityModel')

const logicalOperatorSchema = new mongoose.Schema({
    projectId: mongoose.Schema.Types.ObjectId,
    firstInputEventOrRiskEventId: mongoose.Schema.Types.ObjectId,
    secondInputEventOrRiskEventId: mongoose.Schema.Types.ObjectId,
    outputEventOrRiskEventId: mongoose.Schema.Types.ObjectId,
    tag: String,
    type: {
        type: String,
        enum: ['AND', 'OR']
    }
}, {
    collection: 'logicalOperators'
})

logicalOperatorSchema.post('findOneAndDelete', async logicalOperator => {
    await ActivityModel.deleteMany({ logicalOperatorId: logicalOperator._id })
})

module.exports = mongoose.model('LogicalOperator', logicalOperatorSchema)
