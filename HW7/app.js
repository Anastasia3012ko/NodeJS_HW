import express from 'express';
import sequelize from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

app.get('/' , (_req, res) => {
    res.send('Homepage');
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

