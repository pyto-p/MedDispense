// BuyPopup.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BuyPopup.css';

const BuyPopup = ({ selectedQuantity, maxQuantity, onQuantityChange, onCancel, productPrice, productName, productImage }) => {
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    // Pass data to the payment page
    navigate('/payment', {
      state: {
        productDetails: {
          image: productImage,
          name: productName,
          quantity: selectedQuantity,
          totalPrice: selectedQuantity * productPrice,
        },
      },
    });
  };

  return (
    <div className="buy-popup">
      <h3>Select Quantity</h3>
      <p>Maximum: {maxQuantity}</p>
      <input
        type="number"
        value={selectedQuantity}
        min={1}
        max={maxQuantity}
        onChange={(e) => onQuantityChange(Number(e.target.value))}
      />

      {/* Show Total Amount Due and Proceed to Checkout */}
      {selectedQuantity !== null && (
        <div>
          <p>Total Amount Due: PHP{selectedQuantity * productPrice}</p>
          <button className='btn flex' onClick={handleProceedToCheckout}>Proceed to Checkout</button>
        </div>
      )}

      <button className='btn flex'onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default BuyPopup;
