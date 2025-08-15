import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT;
const BASE_URL = `http://localhost:${PORT}`;

async function testLogin() {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      email: 'anna@gmail.com',
      password: 'passwordanna1234',
    });
    console.log('Token: ', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error: ', error.response.data);
    } else {
      console.error('Network error');
    }
  }
}

// task 1
async function updateEmail(token) {
  try {
    const response = await axios.put(
      `${BASE_URL}/update-email`,
      {
        email: 'annaAnna@gmail.com',
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Email updated: ', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error: ', error.response.data);
    } else {
      console.error('Network error');
    }
  }
}

//task 2

async function deleteAccount(token) {
    try {
        const res = await axios.delete(`${BASE_URL}/delete-account`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Account deleted', res.data);
    } catch (err) {
        if (err.response) {
            console.error('Error with delete account :', err.response.data);
        } else {
            console.error('Network error:', err.message);
        }
    }
}

//task 3

async function updateRole(token) {
  try {
    const response = await axios.put(
      `${BASE_URL}/update-role`,
      {
        role: 'player',
      },

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Role updated: ', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error: ', error.response.data);
    } else {
      console.error('Network error');
    }
  }
}

const token = await testLogin()
if(token) {
    await updateEmail(token)
    await updateRole(token)
    await deleteAccount(token)
}

  

