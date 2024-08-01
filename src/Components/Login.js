import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      console.log("Sending login request for:", email, password);

      const response = await axios.get(
        `http://localhost:9999/users?email=${email}&password=${password}`
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.data.length > 0) {
        const user = response.data[0];
        console.log("User found:", user);

        localStorage.setItem("token", "fake-jwt-token");
        localStorage.setItem("role", user.role);
        localStorage.setItem("email", user.email); // Save email to local storage
        login(user.role, user.email); // Pass email to login function
        localStorage.setItem('user', JSON.stringify(user));
        setSuccessMessage("Login successful!");
        setError("");

        setTimeout(() => {
          if (user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/pro");
          }
        }, 500); // Redirect after 0.5 seconds
      } else {
        console.log("Invalid email or password");
        setError("Invalid email or password");
        setSuccessMessage("");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("An error occurred. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="body">
      <div className="container">
        <div className="row justify-content-center">
          <div className="inner-wrap col">
            <h2>Login</h2>
            <form id="form" className="form" onSubmit={handleLogin}>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p style={{ color: "red" }}>{error}</p>}
              {successMessage && (
                <p style={{ color: "green" }}>{successMessage}</p>
              )}
              <div className="form-group">
                <button
                  className="btn form-control btn-success"
                  type="submit"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  Login
                </button>
              </div>
            </form>
            <div className="text-center">
              <p>
                Not a member? <Link to="/signup">Register</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
