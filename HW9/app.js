import express from 'express';
import authRouters from './routes/authRoutes.js';
import adminRouters from './routes/adminRoutes.js';
import { checkPasswordChange } from './middlewares/checkPasswordChange.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Homepage')
});

app.use(checkPasswordChange);
app.use('/auth', authRouters);
app.use('/', adminRouters);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    
})