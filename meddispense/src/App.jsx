// App.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar'; // Import the NavBar component
import PaymentPage from './components/PaymentPage';
import Product from './components/Product';

const App = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userInputAmount, setUserInputAmount] = useState(0);
  const [change, setChange] = useState(0);



  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleProductClick = (productId, productPrice, selectedQuantity) => {
    setQuantity(quantity + selectedQuantity);
    setTotalAmount(totalAmount + productPrice * selectedQuantity);

    useNavigate('/payment', { state: { productId } });
  };

  const handlePaymentSubmission = () => {
    if (userInputAmount < totalAmount) {
      alert('Insufficient funds. Please provide enough money.');
    } else if (userInputAmount === totalAmount) {
      // Payment successful, you can add any additional logic here
      alert('Payment successful! Redirecting to homepage.');
      // Reset quantities and redirect to homepage
      setQuantity(0);
      setTotalAmount(0);
      setUserInputAmount(0);
      useNavigate('/');
    } else {
      const calculatedChange = userInputAmount - totalAmount;
      // Payment successful with change
      alert(`Payment successful! Your change is $${calculatedChange.toFixed(2)}`);
      // Reset quantities and redirect to homepage
      setQuantity(0);
      setTotalAmount(0);
      setUserInputAmount(0);
      setChange(calculatedChange);
      useNavigate('/');
    }
  };
  

  return (
    <Router>
      <NavBar />

      <Routes>
        <Route path="/" element={(
          <div className="product-container">
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
          </div>
        )} />
        <Route
          path="/payment"
          element={
            <PaymentPage
              quantity={quantity}
              totalAmount={totalAmount}
              userInputAmount={userInputAmount}
              onChangeInput={(e) => setUserInputAmount(parseFloat(e.target.value))}
              onSubmitPayment={() => handlePaymentSubmission()}
            />
          }
        />

      </Routes>
    </Router>
  );
};

export default App;
