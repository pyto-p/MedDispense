import React from 'react';

function ProductButton({ onClick, productName }) {
  return <button onClick={onClick}>{productName}</button>;
}

export default ProductButton;
