import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { singnInUsingGoogle } = useAuth();
  const auth = getAuth();
  const location = useLocation();
  const history = useHistory();
  const redirect_url = location.state?.from || "/home";
  const handleGoogleLogin = () => {
    singnInUsingGoogle().then((result) => {
      history.push(redirect_url);
    });
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRegistration = (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setError("Password must be at least 6 character long");
      return;
    }
    createUserWithEmailAndPassword(auth, email, password).then((result) => {
      const user = result.user;
      console.log(user);
    });
    history.push("/home");
  };
  return (
    <div className="login-form my-4">
      <Card className="bg-info">
        <h2>Please register</h2>
        <form onSubmit={handleRegistration}>
          <input
            type="email"
            onBlur={handleEmailChange}
            name=""
            id=""
            placeholder="your email"
          />
          <br />
          <input
            type="password"
            onBlur={handlePasswordChange}
            name=""
            id=""
            placeholder="Enter your password"
          />
          <br />
          <input
            type="password"
            onBlur={handlePasswordChange}
            name=""
            id=""
            placeholder="Re-type password"
          />
          <br />
          <input
            className="btn btn-danger w-100"
            type="submit"
            value="Submit"
          />
        </form>

        <Link to="/login">Already registeded</Link>
      </Card>
    </div>
  );
};

export default Register;
