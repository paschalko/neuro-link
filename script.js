const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const apps = express();
const PORT = process.env.PORT || 5123;

apps.use(express.json());
apps.use(cors());

// ✅ MongoDB connection
const mongoURI = 'mongodb+srv://ibeanukosiso:paschal@cluster0.ye24p.mongodb.net/Neurolink?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected to Neurolink'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Define Event Schema
const eventSchema = new mongoose.Schema({
    name: String,
    time: String,
    location: String,
    img: String
});

const Event = mongoose.model('Event', eventSchema, 'events');

// ✅ Events route
apps.get('/events', async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});

// ✅ Start server
apps.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});
