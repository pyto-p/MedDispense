// App.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from './components/NavBar';
import Product from './components/Product';
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

  const handleProductClick = (productId, productPrice, selectedQuantity) => {
    setQuantity(quantity + selectedQuantity);
    setTotalAmount(totalAmount + productPrice * selectedQuantity);
  };

  return (
    <div>
      <NavBar />
      {products.map(product => (
        <Product
          name={product.name}
          price={product.price}
          stock={product.stock}
          imageSrc={product.imageSrc}
          onClick={handleProductClick}
        />
      ))}

      <QuantityCounter quantity={quantity} />
      <TotalAmountDue totalAmount={totalAmount} />
    </div>
  );
}

export default App;
