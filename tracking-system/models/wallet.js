const mongoose = require('mongoose');

const walletSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String,  required: true},
    userId: { type: String, required: true },
    balance: { type: Number,  required: true},
});

module.exports = mongoose.model('Wallet', walletSchema);