import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

const SelfClosingAlert = ({ show, onClose,message}) => {
  // Automatically close alert after the delay
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // Close the alert
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <Alert variant = 'success' onClose={onClose} dismissible>
     {message}
    </Alert>
  );
};

export default SelfClosingAlert;
