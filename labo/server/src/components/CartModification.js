import React from 'react';

const CartModification = ({ cartItems, removeItem }) => {
  return (
    <div>
      <h2>Modify Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} style={{ width: '50px' }} />
          <p>{item.name}</p>
          <p>{item.quantity}</p>

        
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default CartModification;
