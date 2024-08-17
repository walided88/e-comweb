/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { instanceClients } from '../axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

function Form() {
  const [name, setName] = useState('');
  const [num, setNum] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAdress] = useState('');
  const [ville, setVille] = useState('');
  const [error, setError] = useState('');
  const [prods, setProds] = useState([]);
  const navigate = useNavigate();
  const list = useSelector((state) => state.user.productList);
  const [cartItem, setCartItems] = useState([]);

  useEffect(() => {
    // Mettre à jour la quantité de produits sélectionnés dans le state
    setCartItems(list.filter(item => item.quantity > 0));


  }, [list]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await instanceClients.post('/submit', {
        name,
        email,
        num,
        adresse,
        prods: cartItem,
        ville,
      });

      console.log('Client data submitted:', response.data);

      // Réinitialiser les champs du formulaire après soumission
      setName('');
      setEmail('');
      setAdress('');
      setNum('');
      setVille('');
      navigate('/users/clientForm');
    } catch (error) {
      setError('Failed to process request: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <h2 style={styles.title}>Formulaire</h2>

      <label htmlFor="name" style={styles.label}>Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        required
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <label htmlFor="num" style={styles.label}>Num:</label>
      <input
        id="num"
        type="text"
        value={num}
        required
        onChange={(e) => setNum(e.target.value)}
        style={styles.input}
      />

      <label htmlFor="email" style={styles.label}>Email:</label>
      <input
        id="email"
        type="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      <label htmlFor="adresse" style={styles.label}>Adresse:</label>
      <input
        id="adresse"
        type="text"
        value={adresse}
        required
        onChange={(e) => setAdress(e.target.value)}
        style={styles.input}
      />

      <label htmlFor="ville" style={styles.label}>Ville:</label>
      <input
        id="ville"
        type="text"
        value={ville}
        required
        onChange={(e) => setVille(e.target.value)}
        style={styles.input}
      />

      <button type="submit" style={styles.button}>Submit</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    margin: 'auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: '1.5em',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  },
  label: {
    marginBottom: '5px',
    fontSize: '1em',
    color: '#555',
  },
  input: {
    padding: '10px',
    marginBottom: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1em',
    color: '#333',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1em',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default Form;
