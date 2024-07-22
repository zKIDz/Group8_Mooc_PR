import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role : "user",
  });
  const [PasswordData, setConfirmPassword]=useState({
    confirmPassword:"",
  })
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");



  const handleSubmit = (e) => {
    e.preventDefault();
    let validationErrors = {};
    let isValid = true;

    // Validation
    if (!formData.fullName) {
      isValid = false;
      validationErrors.fullName = "Full name required";
    }
    if (!formData.email) {
      isValid = false;
      validationErrors.email = "Email required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      isValid = false;
      validationErrors.email = "Email is not valid";
    }
    if (!formData.password) {
      isValid = false;
      validationErrors.password = "Password required";
    } else if (formData.password.length < 6) {
      isValid = false;
      validationErrors.password = "Password must be at least 6 characters";
    }
    if (PasswordData.confirmPassword !== formData.password) {
      isValid = false;
      validationErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(validationErrors);

    if (isValid) {
      axios.post('http://localhost:9999/users', formData)
        .then(response => {
          setMessage("Registration successful!");
          setFormData({
            fullName: "",
            email: "",
            password: "",
          });
        })
        .catch(error => {
          setMessage("Registration failed. Please try again.");
          console.error(error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registration Information</h2>

      {message && <Alert variant={message.includes("failed") ? "danger" : "success"}>{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            isInvalid={!!errors.fullName}
          />
          <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
        </Form.Group>
        <br></br>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>
        <br></br>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>
        <br></br>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(e) => setConfirmPassword({ ...formData, confirmPassword: e.target.value })}
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
        </Form.Group>
        <br></br>
        <Button variant="dark" type="submit">
          Register
        </Button>
      </Form>
      
    </div>
    
  );
};

export default Signup;
