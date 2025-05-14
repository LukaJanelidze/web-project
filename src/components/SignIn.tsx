import { useState } from "react";
import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setEmailError("");
    setPasswordError("");

    if (!email) {
      setEmailError("Email ცარიელია");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("არასწორი Email");
      return;
    }
    if (!password) {
      setPasswordError("პაროლი ცარიელია");
      return;
    }

    try {
      const response = await fetch("https://your-backend.com/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.error === "Email not found") {
        setEmailError("Wrong email!");
      } else if (data.error === "Incorrect password") {
        setPasswordError("Wrong password!");
      } else {
        console.log("Login successful!");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleSubmit} className="signin-form">
        <div className="signin-input-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setEmailError("")}
            className={emailError ? "input-error" : ""}
          />
          <div className="errordiv-signin">
            {emailError && <p className="error-message">{emailError}</p>}
          </div>
        </div>

        <div className="signin-input-group">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setPasswordError("")}
            className={passwordError ? "input-error" : ""}
          />
          <div className="errordiv-signin">
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
        </div>

        <button type="submit" className="signin-button">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
