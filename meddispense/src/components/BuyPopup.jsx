// BuyPopup.js
import React from 'react';
import '../styles/BuyPopup.css';

function BuyPopup({ selectedQuantity, maxQuantity, onQuantityChange, onConfirm, onCancel }) {
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
      <button onClick={onConfirm}>Confirm</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}

export default BuyPopup;
