import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import { useSelector, useDispatch } from 'react-redux';
import { updateProducts, prodSelected, setIndex,setCurrentAdds } from '../reducers/userReducer';

const ListProd= () => {
  // const selectedProduct = products[0]; // Exemple pour le produit sélectionné
  const dispatch = useDispatch();
  const list = useSelector((state) => state.user.productList);
  const [cartItem, setCartItems] = useState([list]);

  

  
  useEffect(() => {
    // Mettre à jour la quantité de produits sélectionnés dans le state
    setCartItems(prevItems => list.filter(item => item.quantity > 0));
  }, [cartItem, dispatch]);
 
  return (
    <div>
      <ProductList products={cartItem} />
      {/* <ProductDetails product={selectedProduct} /> */}
    </div>
  );
};

export default ListProd;
