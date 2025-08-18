import http from 'http';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT1 || 3000;

const server = http.createServer((req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');

  if (req.method === 'PUT') {
    res.statusCode = 200;
    res.end('PUT-запрос обработан');
  } else if (req.method === 'DELETE') {
    res.statusCode = 200;
    res.end('DELETE-запрос обработан');
  } else {
    res.statusCode = 405; 
    res.end(`${req.method} не поддерживается`);
  }
});

server.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});