import React, { useEffect, useState } from 'react';
import CartSummary from './CartSummary';
import CartModification from './CartModification';
import ShippingEstimator from './ShippingEstimator';
import { updateProducts, prodSelected, setIndex,setCurrentAdds } from '../reducers/userReducer';
import { useSelector, useDispatch } from 'react-redux';
import ProductList from './ProductList';
import Form from './Form';

const CartPage = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.user.productList);
  const [cartItem, setCartItems] = useState([list]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const totalPrices = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);
  const prodSelecteds = useSelector((state) => state.user.productNumber);
  const [zeroProd, setZeroProd] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const updateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: parseInt(newQuantity) } : item
      )
    );
  };
  const nouveauTableau = cartItem.map((element) => {
    if (element.quality>0) {
      return 0; // Nouvelle valeur
    }
    return element; // Garder les autres éléments inchangés
  });
  const removeItem = (itemId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  useEffect(() => {
    setTotalPrice(totalPrices);

    if(prodSelecteds===0){
      dispatch(prodSelected(zeroProd));
      setTotalPrice(zeroProd);
      setCartItems(nouveauTableau);

    }else{
// Mettre à jour la quantité de produits sélectionnés dans le state
setCartItems(prevItems => list.filter(item => item.quantity > 0));
 
    }
     }, [totalPrices, dispatch]);
 
// console.log(cartItem,"xxxxxxxxxxxxxxxxxxx")

  return (
    <div>

      <ProductList cartItems={cartItem} totalPrice={totalPrice}/>
      <Form totaleP={totalPrice}/>

      <div>

    </div>    
    
    </div>
  );
};

export default CartPage;
