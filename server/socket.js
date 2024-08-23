const jwt = require('jsonwebtoken');
const socketIo = require('socket.io');
const jwtSecret = process.env.JWT_SECRET; // Assurez-vous que cette variable est définie dans Render
const mongoDbUrl = process.env.MONGODB_URL; // Assurez-vous que cette variable est définie dans Render

const socket = io('https://nasal-sugar-strawflower.glitch.me');

socket.on('chat message', function(msg) {
  console.log('Message received: ' + msg);
});

// Envoyer un message
socket.emit('chat message', 'Hello World!');


const setupSocket = (server) => {
    const io = socketIo(server, {
   cors: {
    origin: "https://ecom-chi-nine.vercel.app", 
    methods: ["GET", "POST"],
    credentials: true
}

    });



    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (token) {
            jwt.verify(token, jwtSecret, (err, decoded) => { // Replace 'xxxx' with your JWT secret
                if (err) {
                    return next(new Error("Authentication error"));
                }
                socket.user = decoded; // Attach user info to socket
                next();
            });
        } else {
            next(new Error("Authentication error"));
        }
    });
    io.on('connection', (socket) => {
        console.log('A user connected:', socket.user);
    
        // Emit event to the client with the user data
        socket.emit('user-connected', socket.user);
    
        console.log('User mail:', socket.user?.mail);
        socket.emit('user-mail', socket.user?.mail);
    
        console.log('User name:', socket.user?.name);
        socket.emit('user-name', socket.user?.name);
    
        socket.on('message', (message) => {
            const fullMessage = {
                ...message,
                mail: socket.user.mail,
                name: socket.user.name,
                createdAt: new Date().toISOString()
            };
            io.emit('message', fullMessage);
        });
    
        socket.on('disconnect', () => {
            console.log('User disconnected');
            socket.emit('user-disconnected', 'User disconnected');
        });
    });
    
    
};


module.exports = setupSocket;
