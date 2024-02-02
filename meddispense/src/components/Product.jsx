// Product.js
import React, { useState } from 'react';
import '../styles/Product.css';
import BuyPopup from './BuyPopup';

const Product = ({ id, name, price, stock, imageSrc, onClick }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleBuyClick = () => {
    setShowPopup(true);
  };

  const handleConfirmBuy = () => {
    onClick(id, price, selectedQuantity);
    setShowPopup(false);
  };

  const handleCancelBuy = () => {
    setShowPopup(false);
  };

  return (
    <div className="product">
      <img src={imageSrc} alt={name} className="product-image" />
      <div className="product-details">
        <h3 className="product-name">{name}</h3>
        <p className="product-price">${price}</p>
        <button onClick={handleBuyClick} className="buy-button">Buy</button>
      </div>

      {showPopup && (
        <BuyPopup
          selectedQuantity={selectedQuantity}
          maxQuantity={5}
          onQuantityChange={setSelectedQuantity}
          onConfirm={handleConfirmBuy}
          onCancel={handleCancelBuy}
        />
      )}
    </div>
  );
};

export default Product;
