const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
    console.log('Listening on port: 3000');
});

io.on('connection', (socket) => {
    console.log('New Client Connected');

    socket.on('disconnect', () => {
    });

    socket.on('Created', (data) => {
        socket.broadcast.emit('Created', (data));
    });

    socket.on('joined', (data) => {
        console.log("New User Joined - " + data);
        socket.broadcast.emit('joined', (data));
    });

    socket.on('new-message', (data) => {
        console.log("New Message Broadcast: " + data);
        socket.broadcast.emit('new-message', (data));
    });
    
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', (data));
    });

    socket.on('stopTyping', () => {
        socket.broadcast.emit('stopTyping');
    });
    socket.on('disconnected', (data) => {
        console.log('User Disconnected - ' + data);
        socket.broadcast.emit('disconnected', (data))
    });
});