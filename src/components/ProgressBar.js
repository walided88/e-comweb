import React from 'react';

function ProgressBar({ progress }) {
  return (
    <div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '4px' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '20px',
          backgroundColor: '#007bff',
          borderRadius: '4px',
          textAlign: 'center',
          color: 'white',
          lineHeight: '20px',
        }}
      >
        {progress}%
      </div>
    </div>
  );
}

export default ProgressBar;
