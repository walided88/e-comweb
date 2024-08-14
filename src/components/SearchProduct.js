import React, { useState } from 'react';

const SearchProduct = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearch = (event) => {
    const searchQuery = event.target.value.toLowerCase();
    setSearchTerm(searchQuery);

    const results = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery)
    );
    setFilteredProducts(results);
  };

  return (
    <div  >
      {/* Barre de recherche */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
        placeholder="Search for products..."
      />

      {/* Liste des produits filtrés */}
      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
            </div>
          ))
        ) : (
          <div >No products found.</div>
        )}
      </div>
    </div>
  );
};

// Exemple de données simulées pour les produits
const products = [
  { id: 1, name: 'Smartphone', category: 'Electronics' },
  { id: 2, name: 'Laptop', category: 'Electronics' },
  { id: 3, name: 'Shoes', category: 'Fashion' },
  { id: 4, name: 'Blender', category: 'Home & Kitchen' },
  { id: 5, name: 'T-shirt', category: 'Fashion' },
];

export default SearchProduct;
