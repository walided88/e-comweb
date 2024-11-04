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
        transports: ['websocket', 'polling'], // Ajoute 'polling' pour plus de robustesse
    });

    // Middleware d'authentification
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (token) {
            jwt.verify(token,process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log('JWT Error:', err.message); // Log de l'erreur JWT
                    return next(new Error("Authentication error"));
                }
                socket.user = decoded;
                next();
            });
        } else {
            next(new Error("Authentication error"));
        }
    });

    // Gère les connexions utilisateurs
    io.on('connection', (socket) => {
        const userId = socket.user.userId;
        console.log('A user connected:', userId);

        // Stocke le socket de l'utilisateur connecté
        userSockets.set(userId, socket);
        // Émettre un événement pour notifier que l'utilisateur est en ligne
        io.emit('user-status', { userId, status: 'online' });
 // Envoyer le statut de tous les utilisateurs aux nouveaux clients
 const userStatus = {};
 userSockets.forEach((_, id) => {
     userStatus[id] = 'online';
 });


 socket.emit('initialUserStatus', userStatus);
        // Envoie un ping immédiatement après la connexion
        socket.emit('ping', 'ping');
        console.log('pingpingpingping:');

        // Envoie des pings toutes les 25 secondes pour maintenir la connexion active
        const pingInterval = setInterval(() => {
            socket.emit('ping', 'ping');
        }, 250);

        // Gère les messages
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
            }
        });

        // Gère la déconnexion des utilisateurs
        socket.on('disconnect', () => {
               // Émettre un événement pour notifier que l'utilisateur est en ligne
        io.emit('user-status', { userId, status: 'Offline' });
            console.log('User disconnected', userId);
            userSockets.delete(socket.user.userId);
            clearInterval(pingInterval); // Arrête l'envoi des pings à la déconnexion
         // Émettre un événement pour notifier que l'utilisateur est hors ligne
         io.emit('userStatusUpdate', { userId: socket.user.userId, status: 'offline' });
       
        });
    });
};

module.exports = setupSocket;
