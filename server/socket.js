const jwt = require('jsonwebtoken');
const socketIo = require('socket.io');

// const user = {
//     userId: '66b9d91ec83a3560b221b614',
//     mail: 'user@example.com',  // Assurez-vous que l'email est inclus
//     name: this.name,         // Assurez-vous que le nom est inclus
// };


const setupSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: '*', // Autorise toutes les origines, pour les tests

    methods: ["GET", "POST","PUT", "DELETE"],
            credentials: true
        },
        transports: ['websocket'], // Forcer l'utilisation de WebSocket

    });



    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (token) {
            jwt.verify(token, 'xxxx', (err, decoded) => { 
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
        console.log('A user connected:', socket.user); 
        console.log('User mail:', socket.user?.mail);  // Vérifiez la propriété mail
        console.log('User name:', socket.user?.name);  // Vérifiez la propriété name
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
        });
    });
    
};


module.exports = setupSocket;
