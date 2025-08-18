import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './config/db.js';
import Publisher from './models/Publisher.js';
import Magazine from './models/Magazine.js';
import Tag from './models/Tag.js';
import Article from './models/Article.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(express.json());

app.get('/', (_, res) => {
    res.send('Home page');
});

app.listen(PORT, async () => {
    try {
        await connectToDatabase();
        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Failed to start the server due to MongoDB connection issue', error);
    }
});





