// // BuyButton.jsx
// import React, { useState } from 'react';
// import BuyPopup from './BuyPopup';

// const BuyButton = ({ productId, productPrice, onBuyConfirmed }) => {
//   const [showPopup, setShowPopup] = useState(false);
//   const [selectedQuantity, setSelectedQuantity] = useState(1);

//   const handleBuyClick = () => {
//     setShowPopup(true);
//   };

//   const handlePopupClose = () => {
//     setShowPopup(false);
//   };

//   const handleQuantityChange = (quantity) => {
//     setSelectedQuantity(quantity);
//   };

//   return (
//     <div>
//       <button onClick={handleBuyClick}>Buy</button>
//       {showPopup && (
//         <BuyPopup
//           productPrice={productPrice}
//           maxQuantity={5}  // Assuming max quantity is 5, update as needed
//           selectedQuantity={selectedQuantity}
//           onQuantityChange={handleQuantityChange}
//           onBuyConfirmed={onBuyConfirmed}  // Make sure this is correctly passed
//           onCancel={handlePopupClose}
//         />
//       )}
//     </div>
//   );
// };

// export default BuyButton;
