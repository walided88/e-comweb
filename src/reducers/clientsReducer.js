import { createSlice } from '@reduxjs/toolkit';

const clientsSlice = createSlice({
    name: 'clients',
    initialState: [],
    reducers: {
        setClients: (state, action) => {
            return action.payload;
        },
        addClient: (state, action) => {
            state.push(action.payload);
        },
        updateClient: (state, action) => {
            const index = state.findIndex(client => client.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteClient: (state, action) => {
            return state.filter(client => client.id !== action.payload);
        },
    },
});

export const { setClients, addClient, updateClient, deleteClient } = clientsSlice.actions;

export default clientsSlice.reducer;
