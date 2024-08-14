// Card.js
import React from 'react';

function Card({ title, content, footer }) {
  return (
    <div
      className="animate__animated animate__pulse"
      style={{
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '16px',
        boxShadow: '0 4px 8px rgba(44,66,44,0.1)',
        marginBottom: '16px',
        width: '30%',
        marginLeft: '10%',
        marginRight: '10%',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        color: '#333',
        background: 'rgba(111,0,21,0.1)',
      }}
    >
      <h3>{title}</h3>
      <p>{content}</p>
      {footer && <footer style={{ marginTop: '16px', fontStyle: 'italic' }}>{footer}</footer>}
    </div>
  );
}

export default Card;
