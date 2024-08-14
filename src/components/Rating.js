import React, { useState } from 'react';

function Rating({ maxRating }) {
  const [rating, setRating] = useState(0);

  return (
    <div>
      {[...Array(maxRating)].map((_, index) => (
        <span
          key={index}
          onClick={() => setRating(index + 1)}
          style={{
            fontSize: '24px',
            cursor: 'pointer',
            color: index < rating ? 'gold' : 'gray',
          }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default Rating;
