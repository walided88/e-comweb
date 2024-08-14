import React from 'react';

function Alert({ type, message }) {
  const backgroundColor = type === 'success' ? 'green' : type === 'error' ? 'red' : 'gray';
  return (
    <div style={{
      backgroundColor,
      color: 'white',
      padding: '10px',
      borderRadius: '4px',
      marginBottom: '10px',
    }}>
      {message}
    </div>
  );
}

export default Alert;
