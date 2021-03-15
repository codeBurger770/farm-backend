const mongoose = require('mongoose')

const LogicalOperatorModel = require('./logicalOperatorModel')
const ActivityModel = require('./activityModel')

const eventOrRiskEventSchema = new mongoose.Schema({
    projectId: mongoose.Schema.Types.ObjectId,
    tag: String,
    type: {
        type: String,
        enum: ['EVENT', 'RISK_EVENT']
    },
    description: String,
    probability: Number,
    consequences: Number
}, {
    collection: 'eventsAndRiskEvents'
})

eventOrRiskEventSchema.post('findOneAndDelete', async eventOrRiskEvent => {
    await ActivityModel.deleteMany({ eventOrRiskEventId: eventOrRiskEvent._id })

    const logicalOperators1 = await LogicalOperatorModel.find({ firstInputEventOrRiskEventId: eventOrRiskEvent._id })
    const logicalOperators2 = await LogicalOperatorModel.find({ secondInputEventOrRiskEventId: eventOrRiskEvent._id })
    const logicalOperators3 = await LogicalOperatorModel.find({ outputEventOrRiskEventId: eventOrRiskEvent._id })

    for (const logicalOperator of logicalOperators1) {
        await LogicalOperatorModel.deleteOne({ _id: logicalOperator._id })
        await ActivityModel.deleteMany({ logicalOperatorId: logicalOperator._id })
    }

    for (const logicalOperator of logicalOperators2) {
        await LogicalOperatorModel.deleteOne({ _id: logicalOperator._id })
        await ActivityModel.deleteMany({ logicalOperatorId: logicalOperator._id })
    }

    for (const logicalOperator of logicalOperators3) {
        await LogicalOperatorModel.deleteOne({ _id: logicalOperator._id })
        await ActivityModel.deleteMany({ logicalOperatorId: logicalOperator._id })
    }
})

module.exports = mongoose.model('EventOrRiskEvent', eventOrRiskEventSchema)
