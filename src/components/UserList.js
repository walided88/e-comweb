// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { instanceUsers, instanceClients } from '../axios';
const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await instanceUsers.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <ul>
            {users.map(user => (
                <li key={user._id}>{user.name} - {user.email}</li>
            ))}
        </ul>
    );
};

export default UserList;
