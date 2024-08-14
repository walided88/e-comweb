import React, { useState } from 'react';

function Form() {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Submitted name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: '8px', marginBottom: '8px' }}
      />
      <button type="submit" style={{ padding: '8px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
        Submit
      </button>
    </form>
  );
}

export default Form;
