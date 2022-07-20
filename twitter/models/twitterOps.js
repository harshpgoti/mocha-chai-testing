const mongoose = require('mongoose');

const twitterOpsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content: { type: String, required: true },
    email: { type: String, required: true }
});

module.exports = mongoose.model('twitterOps', twitterOpsSchema);