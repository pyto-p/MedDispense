// PaymentPage.js
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/PaymentPage.css';
import ChangePopup from './ChangePopup'; // Import the ChangePopup component
import Payment from './Payment';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [paidAmount, setPaidAmount] = useState('');
  const [change, setChange] = useState(null);
  const [changeDenominations, setChangeDenominations] = useState(null);
  const [isChangePopupOpen, setIsChangePopupOpen] = useState(false); // New state for controlling the ChangePopup visibility

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

      // Open the ChangePopup
      setIsChangePopupOpen(true);
    }
  };

  const calculateChangeDenominations = (amount) => {
    const denominations = [1000, 500, 200, 100, 50, 20, 10, 5, 1]; //470 
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

  const handleCloseChangePopup = () => {
    // Close the ChangePopup
    setIsChangePopupOpen(false);
  };

  return (
    <div className="payment-page">
      <h2 className="payment-text">Checkout</h2>
      <div className="checkout-main">
        {productDetails && (
          <div className="payment-details">
            <img src={productDetails.image} alt="" />
            <div>
              <p><span className='payment-title'>Product:</span> {productDetails.name}</p>
              <p><span className='payment-title'>Quantity:</span> {productDetails.quantity}</p>
              <p><span className='payment-title'>Total Price: PHP</span> {productDetails.totalPrice}</p>
            </div>
          </div>
        )}
        <Payment totalAmount={productDetails.totalPrice} onPaymentSubmit={handlePayment} />
      </div>

      {change !== null && (
        <ChangePopup
          isOpen={isChangePopupOpen}
          onClose={handleCloseChangePopup}
          change={change}
          changeDenominations={changeDenominations}
        />
      )}
    </div>
  );
};

export default PaymentPage;
