import React, { useState } from 'react';
import CartSummary from './CartSummary';
import CartModification from './CartModification';
import ShippingEstimator from './ShippingEstimator';
import AddressSearch  from './AddressSearch';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 29.99, image: require("../images/11.png"), quantity: 1 },
    { id: 2, name: 'Product 2', price: 39.99, image: require("../images/11.png"), quantity: 2 },
    // Plus de produits peuvent être ajoutés ici
  ]);

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: parseInt(newQuantity) } : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };



  return (
    <div>
      <CartSummary cartItems={cartItems} />
      <CartModification cartItems={cartItems} updateQuantity={updateQuantity} removeItem={removeItem} />
      <div>
      <h1>Recherche d'adresse avec Google Maps API</h1>
      <AddressSearch />
    </div>    </div>
  );
};

export default CartPage;
