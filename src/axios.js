import axios from 'axios';

// Déterminer l'URL de base en fonction de l'environnement
const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://ecom-chi-nine.vercel.app' // URL en production
    : ('http://localhost:5000' || "https://e-com-cb4u.onrender.com"); // URL en développement

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
