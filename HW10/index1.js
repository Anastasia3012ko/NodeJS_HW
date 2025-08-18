import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();

app.use(express.json());

function auth(req, res, next) {
    const h = req.headers.authorization || '';
    const token = h.startsWith('Bearer ') ? h.slice(7) : null;
    if (!token) return res.status(401).json({ error: 'No token' });
    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch {
        res.status(403).json({ error: 'Invalid/expired token' });
    }
}

const users = [
    { id: 1, username: 'Anna', email: 'anna@gmail.com', password: await bcrypt.hash('passwordanna1234', 12), role: 'engineer'},
    { id: 2, username: 'Alex', email: 'alex@gmail.com', password: await bcrypt.hash('passwordalex5678', 12), role: 'manager' }
];

app.get('/', (_req,res) => {
    res.send('Home page');
})


app.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = users.find(user => user.email === email);
        if(!user) {
            return res.status(404).send({message: 'Not found user'})
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(401).send({message: 'Invalid password'})
        }
        
        const token = jwt.sign(
            { id: user.id, email: user.email, userName: user.username },
            JWT_SECRET,
            { expiresIn: '30m' }
        );
        res.json({ token: token });

    }catch(error) {
        res.status(500).send({message: 'Server Error'});
        console.error('Server error:', error.message);
    }
    
});

// Task 1 update email
app.put('/update-email', auth, (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'There is not new email' });
    }

    const user = users.find(user => user.id === req.user.id);

    if(!user) {
        return res.status(404).json({message: 'User not found'})
    }

    user.email = email
    res.json({ message: 'Email updated', user });
});

// task 2 delete user
app.delete('/delete-account', auth, (req, res) => {
    const userId = req.user.id;
    
    const exists = users.some(user => user.id === userId);
    if (!exists) {
        return res.status(404).json({ message: 'User not found' });
    }

    users = users.filter(user => user.id !== userId);
    

    res.json({ message: 'Account deleted successfully' });
})

// task 3 update role
app.put('/update-role', auth, (req, res) => {

    const { role } = req.body;

    if (!role) {
        return res.status(400).json({ message: 'There is not new role' });
    }

    const user = users.find(user => user.id === req.user.id);

    if(!user) {
        return res.status(404).json({message: 'User not found'})
    }

    user.role = role
    res.json({ message: 'Role updated', user });
});

// task 4 update token

app.put('/refresh-token', auth, (req, res) => {
    const user = users.find(user => user.id === req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newToken = jwt.sign(
        { id: user.id, email: user.email, userName: user.username },
        JWT_SECRET,
        { expiresIn: '30m' }
    );
    res.json({ token: newToken });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost: ${PORT}`);
    
})




