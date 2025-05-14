import { useState } from "react";
import "./SignInSignUp.css";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const SignInSignUp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"signIn" | "signUp">("signIn");

  return (
    <div className="signin-signup-container">
      <div className="button-container">
        <button
          className={`tab-button ${activeTab === "signIn" ? "active" : ""}`}
          onClick={() => setActiveTab("signIn")}
        >
          Sign In
        </button>
        <button
          className={`tab-button ${activeTab === "signUp" ? "active" : ""}`}
          onClick={() => setActiveTab("signUp")}
        >
          Sign Up
        </button>
      </div>

      <div className="form-container">
        {activeTab === "signIn" ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
};

export default SignInSignUp;
