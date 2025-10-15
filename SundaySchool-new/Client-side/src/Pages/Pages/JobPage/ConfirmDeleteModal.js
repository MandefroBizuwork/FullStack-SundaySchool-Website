
import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmDeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <>
      <Modal show={isOpen} onHide={onCancel} className="modal-top">
            <Modal.Header closeButton>
              <Modal.Title>
              <h4>Confirm Deletion</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
           
             
            <p>Are you sure you want to delete this record?</p>

            </Modal.Body>
            <Modal.Footer>
              <Button
                className="btn btn-warning btn-lg"
                variant="secondary"
                onClick={onConfirm}
              >
                 Delete
              </Button>
              <Button
                className="btn btn-danger btn-lg"
                variant="secondary"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
</>
  );
};

export default ConfirmDeleteModal;

 