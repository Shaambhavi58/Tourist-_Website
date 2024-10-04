// server.js
const express = require('express');
const app = express();
const path = require('path');

// Serve static files (CSS, images, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Set up a basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
// server.js
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tourismDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.log('Error:', err.message);
});
// server.js
const Hotel = require('./models/hotel');

// Route to get hotel listings
app.get('/hotels', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (err) {
        res.status(500).send(err);
    }
});
app.set('view engine', 'ejs');

// Render the homepage with hotel data
app.get('/', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.render('index', { hotels: hotels });
    } catch (err) {
        res.status(500).send(err);
    }
});
const Hotel = require('./models/hotel');

// Get all hotels
app.get('/api/hotels', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new hotel
app.post('/api/hotels', async (req, res) => {
    const hotel = new Hotel({
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        rating: req.body.rating
    });

    try {
        const newHotel = await hotel.save();
        res.status(201).json(newHotel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update hotel info
app.put('/api/hotels/:id', async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedHotel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a hotel
app.delete('/api/hotels/:id', async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Hotel deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
const Hotel = require('./models/hotel');

// Get all hotels
app.get('/api/hotels', async (req, res) => {
    try {
        const hotels = await Hotel.find();
        res.json(hotels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Add a new hotel
app.post('/api/hotels', async (req, res) => {
    const hotel = new Hotel({
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        price: req.body.price,
        image: req.body.image,
        rating: req.body.rating
    });

    try {
        const newHotel = await hotel.save();
        res.status(201).json(newHotel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update hotel info
app.put('/api/hotels/:id', async (req, res) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedHotel);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a hotel
app.delete('/api/hotels/:id', async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Hotel deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
