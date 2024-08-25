// src/axios.js
import axios from 'axios';
const backendUrl = process.env.REACT_APP_BACKEND_URL ;

// Instance pour les requêtes liées aux utilisateurs
const instanceUsers = axios.create({
    baseURL: `${backendUrl}/users`, // Base URL pour les utilisateurs
});

// Instance pour les requêtes liées aux clients
const instanceClients = axios.create({
    baseURL: `${backendUrl}/clients`, // Base URL pour les clients
});

// Exportation des deux instances
export { instanceUsers, instanceClients };
