// PaymentPage.jsx
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/PaymentPage.css';
import Payment from './Payment';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [paidAmount, setPaidAmount] = useState('');
  const [change, setChange] = useState(null);
  const [changeDenominations, setChangeDenominations] = useState(null);

  // Extract data passed from BuyPopup
  const { productDetails } = location.state || { productDetails: null };

  useEffect(() => {
    if (change !== null) {
      // If change is calculated, update stock
      updateStockInDatabase(productDetails.id, productDetails.quantity);
    }
  }, [change, productDetails]);

  const handlePayment = (cashGiven) => {
    if (!productDetails) {
      // Handle the case where data is not available
      return;
    }

    const { totalPrice, name, quantity, image } = productDetails;

    // Check if the paid amount is sufficient
    const paidAmountNumber = parseFloat(cashGiven);
    if (isNaN(paidAmountNumber) || paidAmountNumber < totalPrice) {
      alert('Insufficient funds. Transaction failed.');
    } else {
      // Transaction successful
      const remainingAmount = paidAmountNumber - totalPrice;
      setChange(remainingAmount);

      // Calculate the most efficient combination of denominations
      const denominations = calculateChangeDenominations(remainingAmount);
      setChangeDenominations(denominations);
    }
  };

  const calculateChangeDenominations = (amount) => {
    const denominations = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
    const result = {};

    denominations.forEach((denomination) => {
      const count = Math.floor(amount / denomination);
      if (count > 0) {
        result[denomination] = count;
        amount -= count * denomination;
      }
    });
    return result;
  };

  const updateStockInDatabase = async (productId, quantity) => {
    try {
      await axios.post('http://localhost:3001/payment', {
        productId,
        quantity,
      });
      console.log('Stock updated successfully.');
      console.log(productId);
      console.log(quantity);
      console.log(productDetails);
    } catch (error) {
      console.error('Error updating stock:', error);
      // Handle error as needed
    }
  };

  return (
    <div className="payment-page">
      <h2>Payment Page</h2>
      {productDetails && (
        <div className="payment-details">
          <img src={productDetails.image} alt="" />
          <div>
            <p>Product: {productDetails.name}</p>
            <p>Quantity: {productDetails.quantity}</p>
            <p>Total Price: ${productDetails.totalPrice}</p>
          </div>
        </div>
      )}

      <hr />

      <Payment totalAmount={productDetails.totalPrice} onPaymentSubmit={handlePayment} />

      {change !== null && (
        <div className="change-info">
          <p>Change: ${change}</p>
          {changeDenominations && (
            <div>
              <p>Change Breakdown:</p>
              <ul>
                {Object.entries(changeDenominations).map(([denomination, count]) => (
                  <li key={denomination}>{`${count} x ${denomination}`}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentPage;
