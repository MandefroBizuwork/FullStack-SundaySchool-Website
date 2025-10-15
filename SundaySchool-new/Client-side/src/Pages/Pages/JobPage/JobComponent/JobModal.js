import React, { useState, useEffect } from 'react';
import { Modal, Button } from "react-bootstrap";
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:2000/";

const JobModal = ({ modalType, showModal, handleClose, SlectedJob,id }) => {
  const [formSlectedJob, setFormSlectedJob] = useState({
    Company: "",
    Description: "",
    Jtitle: "",
    Location: "",
    Salary: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [err, setError] = useState(false);

  useEffect(() => {
    if (!showModal || modalType === "create") {
      setFormSlectedJob({
        Company: "",
        Description: "",
        Jtitle: "",
        Location: "",
        Salary: "",
      });
      setErrors({});
      setMessage("");
      setError(false);
    }
    if (modalType === "update" && SlectedJob) {
        setFormSlectedJob(SlectedJob);
      }
  }, [showModal, modalType]);
  

  const handleChange = (e) => {
    setFormSlectedJob({ ...formSlectedJob, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let errors = {};
    if (!formSlectedJob.Company.trim()) errors.Company = "Company name is required.";
    if (!formSlectedJob.Description.trim()) errors.Description = "Description is required.";
    if (!formSlectedJob.Jtitle.trim()) errors.Jtitle = "Job title is required.";
    if (!formSlectedJob.Location.trim()) errors.Location = "Location is required.";
    if (!formSlectedJob.Salary || isNaN(formSlectedJob.Salary) || formSlectedJob.Salary <= 0)
      errors.Salary = "Salary must be a positive number.";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      try {
        const url = modalType === "create" 
          ? `${API_BASE_URL}api/jobs/PostJob` 
          : `${API_BASE_URL}api/jobs/UpdateJob/${id}`;
        
        const method = modalType === "create" ? "POST" : "PUT";
        const response = await fetch(url, {
          method: method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formSlectedJob),
        });
  
        const data = await response.json();
        if (response.status===200) {
          setMessage(modalType === "create" ? "Job posted successfully!" : "Job updated successfully!");
          setError(false);
          setFormSlectedJob({
            Company: "",
            Description: "",
            Jtitle: "",
            Location: "",
            Salary: "",
          });
        } else {
          setMessage(data.message || "An error occurred.");
          setError(true);
          console.error("Error response:", data); // Added for debugging
        }
      } catch (err) {
        setMessage(err.message);
        setError(true);
        console.error(err.message);
      }
    } else {
      setMessage("Please fix the errors and submit again.");
      setError(true);
    }
  };
  return (
    <Modal  show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {modalType === "create" ? "Post New Job" : "Update Job"}
          {id}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Company
              <span style={{ color: "red", fontSize: "30px", marginLeft: "1px" }}>*</span>:
            </label>
            <input 
              className="form-control" 
              type="text" 
              name="Company" 
              value={formSlectedJob.Company} 
              onChange={handleChange} 
            />
            {errors.Company && <p style={{ color: "red" }}>{errors.Company}</p>}
          </div>
          <div>
            <label>Description:</label>
            <input 
              className="form-control" 
              type="text" 
              name="Description" 
              value={formSlectedJob.Description} 
              onChange={handleChange} 
            />
            {errors.Description && <p style={{ color: "red" }}>{errors.Description}</p>}
          </div>
          <div>
            <label>Job Title:</label>
            <input 
              className="form-control" 
              type="text" 
              name="Jtitle" 
              value={formSlectedJob.Jtitle} 
              onChange={handleChange} 
            />
            {errors.Jtitle && <p style={{ color: "red" }}>{errors.Jtitle}</p>}
          </div>
          <div>
            <label>Location:</label>
            <input 
              className="form-control" 
              type="text" 
              name="Location" 
              value={formSlectedJob.Location} 
              onChange={handleChange} 
            />
            {errors.Location && <p style={{ color: "red" }}>{errors.Location}</p>}
          </div>
          <div>
            <label>Salary:</label>
            <input 
              className="form-control" 
              type="number" 
              name="Salary" 
              value={formSlectedJob.Salary} 
              onChange={handleChange} 
            />
            {errors.Salary && <p style={{ color: "red" }}>{errors.Salary}</p>}
          </div>
          <div className="mt-4">
            <input 
              className="btn btn-success form-control btn-lg" 
              type="submit" 
              value={modalType === "create" ? "Save" : "Save Update"} 
            />
          </div>
        </form>
        {message && <p style={{ color: err ? "red" : "green" }}>{message}</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-danger btn-lg" variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default JobModal;
