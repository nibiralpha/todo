// Modal.jsx
import React from "react";
import "./Modal.css"; // For styling the modal

const Modal = ({ show, onClose, children }) => {
  if (!show) {
    return null; // Don't render if not visible
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">Add Todo</div>
        <button className="modal-close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
