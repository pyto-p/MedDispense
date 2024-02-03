// App.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import PaymentPage from './components/PaymentPage';
import Product from './components/Product';

const App = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [userInputAmount, setUserInputAmount] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(''); // State for the selected pain type
  const [selectedType, setSelectedType] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const handleProductClick = (productId, productPrice, selectedQuantity, productDetails) => {
    setQuantity(quantity + selectedQuantity);
    setTotalAmount(totalAmount + productPrice * selectedQuantity);
    window.location.href = '/payment';
  };

  const handlePaymentSubmission = () => {
    if (userInputAmount < totalAmount) {
      alert('Insufficient funds. Please provide enough money.');
    } else {
      const calculatedChange = userInputAmount - totalAmount;
      alert(`Payment successful! Your change is $${calculatedChange.toFixed(2)}`);
      setQuantity(0);
      setTotalAmount(0);
      setUserInputAmount(0);
      window.location.href = '/';
    }
  };

  const filteredProducts = products.filter(product =>
    (!selectedFilter || product.for === selectedFilter) &&
    (!selectedType || product.type === selectedType)
  );

  return (
    <Router>
      <NavBar />
      <Routes>
          <Route
            path="/"
            element={(
              <>
              <div className="main">
                <div className='dropdown-main'>
                  <div className="dropdown-container">
                    {/* Styled button-like dropdown for selecting pain type */}
                    <label htmlFor="painType" className="label">
                      Select Pain Type:
                    </label>
                    <div className="button-dropdown-container">
                      <select
                        id="painType"
                        onChange={(e) => setSelectedFilter(e.target.value)}
                        value={selectedFilter}
                        className="button-dropdown"
                      >
                        <option value="">All</option>
                        <option value="headache">Headache</option>
                        <option value="flu">Flu</option>
                        <option value="gastritis">Gastritis</option>
                        <option value="muscle pain">Muscle Pain</option>
                        <option value="heartburn">Heartburn</option>
                        <option value="flu">Flu</option>
                        {/* Add more options based on your data */}
                      </select>
                      <div className="button-dropdown-icon">▼</div>
                    </div>
                  </div>
                  <div className="dropdown-container">
                    {/* Dropdown for selecting product type */}
                    <label htmlFor="productType" className="label">
                      Select Product Type:
                    </label>
                    <div className="button-dropdown-container">
                      <select
                        id="productType"
                        onChange={(e) => setSelectedType(e.target.value)}
                        value={selectedType}
                        className="button-dropdown"
                      >
                        <option value="">All</option>
                        <option value="vitamins">Vitamins</option>
                        <option value="medicine">Medicine</option>
                      </select>
                      <div className="button-dropdown-icon">▼</div>
                    </div>
                  </div>
                </div>
                <div className="product-container">
                  {filteredProducts.map(product => (
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
              </div>
              </>
            )}
          />

        <Route
          path="/payment"
          element={
            <PaymentPage
              quantity={quantity}
              totalAmount={totalAmount}
              userInputAmount={userInputAmount}
              onChangeInput={(e) => setUserInputAmount(parseFloat(e.target.value))}
              onSubmitPayment={handlePaymentSubmission}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
