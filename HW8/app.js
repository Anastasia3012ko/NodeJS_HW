import express from 'express';
import sequelize from './config/db.js';
import Book from './models/book.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get('/' , (_req, res) => {
    res.send('Homepage');
});

// get all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// create new book
app.post('/books', async (req, res) => {
  try {
    const book = req.body;
    if (!book.title || !book.author || !book.year) {
        return res
            .status(401)
            .json({ message: "Title, author and year are required" });
    }
    const newBook = await Book.create(book);

    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// updated book by id
app.put('/books/:id', async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedBook = await Book.findOne({ where: { id: req.params.id } });
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// delete book by id
app.delete('/books/:id', async (req, res) => {
  try {
    const deleted = await Book.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Book deleted' });
    } else {
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});


app.listen(PORT, async() => {
    try {
        await sequelize.authenticate();
        console.log('Connect to the data base has been successfully');
        console.log(`Server is running http://localhost:${PORT}`);
          
    } catch (error) {
        console.error('Error:' + error);
        
    }
})