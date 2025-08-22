import express from 'express';
import dotenv from 'dotenv';
import connectToDatabase from './config/db.js';
import categoriesRouter from './routes/categoryRoutes.js';
import productsRouter from './routes/productRoutes.js';

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);


app.listen(PORT, async () => {
    try {
        await connectToDatabase();
        console.log(`Server running on http://localhost:${PORT}`);
    } catch (error) {
        console.error('Failed to start the server due to MongoDB connection issue', error);
    }
});