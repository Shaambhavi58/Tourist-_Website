// models/hotel.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    description: String,
    price: Number,
    image: String,
    rating: Number,
    reviews: [{
        user: String,
        comment: String,
        rating: Number,
        date: { type: Date, default: Date.now }
    }]
});

module.exports = mongoose.model('Hotel', hotelSchema);
