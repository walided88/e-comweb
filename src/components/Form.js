import React, { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [num, setNum] = useState('');
  const [email, setEmail] = useState('');
  const [adress, setAdress] = useState('');
  const [ville, setVille] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitted name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
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
        type="number"
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

      <label htmlFor="adress" style={styles.label}>Adresse:</label>
      <input
        id="adress"
        type="text"
        value={adress}
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
  inputFocus: {
    borderColor: '#007bff',
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
