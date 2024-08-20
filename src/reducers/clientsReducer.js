import { createSlice } from '@reduxjs/toolkit';

const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        clientId: "",
        clientsList: [], // Renommez l'état du tableau des clients pour plus de clarté
    },
    reducers: {
        getClient: (state, action) => {
            state.clientId = action.payload; // Met à jour clientId avec la valeur de l'action
        },
        setClients: (state, action) => {
            state.clientsList = action.payload; // Met à jour la liste des clients
        },
        addClient: (state, action) => {
            state.clientsList.push(action.payload); // Ajoute un client à la liste
        },
        updateClient: (state, action) => {
            const index = state.clientsList.findIndex(client => client.id === action.payload.id);
            if (index !== -1) {
                state.clientsList[index] = action.payload; // Met à jour le client
            }
        },
        deleteClient: (state, action) => {
            state.clientsList = state.clientsList.filter(client => client.id !== action.payload);
        },
    },
});

export const { setClients, addClient, updateClient, deleteClient, getClient } = clientsSlice.actions;

export default clientsSlice.reducer;
