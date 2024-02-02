// BuyPopup.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BuyPopup.css';

const BuyPopup = ({ selectedQuantity, maxQuantity, onQuantityChange, onCancel }) => {
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    // You can pass any necessary data to the payment page through state or URL parameters
    navigate('/payment', { state: { selectedQuantity } });
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
      <button onClick={handleProceedToCheckout}>Proceed to Checkout</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default BuyPopup;
