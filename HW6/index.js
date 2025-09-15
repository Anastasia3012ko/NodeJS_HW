import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';
dotenv.config();


const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
  try {
    res.send('Hello world');
  } catch (error) {
    res.status(500).send({error: 'Server error'});
  }
});

app.post('/', (req, res) => {
  try {
    const data = req.body;
    if (!data || !data.name) {
      return res.status(400).json({ message: 'The name field is required' });
    }
    res.status(201).json({ message: `Data received: ${data.name}` });
  } catch (error) {
    res.status(500).send({error: 'Server error'});
  }
  
});

app.get('/products', (_req, res) => {
  db.query('SELECT * FROM products', (error, results) => {
    if (error) {
      console.error(error.message);
      return res.status(500).json({ message: 'Error with getting data', error: error.message});
    }
    res.json(results);
  });
 
});

app.post('/products', (req, res) => {
  const { name, price } = req.body;

  if (!name || price == null) {
    return res.status(400).json({ message: 'Name and price are required' });
  }

  db.query(
    'INSERT INTO products (name, price) VALUES (?, ?)',
    [name, price],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error with creating product', error: error.message });
      }
      res.status(201).json({
        message: 'Product created successfully',
        productId: result.insertId,
      });
    }
  );
  
});

app.listen(PORT, () => {
  console.log(`Server is running on: http://localhost:${PORT}`);
});