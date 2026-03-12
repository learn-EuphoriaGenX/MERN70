let mongoose = require('mongoose')
let subscriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    plan: {
        type: String,
        enum: ['basic', 'pro', 'premium'],
        required: true
    },
    startDate: Date,
    endDate: Date,
    isActive: Boolean,
    planStatus: {
        type: String,
        enum: ['active', 'cancelled']
    },

    razorpayPaymentId: String,
    razorpayOrderId: String
}, { timestamps: true })

module.exports = mongoose.model('Subscription', subscriptionSchema)