import express from 'express';
import Product from '../models/Product.js';
import Category from '../models/Category.js';

const router = express.Router();

router.post('/create', async (req, res) => {
    const { name, price, category } = req.body;

    try {
        const product = new Product({ name, price, category })
        await product.save();
        res.status(201).send({
            message: 'Product was created successfully',
            category: product
        });
        
    } catch (error) {
        console.error('Error creating product:', error.message);
        res.status(400).send({
            message: 'Error creating product',
            error: error.message
        });
    }
});

router.get("/all", async (_req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    console.error('Error getting product:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.get("/all/:categoryName", async (req, res) => {
    const categoryName = req.params.categoryName
  try {
    const category = await Category.findOne({ name: categoryName });
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    const products = await Product.find({ category: category._id }).populate("category");
    res.json(products);
  } catch (error) {
    console.error('Error getting product:', error.message);
    res.status(500).json({ error: error.message });
  }
});
export default router;