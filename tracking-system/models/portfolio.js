const mongoose = require('mongoose');

const portfolioSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String,  required: true},
    userId: { type: String, required: true },
    symbol: { type: String, required: true },
    totalStock: { type: Number,  required: true},
});

module.exports = mongoose.model('portfolio', portfolioSchema);