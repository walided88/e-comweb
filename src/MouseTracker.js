import React, { useState } from 'react';



export default function MouseTracker() {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    return (
      <div onMouseMove={({ clientX, clientY }) => setPosition({ x: clientX, y: clientY })}>
        <p>La souris est à la position {position.x}, {position.y}</p>
      </div>
    );
}