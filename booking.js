// models/booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    hotel: { type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true },
    user: String,
    checkInDate: Date,
    checkOutDate: Date,
    guests: Number,
    totalCost: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', bookingSchema);
const Booking = require('./models/booking');

// Book a hotel
app.post('/api/bookings', async (req, res) => {
    try {
        const booking = new Booking({
            hotel: req.body.hotelId,
            user: req.body.user,
            checkInDate: req.body.checkInDate,
            checkOutDate: req.body.checkOutDate,
            guests: req.body.guests,
            totalCost: req.body.totalCost
        });

        const newBooking = await booking.save();
        res.status(201).json(newBooking);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
