import axios from 'axios';

// Déterminer l'URL de base en fonction de l'environnement
const baseURL = 'http://localhost:5000'
// Instance pour les requêtes liées aux utilisateurs
const instanceUsers = axios.create({
    baseURL: `${baseURL}/users`, // Base URL pour les utilisateurs
});

// Instance pour les requêtes liées aux clients
const instanceClients = axios.create({
    baseURL: `${baseURL}/clients`, // Base URL pour les clients
});

// Exportation des deux instances
export { instanceUsers, instanceClients };
