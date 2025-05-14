import React, { useState } from "react";
import "./SignUp.css";

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    // Email validation
    if (!email.trim()) {
      setEmailError("Email ცარიელია!");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("არასწორი Email");
      valid = false;
    } else {
      setEmailError(""); // Clear error if valid
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError("შეიყვანეთ პაროლი");
      valid = false;
    } else {
      setPasswordError(""); // Clear error if valid
    }

    // Confirm password validation
    if (!confirmPassword.trim()) {
      setConfirmPasswordError("შეიყვანეთ განმეორებითი პაროლი");
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("პაროლები არ ემთხვევა");
      valid = false;
    } else {
      setConfirmPasswordError(""); // Clear error if valid
    }

    if (valid) {
      console.log("Sign Up Successful", { email, password });
    }
  };

  return (
    <div className="signup-container">
    <form onSubmit={handleSubmit} className="signup-form">
      <div className="signup-input-group">
        <input
          type="text" // Changed from "email" to "text" to avoid default browser validation
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setEmailError("")} // Remove error when focusing
        />
        <div className="errordiv-signup">
            {emailError && <p className="error">{emailError}</p>}
        </div>

      </div>

      <div className="signup-input-group">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setPasswordError("")}
        />
            <div className="errordiv-signup">
                {passwordError && <p className="error">{passwordError}</p>}
            </div>
      </div>

      <div className="signup-input-group">
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          onFocus={() => setConfirmPasswordError("")}
        />
            <div className="errordiv-signup">
                {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
            </div>
      </div>

      <button type="submit" className="signup-button">Sign Up</button>
    </form>
    </div>
  );
};

export default SignUp;
