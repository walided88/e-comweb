import React from 'react';
import ProductList from './ProductList';
import ProductDetails from './ProductDetails';

const products = [
  { id: 1, name: 'Product 1', price: 29.99, image: require('../images/11.png'), description: 'Description of Product 1', reviews: 4 },
  { id: 2, name: 'Product 2', price: 39.99, image: require('../images/11.png'), description: 'Description of Product 2', reviews: 5 },
  // Ajoutez plus de produits ici
];

const ListProd= () => {
  const selectedProduct = products[0]; // Exemple pour le produit sélectionné

  return (
    <div>
      <ProductList products={products} />
      <ProductDetails product={selectedProduct} />
    </div>
  );
};

export default ListProd;
