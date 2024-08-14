import React from 'react';

const CartModification = ({ cartItems, updateQuantity, removeItem }) => {
  return (
    <div>
      <h2>Modify Your Cart</h2>
      {cartItems.map(item => (
        <div key={item.id} className="cart-item">
          <img src={item.image} alt={item.name} style={{ width: '50px' }} />
          <p>{item.name}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, e.target.value)}
            min="1"
          />
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default CartModification;
