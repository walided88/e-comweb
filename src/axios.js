// src/axios.js
import axios from 'axios';

// Instance pour les requêtes liées aux utilisateurs
const instanceUsers = axios.create({
    baseURL: 'http://localhost:5000/users', // Base URL pour les utilisateurs
});

// Instance pour les requêtes liées aux clients
const instanceClients = axios.create({
    baseURL: 'http://localhost:5000/clients', // Base URL pour les clients
});

// Exportation des deux instances
export { instanceUsers, instanceClients };
