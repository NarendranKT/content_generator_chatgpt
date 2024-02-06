const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
})

const History = mongoose.model('History', historySchema);
module.exports = History;