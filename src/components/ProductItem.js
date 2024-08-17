import React from 'react';

const ProductItem = ({ src, altText, productName, methode }) => {
  return (
    <div onClick={methode} style={{ cursor: 'pointer' }}>
      <img src={src} alt={altText} className="category-item" style={{ width: '300px', height: '300px' }} />
      <p>{productName}</p>
    </div>
  );
};

export default ProductItem;
