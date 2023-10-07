const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
const httpServer = http.createServer(app);

app.use(cors({ origin: 'http://localhost:8081' }));

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:8081",
        methods: ["GET", "POST"]
    }
});

io.on('connection', (socket) => {
    console.log('Пользователь подключился');

    socket.on('chat message', (message) => {
        io.emit('chat message', message);
    });

    socket.on('disconnect', () => {
        console.log('Пользователь отключился');
    });
});

const PORT = 3000;
httpServer.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});
