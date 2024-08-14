import React, { useState } from 'react';

function Tooltip({ text, children }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}
         onMouseEnter={() => setIsVisible(true)}
         onMouseLeave={() => setIsVisible(false)}>
      {children}
      {isVisible && (
        <div style={{
          position: 'absolute',
          bottom: '100%',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#333',
          color: '#fff',
          padding: '5px',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
          zIndex: '1',
        }}>
          {text}
        </div>
      )}
    </div>
  );
}

export default Tooltip;
