"use client";

import React, { useState } from "react";
import { Form, Input, Button, App, Modal } from "antd";

interface UpdateUserFormProps {
  visible: boolean;
  onClose: () => void;
  userId: string;
}

const UpdateUserForm: React.FC<UpdateUserFormProps> = ({
  visible,
  onClose,
  userId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { message } = App.useApp(); // Access Ant Design's message API

  const onFinish = async (values: { name: string; age: number }) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/update-user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ ...values, age: Number(values.age) }),
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
        onClose(); // Close the modal on success
      } else {
        const errorData = await response.json();
        message.error(`Update user failed: ${errorData.message}`);
      }
    } catch (error) {
      message.error("An error occurred during update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      style={{ maxWidth: "400px" }}
      title={`Update User ${userId}`}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <Form name={`update-user-`} onFinish={onFinish}>
        <Form.Item
          name="name"
          rules={[{ required: false, message: "Please input your name!" }]}
        >
          <Input placeholder="Name" />
        </Form.Item>
        <Form.Item
          name="age"
          rules={[{ required: false, message: "Please input your age!" }]}
        >
          <Input type="number" placeholder="Age" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUserForm;
