import React from 'react';

const ProductItem = ({ src, altText, productName }) => (
  <div className="product-item">
    <img src={src} className="category-item" alt={altText} />
    <p>{productName}</p>
  </div>
);

export default ProductItem;
