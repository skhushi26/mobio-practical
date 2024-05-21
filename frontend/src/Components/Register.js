import React, { useState, useRef } from "react";
import { TextField, Button, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();

    let valid = true;

    // First Name validation
    if (firstName.trim() === "") {
      setFirstNameError("First Name is required");
      valid = false;
    } else {
      setFirstNameError("");
    }

    // Last Name validation
    if (lastName.trim() === "") {
      setLastNameError("Last Name is required");
      valid = false;
    } else {
      setLastNameError("");
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() === "") {
      setEmailError("Email is required");
      valid = false;
    } else if (!email.match(emailPattern)) {
      setEmailError("Invalid email address");
      valid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (password.trim() === "") {
      setPasswordError("Last Name is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      try {
        const response = await axios.post("http://localhost:3333/user/register", {
          firstName,
          lastName,
          email,
          password,
        });
        console.log("response", response.data.statusCode);
        if (response.data.statusCode === 200) {
          setMessage(response.data.message);
          // navigate("/login", { state: { message: response.data.message } });
          setSuccess(true);
        } else if (response.data.statusCode === 400) {
          setMessage(response.data.message);
          setSuccess(false);
        } else {
          setMessage(response.data.message);
          setSuccess(false);
        }
      } catch (error) {
        console.log("error>: " + error);
        setMessage("Something went wrong in user registeration");
        setSuccess(false);
      }
    }
  };

  return (
    <React.Fragment>
      <h2>Register Form</h2>
      <div className="col-sm-10 m-auto">
        {success !== null && // Change condition to only render if success is not null
          (success ? (
            <div className="alert alert-success" role="alert" bis_skin_checked="1">
              {message}
            </div>
          ) : (
            <div className="alert alert-danger" role="alert" bis_skin_checked="1">
              {message}
            </div>
          ))}
      </div>
      <form onSubmit={handleRegister} action={<Link to="/login" />}>
        <Stack spacing={2} direction="row" sx={{ marginBottom: 4 }}>
          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            name="firstName"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            fullWidth
            required
          />

          <TextField
            type="text"
            variant="outlined"
            color="secondary"
            name="lastName"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            fullWidth
            required
          />
        </Stack>
        <TextField
          type="email"
          variant="outlined"
          color="secondary"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          type="password"
          variant="outlined"
          color="secondary"
          name="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          sx={{ mb: 4 }}
        />

        <Button variant="outlined" color="secondary" type="submit">
          Register
        </Button>
      </form>
      <small>
        Already have an account? <Link to="/login">Login Here</Link>
      </small>
    </React.Fragment>
  );
};

export default Register;
