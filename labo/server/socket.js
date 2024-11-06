const jwt = require('jsonwebtoken');
const socketIo = require('socket.io');

// Stocke les connexions des utilisateurs par ID dans une Map
const userSockets = new Map();

// Fonction pour configurer les sockets sur le serveur
const setupSocket = (server) => {
    // Initialise le serveur Socket.io
    const io = socketIo(server, {
        cors: {
            origin: '*', // Autorise toutes les origines
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true
        },
        transports: ['websocket', 'polling'], // Ajoute 'polling' comme fallback pour plus de robustesse
    });

    // Middleware d'authentification JWT pour les connexions socket
    io.use((socket, next) => {
        const token = socket.handshake.auth.token; // Récupère le token d'authentification

        if (token) {
            // Vérifie et décode le token JWT
            jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
                if (err) {
                    console.log('JWT Error:', err.message); // Log en cas d'erreur JWT
                    return next(new Error("Authentication error")); // Bloque la connexion si le token est invalide
                }
                socket.user = decoded; // Attache les données utilisateur décryptées au socket
                next(); // Passe au middleware suivant ou connecte l'utilisateur
            });
        } else {
            next(new Error("Authentication error")); // Bloque la connexion si aucun token n'est fourni
        }
    });

    // Gère les connexions des utilisateurs
    io.on('connection', (socket) => {
        const userId = socket.user.userId;
        console.log('A user connected:', userId);

        // Stocke le socket de l'utilisateur dans la Map pour le retrouver plus tard
        userSockets.set(userId, socket);

        // Émet un événement pour notifier que l'utilisateur est en ligne
        io.emit('user-status', { userId, status: 'online' });

        // Envoie le statut de tous les utilisateurs en ligne aux nouveaux clients
        const userStatus = {};
        userSockets.forEach((_, id) => {
            userStatus[id] = 'online';
        });
        socket.emit('initialUserStatus', userStatus);

        // Envoie un premier ping immédiatement après la connexion
        socket.emit('ping', 'ping');
        console.log('pingpingpingping:'); // Log pour confirmer le premier ping

        // Envoie des pings toutes les 25 secondes pour maintenir la connexion active
        const pingInterval = setInterval(() => {
            socket.emit('ping', 'ping');
        }, 250);

        // Gère la réception et la transmission des messages
        socket.on('message', (message) => {
            // Structure complète du message avec les informations de l'expéditeur
            const fullMessage = {
                ...message,
                mail: socket.user.mail,
                name: socket.user.name,
                createdAt: new Date().toISOString()
            };

            // Si le message est destiné à un autre utilisateur spécifique
            if (message.toUserId) {
                const recipientSocket = userSockets.get(message.toUserId); // Récupère le socket du destinataire
                if (recipientSocket) {
                    // Envoie le message au destinataire connecté
                    recipientSocket.emit('message', fullMessage);
                } else {
                    console.log('Recipient not connected'); // Log si le destinataire n'est pas connecté
                }
            }
        });

        // Gère la déconnexion des utilisateurs
        socket.on('disconnect', () => {
            // Émet un événement pour notifier que l'utilisateur est hors ligne
            io.emit('user-status', { userId, status: 'offline' });
            console.log('User disconnected', userId);

            // Supprime le socket de la Map et arrête les pings
            userSockets.delete(socket.user.userId);
            clearInterval(pingInterval);

            // Émet un événement pour actualiser le statut de l'utilisateur
            io.emit('userStatusUpdate', { userId: socket.user.userId, status: 'offline' });
        });
    });
};

module.exports = setupSocket;
