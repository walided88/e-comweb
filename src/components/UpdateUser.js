// src/components/UpdateUser.js
import React, { useState, useEffect } from 'react';
import axios from '../axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser, setCurrentUser } from '../reducers/userReducer';

const UpdateUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.user.currentUser);
    const [name, setName] = useState(currentUser ? currentUser.name : '');
    const [email, setEmail] = useState(currentUser ? currentUser.email : '');
    const [age, setAge] = useState(currentUser ? currentUser.age : '');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/users/${id}`);
                dispatch(setCurrentUser(response.data));
                setName(response.data.name);
                setEmail(response.data.email);
                setAge(response.data.age);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [id, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = { id, name, email, age };
            await axios.put(`/users/${id}`, updatedUser);
            dispatch(updateUser(updatedUser));
            navigate('/');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        
        <div >


        <form onSubmit={handleSubmit}>
        <input
                type="text"
                value={id}
                onChange={(e) => setName(e.target.value)}
                placeholder="id"
                required
            />
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
                required
            />
            <button type="submit">Update</button>
        </form>

        </div>

    );
};

export default UpdateUser;
