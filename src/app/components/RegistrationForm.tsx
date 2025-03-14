"use client";

import React, { useState } from "react";
import { Form, Input, Button, App, Modal } from "antd";

interface RegistrationFormProps {
  visible: boolean;
  onClose: () => void;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  visible,
  onClose,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { message } = App.useApp(); // Access Ant Design's message API

  const onFinish = async (values: {
    username: string;
    password: string;
    name: string;
    age: number;
  }) => {
    setLoading(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, age: Number(values.age) }),
      });

      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
        onClose(); // Close the modal on success
      } else {
        const errorData = await response.json();
        message.error(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      message.error("An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      style={{ maxWidth: "400px" }}
      title="Register"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form name="register" onFinish={onFinish}>
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
        <Form.Item
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="age"
          rules={[{ required: true, message: "Please input your age!" }]}
        >
          <Input type="number" placeholder="Age" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RegistrationForm;
