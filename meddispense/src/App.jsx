// App.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import PaymentPage from './components/PaymentPage';
import Product from './components/Product';
import QuantityCounter from './components/QuantityCounter';
import TotalAmountDue from './components/TotalAmountDue';

const App = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleProductClick = (productId, productPrice, selectedQuantity) => {
    setQuantity(quantity + selectedQuantity);
    setTotalAmount(totalAmount + productPrice * selectedQuantity);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={(
          <div>
            {products.map(product => (
              <Product
                key={product.id}
                id={product.id}
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
        )} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </Router>
  );
};

export default App;
