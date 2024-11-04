// src/components/UserList.js
import React, { useEffect, useState } from 'react';
import {  instanceClients } from '../axios';
import DataTable from './DataTable';
import Loader from './Loader';

const Home = () => {
    const [users, setUsers] = useState([]);
    const headerss = ['Nom', 'Email', 'Num','Adresse','Ville',"commandes"];
    const [isLoading, setIsLoading] = useState('false');

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true)
            try {
                const response = await instanceClients.get('/');
                 setUsers(response.data);
                 setIsLoading(false)

            } catch (error) {
               console.error('Error fetching users:', error);
            }
        };
console.log(users);

        fetchUsers();
    }, []);
    return (

      <div >

<p style={{marginLeft:"33%"}}>
        {isLoading &&  <Loader />}
        </p>

        <DataTable  headers={headerss} data={users} />

 
      
        </div>

    );
};

export default Home;
