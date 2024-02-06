const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    reference: {
        type: String,
        required: true,
    },
    currency: {
        type: String, 
        required: true,
    },
    status: {
        type: String, 
        default: "pending",
        required: true,
    },
    subscriptionPlan: {
        type: String,
        reqruied: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    monthlyRequestCount: {
        type: Number,
    }
}, {
    timestamps: true,
})


const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;