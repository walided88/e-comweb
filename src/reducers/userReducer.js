// src/reducers/userReducer.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        currentUser: null,
        productNumber:0,
        currentAdds:0,
        index:0,
        productList:[
            { id: 1, name: 'Product 1', price: 1.99, image: require("../images/11.png"), quantity: 0 },
            { id: 2, name: 'Product 2', price: 2.99, image: require("../images/22.png"), quantity: 0 },
            { id: 3, name: 'Product 3', price: 3.99, image: require("../images/33.png"), quantity: 0 },
            { id: 4, name: 'Product 4', price: 4.99, image: require("../images/44.png"), quantity: 0 },
            { id: 5, name: 'Product 5', price: 5.99, image: require("../images/55.png"), quantity: 0 },
            { id: 6, name: 'Product 6', price: 6.99, image: require("../images/66.png"), quantity: 0 },
            { id: 7, name: 'Product 7', price: 7.99, image: require("../images/77.png"), quantity: 0 },
            { id: 8, name: 'Product 8', price: 8.99, image: require("../images/88.png"), quantity: 0 },
       
        ],
    },
    reducers: {
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },
        setCurrentAdds: (state, action) => {
            state.currentAdds = action.payload;
        },
        setIndex: (state, action) => {
            state.index = action.payload;
        },
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        deleteUser: (state, action) => {
            state.users = state.users.filter(user => user.id !== action.payload);
        },
        prodSelected: (state, action) => {
            state.productNumber= action.payload;
        },
        addProducts: (state, action) => {
            state.productList.push(action.payload);
        },
        updateProducts: (state, action) => {
            const index = state.productList.findIndex(prod => prod.id === action.payload.id);
            if (index !== -1) {
                state.productList[index] = action.payload;
            }
        }
        
    },
});

export const { setUsers, setCurrentUser,updateProducts, addUser, updateUser,setCurrentAdds, deleteUser,prodSelected,addProducts,setIndex } = userSlice.actions;

export default userSlice.reducer;
