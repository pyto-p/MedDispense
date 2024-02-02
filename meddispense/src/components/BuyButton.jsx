// BuyButton.jsx
import React, { useState } from 'react';
import BuyPopup from './BuyPopup';

const BuyButton = ({ productId, productPrice, onBuy }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleBuyClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleQuantityChange = (quantity) => {
    setSelectedQuantity(quantity);
  };

  const handleBuyConfirmed = () => {
    onBuy(productId, productPrice, selectedQuantity);
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={handleBuyClick}>Buy</button>
      {showPopup && (
        <BuyPopup
          productPrice={productPrice}
          selectedQuantity={selectedQuantity}
          onQuantityChange={handleQuantityChange}
          onClose={handlePopupClose}
          onBuyConfirmed={handleBuyConfirmed}
        />
      )}
    </div>
  );
};

export default BuyButton;
