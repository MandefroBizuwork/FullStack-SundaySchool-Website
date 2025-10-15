import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

function SelfCloseModalAlert ({ showModal, onClose })  { 



  // Automatically close modal after the delay time
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        onClose(); // Close the modal
      }, 3000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [showModal, onClose]);

  return (
    <Modal show={showModal} onHide={onClose} centered>
      
      <Modal.Body>Job deleted successfully </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SelfCloseModalAlert;