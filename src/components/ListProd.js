import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';
import { useSelector, useDispatch } from 'react-redux';
import { updateProducts, prodSelected, setIndex,setCurrentAdds } from '../reducers/userReducer';

// const products = [
//   { id: 1, name: 'Product 1', price: 29.99, image: require('../images/11.png'), description: 'Description of Product 1', reviews: 4 },
//   { id: 2, name: 'Product 2', price: 39.99, image: require('../images/11.png'), description: 'Description of Product 2', reviews: 5 },
//   // Ajoutez plus de produits ici
// ];

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
