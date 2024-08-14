// src/axios.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/users', // Base URL de votre backend
});

export default instance;
