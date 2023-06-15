import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// import mongoose from 'mongoose';

// MongoDB connection URI
const MONGODB_URI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        // Your further code here
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const app = express();
const port = process.env.PORT;

app.get('/test', (req, res) => {
    res.json('Server is working!');
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});
