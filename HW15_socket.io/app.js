import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';


dotenv.config();

const PORT = process.env.PORT;

const app = express();
const server = http.createServer(app);
const io =  new Server(server);

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename)


app.use(express.json());
app.use(express.static(path.join(_dirname, 'public')));


app.get('/', (_, res) => {
    res.sendFile(path.join(_dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('message', (msg) => {
        console.log('Message: ', msg);
        // рассылаем message всем подключенным клиентам, дублируем сообщение всем
        io.emit('message', msg); 
    })

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
        
    })
})



app.post('/create-user', (req, res) => {
    res.send('User created');
});

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});