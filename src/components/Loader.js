import React from 'react';

function Loader() {
  return (
    <div style={{
      position: 'absolute', // Positionnement absolu pour superposer

      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}>
      <div style={{
        border: '4px solid rgba(0, 0, 0, 0.1)',
        borderRadius: '70%',
        borderTop: '4px solid blue',
        width: '50px',
        height: '50px',
        marginTop:'-1050%',
        marginRight:'-666%',

        right:"55%",
        animation: 'spin 1s linear infinite',
      }}>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    </div>
  );
}

export default Loader;
