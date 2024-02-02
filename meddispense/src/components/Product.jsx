// Product.jsx
import React, { useState } from 'react';
import '../styles/Product.css';
import BuyPopup from './BuyPopup';

const Product = ({ id, name, price, stock, imageSrc, onClick }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [confirmedQuantity, setConfirmedQuantity] = useState(null);

  const handleBuyClick = () => {
    setShowPopup(true);
    onClick(id, price, selectedQuantity);
  };

  const handleConfirmBuy = () => {
    onClick(id, price, selectedQuantity);
    setConfirmedQuantity(selectedQuantity);
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
        <p className="product-price">PHP{price}</p>
        <p className="product-stock">Stock: {stock}</p>
        <button onClick={handleBuyClick} className="buy-button">Buy</button>
      </div>

      {showPopup && (
        <BuyPopup
          selectedQuantity={selectedQuantity}
          maxQuantity={Math.min(stock, 5)} // Set the maximum quantity to the available stock or 5, whichever is smaller
          onQuantityChange={setSelectedQuantity}
          onBuyConfirmed={handleConfirmBuy}
          onCancel={handleCancelBuy}
          productPrice={price}
          productName={name}
          productImage={imageSrc}
        />
      )}

      {confirmedQuantity !== null && (
        <div>
          <p>Total Amount Due: ${price * confirmedQuantity}</p>
          <button onClick={() => console.log("Proceed to Checkout")}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
