import React, { useState } from 'react';

const ProductList = ({ cartItems }) => {
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const filteredProducts = cartItems
    .filter(product => product.name)
    .sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);

  return (
    <div>
      <h2>Products</h2>
      <div>
        <input type="text" placeholder="Filter by name" value={filter} onChange={handleFilterChange} />
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-item">
            <img src={product.image} alt={product.name} />
            <p>name: {product.name}</p>
            <p>quantity: x{product.quantity}</p>
            <p>price: {product.price} $</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
