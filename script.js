const apiKey = 'ef3a6b62b020033f0de34340417f8280'; // Replace with your OpenWeather API key
const cities = ['Delhi', 'Mumbai', 'Kolkata', 'Chennai', 'Bengaluru','Himachal Pradesh']; // Add more cities as needed
const weatherInfo = document.getElementById('weather-info');

async function getWeather() {
    for (const city of cities) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            weatherInfo.innerHTML += `<div>The weather in ${data.name}: ${data.weather[0].description}, ${data.main.temp}°C</div>`;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML += `<div>Failed to retrieve weather for ${city}.</div>`;
        }
    }
}

getWeather();
window.addEventListener('scroll', () => {
    const destinations = document.querySelectorAll('.destination');
    const windowHeight = window.innerHeight;

    destinations.forEach(destination => {
        const position = destination.getBoundingClientRect().top;

        if (position < windowHeight - 50) {
            destination.classList.add('animate__fadeIn');
        }
    });
});
// Add a review to a hotel
app.post('/api/hotels/:id/reviews', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        const newReview = {
            user: req.body.user,
            comment: req.body.comment,
            rating: req.body.rating
        };

        hotel.reviews.push(newReview);
        await hotel.save();

        res.status(201).json({ message: 'Review added', review: newReview });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Update a review of a hotel
app.put('/api/hotels/:hotelId/reviews/:reviewId', async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel not found' });
        }

        const review = hotel.reviews.id(req.params.reviewId);
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        review.comment = req.body.comment || review.comment;
        review.rating = req.body.rating || review.rating;
        
        await hotel.save();
        res.json({ message: 'Review updated', review });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
