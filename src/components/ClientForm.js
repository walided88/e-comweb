// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import {  instanceClients } from '../axios';
import DataTable from './DataTable';

const Home = () => {
    const [users, setUsers] = useState([]);
    const headerss = ['Nom', 'Email', 'Num','Adresse','Ville',"commandes"];

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await instanceClients.get('/');
                 setUsers(response.data);

            } catch (error) {
               console.error('Error fetching users:', error);
            }
        };
console.log(users);

        fetchUsers();
    }, []);
    return (

      <div >

        <div >

        <DataTable  headers={headerss} data={users} />
        </div>

 
      
        </div>

    );
};

export default Home;
