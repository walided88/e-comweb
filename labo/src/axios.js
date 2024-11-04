// src/axios.js
import axios from 'axios';

// Instance pour les requêtes liées aux utilisateurs
const instanceUsers = axios.create({
    baseURL: 'https://e-comweb-back.onrender.com/users', // Base URL pour les utilisateurs
});

// Instance pour les requêtes liées aux clients
const instanceClients = axios.create({
    baseURL: 'https://e-comweb-back.onrender.com/clients', // Base URL pour les clients
});

// Instance pour les requêtes liées aux clients
const instanceMessages = axios.create({
    baseURL: 'https://e-comweb-back.onrender.com/messages', // Base URL pour les messges
});

// Exportation des deux instances
export { instanceUsers, instanceClients,instanceMessages };