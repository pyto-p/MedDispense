// Product.jsx
import React, { useState } from 'react';
import '../styles/Product.css';
import BuyPopup from './BuyPopup';

const Product = ({ id, name, price, stock, imageSrc, onClick }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [confirmedQuantity, setConfirmedQuantity] = useState(null);
  const [localStock, setLocalStock] = useState(stock); // Local stock state

  const handleBuyClick = () => {
    if (localStock > 0) {
      setShowPopup(true);
    }
  };

  const handleConfirmBuy = () => {
    // Update local stock
    const updatedStock = localStock - selectedQuantity;
    setLocalStock(updatedStock);

    // Pass the purchase details to the parent component
    onClick(id, price, selectedQuantity);

    // Update confirmed quantity and close the popup
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
        <button onClick={handleBuyClick} className="buy-button">Buy</button>
      </div>

      {showPopup && (
        <BuyPopup
          selectedQuantity={selectedQuantity}
          maxQuantity={Math.min(localStock, 20)}
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
          <p>Total Amount Due: PHP{price * confirmedQuantity}</p>
          <button onClick={() => console.log("Proceed to Checkout")}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
