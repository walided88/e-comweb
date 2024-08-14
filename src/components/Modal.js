// Modal.js
import React, { useState } from 'react';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [changColor, setChangColor] = useState('red');

  function setChang() {
    setChangColor('blue');
  }
  return (
    <div className="modal" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }} onClick={setChang}>
      <div className='animate__animated animate__pulse' style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '50%',
        right: "25%",
        position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          backgroundColor: 'red',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '5px 10px',
          cursor: 'pointer',
        }}>Close</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
