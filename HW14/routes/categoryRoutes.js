import express from 'express';
import Category from '../models/Category.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    const { name } = req.body;

    try {
        const newCategory = new Category({ name });
        await newCategory.save();
        res.status(201).send({
            message: 'Category was created successfully',
            category: newCategory
        });
    } catch (error) {
        console.error('Error creating category:', error.message);
        res.status(400).send({
            message: 'Error creating category',
            error: error.message
        });
    }
});

export default router;