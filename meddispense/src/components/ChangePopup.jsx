// ChangePopup.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ChangePopup.css';

const ChangePopup = ({ isOpen, onClose, change, changeDenominations }) => {
  const navigate = useNavigate();

  const handleClose = () => {
    onClose();
    navigate('/'); // Navigate to the home page
  };

  const popupStyle = {
    display: isOpen ? 'block' : 'none'
  };

  return (
    <div className="change-popup" style={popupStyle}>
      <div className="popup-content">
        <p>Change: PHP{change}</p>
        {changeDenominations && (
          <div>
            <p>Change Breakdown:</p>
            <ul>
              {Object.entries(changeDenominations).map(([denomination, count]) => (
                <li key={denomination}>{`${count} x PHP${denomination}`}</li>
              ))}
            </ul>
          </div>
        )}
        <button className="btn" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default ChangePopup;
