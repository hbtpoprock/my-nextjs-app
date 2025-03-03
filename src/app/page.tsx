import React from "react";
import LoginForm from "./components/LoginForm";

const HomePage: React.FC = () => {
  return (
    <div style={{ maxWidth: "300px", margin: "0 auto", padding: "50px" }}>
      <h1>Login</h1>
      <LoginForm />
    </div>
  );
};

export default HomePage;
