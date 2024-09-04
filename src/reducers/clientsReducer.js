import { createSlice } from '@reduxjs/toolkit';

const clientsSlice = createSlice({
    name: 'clients',
    initialState: {
        clientId: null,
        name: null,
        clientMessage: [],
        clientsList: [],
    },
    reducers: {
        getClient: (state, action) => {
            state.clientId = action.payload;
        },
        getName: (state, action) => {
            state.name = action.payload;
        },
        setClients: (state, action) => {
            state.clientsList = action.payload;
        },
        addClient: (state, action) => {
            state.clientsList.push(action.payload);
        },
        addMessage: (state, action) => {
            state.clientMessage.push(action.payload);
        },
        updateClient: (state, action) => {
            const index = state.clientsList.findIndex(client => client.id === action.payload.id);
            if (index !== -1) {
                state.clientsList[index] = action.payload;
            }
        },
        deleteClient: (state, action) => {
            state.clientsList = state.clientsList.filter(client => client.id !== action.payload);
        },
        deleteMessage: (state, action) => {
            state.clientMessage = []; // Réinitialise le tableau des messages
        },
    },
});

export const { setClients, addClient, updateClient, deleteClient, getClient, getName, addMessage, deleteMessage } = clientsSlice.actions;

export default clientsSlice.reducer;
