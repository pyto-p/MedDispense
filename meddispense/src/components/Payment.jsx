// Payment.js
import React, { useState } from 'react';

const Payment = ({ totalAmount, onPaymentSubmit }) => {
  const [cashGiven, setCashGiven] = useState(0);

  const handleDenominationClick = (value) => {
    setCashGiven(cashGiven + value);
  };

  const handlePayment = () => {
    onPaymentSubmit(cashGiven);
  };

  return (
    <div>
      <h2>Total Amount: ${totalAmount}</h2>
      <h3>Cash Given: ${cashGiven}</h3>

      <div>
        <button onClick={() => handleDenominationClick(1000)}>1000</button>
        <button onClick={() => handleDenominationClick(500)}>500</button>
        <button onClick={() => handleDenominationClick(200)}>200</button>
        <button onClick={() => handleDenominationClick(100)}>100</button>
        <button onClick={() => handleDenominationClick(50)}>50</button>
        <button onClick={() => handleDenominationClick(20)}>20</button>
        <button onClick={() => handleDenominationClick(10)}>10</button>
        <button onClick={() => handleDenominationClick(5)}>5</button>
        <button onClick={() => handleDenominationClick(2)}>2</button>
        <button onClick={() => handleDenominationClick(1)}>1</button>
      </div>

      <button onClick={handlePayment}>Submit Payment</button>
    </div>
  );
};

export default Payment;
