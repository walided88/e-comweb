import React, { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [num, setNum] = useState('');
  const [email, setEmail] = useState('');
  const [adress, setAdress] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitted name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
            <label >Formulaire</label>

      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '8px', marginBottom: '8px' }}
      />
     
          <label htmlFor="num">Num:</label>
      <input
        id="num"
        type="number"
        value={num}
        onChange={(e) => setNum(e.target.value)}
        style={{ padding: '8px', marginBottom: '8px' }}
      />
              <label htmlFor="email">Email:</label>
      <input
        id="email"
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: '8px', marginBottom: '8px' }}
      /> 
      <label htmlFor="adress">Adresse:</label>
      <input
        id="adresse"
        type="text"
        value={adress}
        onChange={(e) => setAdress(e.target.value)}
        style={{ padding: '8px', marginBottom: '8px' }}
      />   
      <button type="submit" style={{ padding: '8px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Submit
      </button>
    </form>
  );
}

export default Form;
