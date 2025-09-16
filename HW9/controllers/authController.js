import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const users = []; //Database
let idCounter = 1;

// register user
export const  registerUser = async (req, res) => {
     try {
        const { name, email, password, role = 'user' } = req.body;
        if(!name ||!email || !password) {
            return res.status(400).json({error: 'Email and password are required!'});
            
        }
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            return res.status(409).json({message: 'User with this email already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
          users.push({
            id: idCounter++,
            name,
            email,
            password: hashedPassword,
            mustChangePassword: false,
            role
        });
        res.status(201).send('User was created');

    } catch (error) {
        console.error('Error register: ', error.message)
        res.status(500).send('Error with registering user');
    }
}

// change password

export const changePassword = async (req, res) => {
  try {
    const { userId, newPassword } = req.body;

    const user = users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.password = await bcrypt.hash(newPassword, 12);
    user.mustChangePassword = false;

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error('Error with changing password:', error.message);
    res.status(500).json({ message: 'Server error with changing password' });
  }
  
}

// delete account

export const deleteAccount = async (req, res) => {
  try {
      const { userId, password } = req.body;

      const user = users.find(u => u.id === userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

      const index = users.findIndex(u => u.id === userId);
      users.splice(index, 1);

      res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    console.error('Error with deleting account:', error.message);
    res.status(500).json({ message: 'Server error with deleting account' });
  }
}



//change email

export const changeEmail = async (req, res) => {
  try {
    const { userId, newEmail, password } = req.body;

    const user = users.find(u => u.id === userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    const existingUser = users.find(u => u.email === newEmail);
    if (existingUser) {
      return res.status(409).json({ message: 'User with this email already exists' });
    }

    user.email = newEmail;
    res.json({ message: 'Email changed successfully' });
  } catch (error) {
    console.error('Error with changing email:', error.message);
    res.status(500).json({ message: 'Server error with changing email' });
  }
}
  


    