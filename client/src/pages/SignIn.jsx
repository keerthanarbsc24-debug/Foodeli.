
import { useState } from "react";
import { Link } from "react-router-dom";

function SignIn({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

function handleSubmit(event) {
  event.preventDefault();
  onSignIn();
}

  return (
    <main className="signin-page">
      <div className="signin-card">
        <div className="signin-logo">
          F<span>.</span>
        </div>

        <p className="signin-tag">WELCOME BACK</p>
        <h1>Sign in to Foodeli</h1>
        <p className="signin-description">
          Sign in to continue your food ordering experience.
        </p>

        <form onSubmit={handleSubmit} className="signin-form">
          <label htmlFor="signin-email">Email Address</label>
          <input
            id="signin-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setMessage("");
            }}
            required
          />

          <label htmlFor="signin-password">Password</label>
          <input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setMessage("");
            }}
            minLength={6}
            required
          />

          <button type="submit" className="signin-button">
            Sign In
          </button>

          {message && (
            <p className="signin-message" role="status">
              {message}
            </p>
          )}
        </form>

        <p className="signin-back">
          New to Foodeli?{" "}
          <Link to="/menu">Explore our menu</Link>
        </p>
      </div>
    </main>
  );
}

export default SignIn;