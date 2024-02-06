const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    trailPeriod: {
        type: Number,
        default: 3,
    },
    trailActive: {
        type: Boolean,
        default: true,
    },
    trailExpires: {
        type: Date,
    },
    subscriptionPlan: {
        type: String,
        enum: ['Trail', 'Free', 'Basic', 'Premium']
    },
    apiRequestCount: {
        type: Number,
        default: 0
    },
    monthlyRequestCount: {
        type: Number,
        default: 100
    },
    nextBillingDate: Date,
    payments: [{
        type: mongoose.Schema.ObjectId,
        ref: "Payment"
    }],
    history: [{
        type: mongoose.Schema.ObjectId,
        ref: "History"
    }]
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    }
});

// // $Add virtual property
// userSchema.virtual("isTrailActive").get(function () {
//     return this.trailActive && new Date() < this.trailExpires;
// })

// !Turn userSchema into userModel and export the model
const User = mongoose.model('User', userSchema);
module.exports = User;