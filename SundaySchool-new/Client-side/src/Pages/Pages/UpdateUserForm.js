import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const UpdateUserForm = ({ show, onClose, user, onUpdate }) => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Role: "",
    email: "",
  });

useEffect(() => {
  if (user) {
    setFormData({
      FirstName: user.FirstName || "",
      LastName: user.LastName || "",
      email: user.email || "",
      Role: user.Role || "አባል", // default role
    });
  }
}, [user]);


const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:2000/api/user/updateuser/${user.username}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to update user");

      const updatedUser = await response.json();
      alert("User updated successfully!");
      onUpdate(updatedUser); // Notify parent to refresh list
      onClose();
    } catch (err) {
      console.error(err);
     alert("Error updating user");
    }
  };

  if (!user) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update User: {user.username}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>ስም</Form.Label>
            <Form.Control
              type="text"
              name="FirstName"
              value={formData.FirstName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>የአባት ስም</Form.Label>
            <Form.Control
              type="text"
              name="LastName"
              value={formData.LastName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ሮል</Form.Label>
           <Form.Select
            name="Role"
            value={formData.Role}      // current selected value from state
            onChange={handleChange}    // updates state
            required
            >
            <option value="አድሚን">ሲስተም አድሚን</option>
            <option value="አባል">አባል</option>
            </Form.Select>


          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ኢሜል</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              ዝጋ
            </Button>
            <Button type="submit" variant="primary">
              መዝግብ
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UpdateUserForm;
