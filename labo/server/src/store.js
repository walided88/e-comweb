// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import clientsReducer from './reducers/clientsReducer';

const store = configureStore({
    reducer: {
        user: userReducer,
        clients: clientsReducer,

    },
});

export default store;
