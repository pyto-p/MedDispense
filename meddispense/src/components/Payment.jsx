// Payment.js
import React, { useState } from 'react';
import '../styles/Payment.css';

const Payment = ({ totalAmount, onPaymentSubmit }) => {
  const [cashGiven, setCashGiven] = useState(0);

  const handleDenominationClick = (value) => {
    setCashGiven(cashGiven + value);
  };

  const handlePayment = () => {
    onPaymentSubmit(cashGiven);
  };

  const handleReset = () => {
    setCashGiven(0);
  };

  const containerStyle = {
    backgroundColor: '#EBEBE8', // Greenish color
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#31352E',
    marginTop: '20px',
    width: '600px'
  };

  const buttonStyle = {
    backgroundColor: '#6C9967', // Darker greenish color
    color: 'white',
    padding: '10px',
    margin: '5px',
    borderRadius: '5px',
    cursor: 'pointer'
  };

  return (
    <div style={containerStyle}>
      <h3><span className="matcha">Cash Given:</span> PHP{cashGiven}</h3>

      <div>
        <button style={buttonStyle} onClick={() => handleDenominationClick(1000)}>1000</button>
        <button style={buttonStyle} onClick={() => handleDenominationClick(500)}>500</button>
        <button style={buttonStyle} onClick={() => handleDenominationClick(200)}>200</button>
        <button style={buttonStyle} onClick={() => handleDenominationClick(100)}>100</button>
        <button style={buttonStyle} onClick={() => handleDenominationClick(50)}>50</button>
        <button style={buttonStyle} onClick={() => handleDenominationClick(20)}>20</button>
        <button style={buttonStyle} onClick={() => handleDenominationClick(10)}>10</button>
        <button style={buttonStyle} onClick={() => handleDenominationClick(5)}>5</button>
        <button style={buttonStyle} onClick={() => handleDenominationClick(1)}>1</button>
      </div>

      <button className='change-btn' style={{ ...buttonStyle, backgroundColor: '#4F7742' }} onClick={handlePayment}>
        Confirm
      </button>

      <div>
        <button className='change-btn' style={{ ...buttonStyle, backgroundColor: '#AC2925' }} onClick={handleReset}>
          Reset
        </button>
      </div>

      
    </div>
  );
};

export default Payment;
