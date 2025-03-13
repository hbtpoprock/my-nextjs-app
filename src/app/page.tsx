"use client";

import React, { useState } from "react";
import { Button } from "antd";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";

const HomePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "50px" }}>
      <h1>Login</h1>
      <LoginForm />
      <p>
        Don't have an account?
        <Button style={{ padding: "5px" }} type="link" onClick={showModal}>
          Sign up
        </Button>
      </p>
      <RegistrationForm visible={isModalVisible} onClose={closeModal} />
    </div>
  );
};

export default HomePage;
