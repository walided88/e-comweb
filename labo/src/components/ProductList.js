import React, { useEffect, useState } from 'react';
import { updateProducts, prodSelected, setIndex,setCurrentAdds } from '../reducers/userReducer';
import { useSelector, useDispatch, } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductList = ({ cartItems,totalPrice }) => {
  const [filter, setFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [products, setProducts] = useState(cartItems);
  const list = useSelector((state) => state.user.productList);
  const totalPrices = products.reduce((total, item) => total + item.price * item.quantity, 0);
  const prodSelecteds = useSelector((state) => state.user.productNumber);

  
  useEffect(() => {

    setProducts(prevItems => list.filter(item => item.quantity > 0));
   
     }, [products]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };
  const removeItem = (item) => {

    const currentQuantity=item.quantity - 1
    const newQuantity = currentQuantity;

    const updatedProduct = {
      ...item,
      quantity: newQuantity
  };
    dispatch(updateProducts(updatedProduct));
    dispatch(prodSelected(prodSelecteds - 1)); 
  };

  const addItem = (item) => {

    const currentQuantity=item.quantity + 1
    const newQuantity = currentQuantity;

    const updatedProduct = {
      ...item,
      quantity: newQuantity
  };
    dispatch(updateProducts(updatedProduct));
    dispatch(prodSelected(prodSelecteds + 1)); 
  };
     const filteredProducts = products
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
      <div className="quantity-remove">
        <p>quantity: x{product.quantity}</p>
        <button onClick={() => removeItem(product)}>-</button>
        <div className="quantity-add">
        <button  onClick={() => addItem(product)}>+</button>

        </div>

      </div>
      <p>price: {product.price} $</p>
    </div>
  ))}
</div>
      <h3>Total Price: ${totalPrices.toFixed(2) }</h3>

    </div>
  );
};

export default ProductList;
