"use client";

import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onFinish = async (values: { username: string; password: string }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
        router.push("/user-profile");

        // Handle successful login, e.g., store tokens, redirect user
      } else {
        const errorData = await response.json();
        message.error(`Login failed: ${errorData.message}`);
      }
    } catch (error) {
      message.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form name="login" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please input your username!" }]}
      >
        <Input placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
