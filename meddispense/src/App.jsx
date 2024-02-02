import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import ProductButton from './components/ProductButton';
import QuantityCounter from './components/QuantityCounter';
import TotalAmountDue from './components/TotalAmountDue';

function App() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  
  useEffect(() => {
    // Fetch product data from the backend
    axios.get('http://localhost:3001/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);
  
  const handleProductClick = (productPrice) => {
    setQuantity(quantity + 1);
    setTotalAmount(totalAmount + productPrice);
  };

  return (
    <>
      <NavBar />
      <div>
        {/* Render Product Buttons dynamically */}
        {products.map(product => (
          <ProductButton
            key={product.id}
            onClick={() => handleProductClick(product.price)}
            productName={product.name}
          />
        ))}

        {/* Quantity Counter */}
        <QuantityCounter quantity={quantity} />

        {/* Total Amount Due */}
        <TotalAmountDue totalAmount={totalAmount} />
      </div>
      </>
  );
}
export default App;
