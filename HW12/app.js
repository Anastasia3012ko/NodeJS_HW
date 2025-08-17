import express from 'express';
import dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
import { connectToDataBase, getDb } from './db/index.js';
dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

connectToDataBase()
    .then(() => {
        app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    })})
    .catch(error => console.error('Failed to start the server due to MongoDB connection issue', error));

app.use(express.json());

app.get('/', (_, res) => {
    res.send('Home page');
});

// create new product

app.post('/products', async (req, res) => {
   try{
        const product = req.body;
        if(!product.name || !product.price || !product.description) {
            return res.status(400).send({error: 'Products name, price and description are required'});
        }
        const db = getDb();
        const result = await db.collection('products').insertOne(product);
        res.status(201).send(result)
   }catch(error){
    res.status(500).send({error: 'Failed to create product'});
   }
});

//get all products

app.get('/products', async (req, res) => {
    try{
        const db = getDb();
        const products = await db.collection('products').find().toArray();
        res.send(products);
    }catch(error) {
        res.status(500).send({error: 'Failed to fetch products'});
    }
});

// get product by id
    
app.get('/products/:id', async (req, res) => {
    try{
        const db = getDb();
        const productId = req.params.id
        if(!ObjectId.isValid(productId)){
            return res.status(400).send({error: 'Invalid product ID'})
        }
        const product = await db.collection('products').findOne({_id: new ObjectId(productId) })
        if(!product) {
            return res.status(404).send({error: 'Product not found'})
        }
        res.send(product)
    }catch(error) {
        res.status(500).send({error: 'Failed to fetch product by id'})
    }
})


// put product by id 

app.put('/products/:id', async ( req, res) => {
    try{
        const productId = req.params.id;

        if(!ObjectId.isValid(productId)){
            return res.status(400).send({error: 'Invalid product ID'})
        };

        const { _id, ...updatedProduct } = req.body;

    if (Object.keys(updatedProduct).length === 0) {
            return res.status(400).send({ error: 'No fields provided for update' });
        }

        const db = getDb();

        const result = await db. collection('products')
            .findOneAndUpdate(
                { _id: new ObjectId(productId) },
                { $set: updatedProduct },
                { returnDocument: 'after' }  // return new document(updated product)
            );

        if (!result) {
            return res.status(404).send({ error: 'Product not found' });
        }
        res.send(result);
        
    }catch(error){
        res.status(500).send({ error: 'Failed to update product' });
    }
})

// delete product

app.delete('/products/:id',  async (req, res) => {
    try{
        const productId = req.params.id;

        if(!ObjectId.isValid(productId)){
            return res.status(400).send({error: 'Invalid product ID'})
        };

        const db = getDb();

        await db.collection('products').deleteOne({ _id: new ObjectId(productId) });

        res.send({ message: 'Product deleted successfully'});


    }catch(error) {
        res.status(500).send({ error: 'Failed to delete product' });
    }
})