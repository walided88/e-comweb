const jwt = require('jsonwebtoken');
const socketIo = require('socket.io');

// Stocke les connexions des utilisateurs par ID
const userSockets = new Map();

const setupSocket = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true
        },
        transports: ['websocket'],
    });

    // Middleware d'authentification
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (token) {
            jwt.verify(token, 'xxxx', (err, decoded) => {
                if (err) {
                    return next(new Error("Authentication error"));
                }
                socket.user = decoded;
                next();
            });
        } else {
            next(new Error("Authentication error"));
        }
    });

    // Écoute de la connexion utilisateur
    io.on('connection', (socket) => {
        const userId = socket.user.userId;
        console.log('A user connected:', socket.user);

        // Stocke le socket de l'utilisateur connecté
        userSockets.set(userId, socket);
        console.log('userSockets:', userSockets);

        // Gère l'entrée dans une salle
        socket.on('join-room', ({ roomId, userName }) => {
            socket.join(roomId);
            console.log(`${userName} joined room: ${roomId}`);
            socket.to(roomId).emit('user-joined', { userName });
        });

        // Gestion des messages
        socket.on('message', (message) => {
            const fullMessage = {
                ...message,
                mail: socket.user.mail,
                name: socket.user.name,
                createdAt: new Date().toISOString()
            };

            if (message.toUserId) {
                const recipientSocket = userSockets.get(message.toUserId);
                if (recipientSocket) {
                    recipientSocket.emit('message', fullMessage);
                } else {
                    console.log('Recipient not connected');
                }
            } else if (message.roomId) {
                io.to(message.roomId).emit('message', fullMessage);
            } else {
                io.emit('message', fullMessage);
            }
        });

        // Gestion des déconnexions
        socket.on('disconnect', () => {
            console.log('User disconnected');
            userSockets.delete(userId);
        });
    });
};

module.exports = setupSocket;
