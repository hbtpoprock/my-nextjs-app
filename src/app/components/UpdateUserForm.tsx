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
  const [formValues, setFormValues] = useState<{
    name: string;
    age: null | number;
  }>({
    name: "",
    age: null,
  });
  const { message } = App.useApp(); // Access Ant Design's message API

  const onFinish = async (values: { name: string; age: number }) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/update-user/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        message.success(data.message);
        onClose(); // Close the modal on success
      } else {
        const errorData = await response.json();
        message.error(`Update failed: ${errorData.message}`);
      }
    } catch (error) {
      message.error("An error occurred while updating.");
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
      <Form
        name="update-user-form"
        onFinish={onFinish}
        onValuesChange={(changedValues, allValues) => {
          if (changedValues.name) {
            console.log("Name changed to:", changedValues.name);
          }
          if (changedValues.age) {
            console.log("Age changed to:", changedValues.age);
          }
          setFormValues(allValues); // Track form values
        }}
      >
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
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            disabled={!formValues.name && !formValues.age} // Disable when both fields are empty
          >
            Update
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateUserForm;
