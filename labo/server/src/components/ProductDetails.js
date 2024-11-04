import React from 'react';

const ProductDetails = ({ product }) => {


    const addToCart = (product) => {
        // Logique pour ajouter le produit au panier
        console.log(`${product.name} added to cart.`);
      };
      
  return (
    <div>
      <h2>{product.name}</h2>
      <div className="product-details">
        <img src={product.image} alt={product.name} />
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Customer Reviews: {product.reviews} stars</p>
        <div>
          <label>Customize:</label>
          {/* Options de personnalisation */}
          <select>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </div>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
