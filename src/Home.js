// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import { instanceUsers, instanceClients } from './axios';
import Navbar from './components/Navbar';
import DataTable from './components/DataTable';
import UpdateUser from './components/UpdateUser';

const Home = () => {
    const [users, setUsers] = useState([]);
    const headers = ['Nom', 'Email', 'Age'];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await instanceUsers.get('/');
                 setUsers(response.data);
            } catch (error) {
               console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    return (

      <div >

        <div >

        <DataTable  headers={headers} data={users} />
        </div>

 
      
        </div>

    );
};

export default Home;
