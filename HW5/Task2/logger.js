import http from 'http';
import fs from 'fs';
import dotenv from 'dotenv';
import moment from 'moment';

dotenv.config();

const PORT2 = process.env.PORT2 || 3000;

const server = http.createServer((_, res) => {
  try {
    throw new Error('Test error for log');

  } catch (err) {
    const time = moment().format('YYYY-MM-DD HH:mm:ss');
    const errorMessage = `[${time}] ${err.stack}\n`;

    fs.appendFile('errors.log', errorMessage, (err) => {
      if (err) {
        console.error('Error with writing in log:', err);
      }
    });

    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
  }
});

server.listen(PORT2, () => {
  console.log(`Server is running on http://localhost:${PORT2}`);
});