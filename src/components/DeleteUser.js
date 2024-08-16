import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { instanceUsers, instanceClients } from '../axios';
import Navbar from './Navbar';

const DeleteUser = () => {
    const navigate = useNavigate(); // Remplacez useHistory par useNavigate
    const { id } = useParams();

    const deleteUser = async () => {
        try {
            await instanceUsers.delete(`/users/${id}`);
            navigate('/users'); // Utilisez navigate à la place de history.push
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
                    <Navbar />

            <h2>Are you sure you want to delete this user?</h2>
            <button onClick={deleteUser}>Yes, delete</button>
        </div>
    );
};

export default DeleteUser;
