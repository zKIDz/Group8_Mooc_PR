import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [user, setUser] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:9999/users")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleLogin = (data) => {
    const matchedUser = user.find(
      (user) => user.email === data.email && user.password === data.password
    );

    if (!matchedUser) {
      alert("Invalid email or password");
      return;
    }

    setSuccessMessage("Login successful!");
    setTimeout(() => {
      setIsLoggedIn(true);
    }, 2000); // Delay for 2 seconds before navigating
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container p-3 my-5 d-flex flex-column w-50">
      <h1 className="text-center mb-4">Login</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <p className="text-danger">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            {...register("password", {
              required: "Password is required",
              
            })}
          />
          {errors.password && (
            <p className="text-danger">{errors.password.message}</p>
          )}
        </div>

        <div className="d-flex justify-content-between mx-3 mb-4">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="rememberMe" />
            <label className="form-check-label" htmlFor="rememberMe">
              Remember me
            </label>
          </div>
          <a href="#!">Forgot password?</a>
        </div>

        <div className="d-flex justify-content-center">
          <button
            type="submit"
            className="btn mb-4"
            style={{ backgroundColor: "black", color: "white" }}
          >
            Sign in
          </button>
        </div>
      </form>

      {successMessage && (
        <div className="alert alert-success mt-4" role="alert">
          {successMessage}
        </div>
      )}

      <div className="text-center">
        <p>
          Not a member? <Link to="/signup">Register</Link>
        </p>
      </div>
      
    </div>
  );
  
};

export default Login;
