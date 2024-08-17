// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import {  instanceClients } from '../axios';
import DataTable from './DataTable';

const Home = () => {
    const [users, setUsers] = useState([]);
    const headers = ['Nom', 'Email', 'Num','Adresse','Ville',"commandes"];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await instanceClients.get('/');
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