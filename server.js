const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// سرو کردن فایل‌های استاتیک
app.use(express.static(__dirname));

// وقتی کاربر وصل می‌شود
io.on('connection', (socket) => {
    console.log('یک کاربر وصل شد');

    socket.on('joinRoom', ({ username, room }) => {
        socket.join(room);
        io.to(room).emit('message', `${username} وارد اتاق شد`);
    });

    socket.on('chatMessage', ({ username, room, message }) => {
        io.to(room).emit('message', `${username}: ${message}`);
    });

    socket.on('disconnect', () => {
        console.log('یک کاربر خارج شد');
    });
});

// پورت 80 برای Daytona
const PORT = process.env.PORT || 80;

server.listen(PORT, () => {
    console.log(`Chat server running on port ${PORT}`);
});
