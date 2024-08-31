const jwt = require('jsonwebtoken');
const socketIo = require('socket.io');

// Stocke les connexions des utilisateurs par ID
const userSockets = new Map(); // Utilisation d'une Map pour stocker les sockets des utilisateurs par leur ID unique

const setupSocket = (server) => {
    // Initialisation de socket.io avec les paramètres de configuration
    const io = socketIo(server, {
        cors: {
            origin: '*', // Permet les connexions CORS depuis n'importe quelle origine
            methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes HTTP autorisées
            credentials: true // Permet l'envoi de cookies lors de la connexion
        },
        transports: ['websocket'], // Utilise uniquement le transport WebSocket pour la communication
    });

    // Middleware d'authentification pour vérifier le token JWT lors de la connexion
    io.use((socket, next) => {
        const token = socket.handshake.auth.token; // Récupère le token JWT depuis les informations de handshake
        if (token) {
            jwt.verify(token, 'xxxx', (err, decoded) => { // Vérifie le token avec la clé secrète 'xxxx'
                if (err) {
                    return next(new Error("Authentication error")); // Si le token est invalide, renvoie une erreur d'authentification
                }
                socket.user = decoded; // Ajoute les informations d'utilisateur décodées au socket
                next(); // Continue le processus de connexion
            });
        } else {
            next(new Error("Authentication error")); // Si aucun token n'est présent, renvoie une erreur d'authentification
        }
    });

    // Gère les connexions des utilisateurs
    io.on('connection', (socket) => {
        const userId = socket.user.userId; // Récupère l'ID de l'utilisateur à partir du token JWT
        console.log('A user connected:', socket.user);

        // Stocke le socket de l'utilisateur connecté dans la Map
        userSockets.set(userId, socket);
        console.log('userSocketsuserSocketsuserSockets:', userSockets);

        // Écoute les messages envoyés par l'utilisateur
        socket.on('message', (message) => {
            if (message.toUserId) {
                // Si un toUserId est spécifié, il s'agit d'un message privé
                const recipientSocket = userSockets.get(message.toUserId); // Récupère le socket du destinataire à partir de la Map
                if (recipientSocket) {
                    // Crée un message complet avec les détails de l'expéditeur
                    const fullMessage = {
                        ...message,
                        mail: socket.user.mail,
                        name: socket.user.name,
                        createdAt: new Date().toISOString() // Ajoute une date de création au message
                    };
                    recipientSocket.emit('message', fullMessage); // Envoie le message au destinataire
                } else {
                    console.log('Recipient not connected'); // Le destinataire n'est pas connecté
                }
            } else {
                // Si aucun toUserId n'est spécifié, il s'agit d'un message public
                const fullMessage = {
                    ...message,
                    mail: socket.user.mail,
                    name: socket.user.name,
                    createdAt: new Date().toISOString() // Ajoute une date de création au message
                };
                io.emit('message', fullMessage); // Diffuse le message à tous les utilisateurs connectés
            }
        });

        // Gère la déconnexion des utilisateurs
        socket.on('disconnect', () => {
            console.log('User disconnected');
            userSockets.delete(userId); // Supprime le socket de l'utilisateur de la Map lors de la déconnexion
        });
    });
};

module.exports = setupSocket; // Exporte la fonction setupSocket pour être utilisée ailleurs dans le projet
