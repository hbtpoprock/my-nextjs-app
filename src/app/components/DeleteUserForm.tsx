"use client";

import React, { useState } from "react";
import { Button, Modal, App } from "antd";

interface DeleteUserFormProps {
  visible: boolean;
  onClose: () => void;
  userId: string;
  onUserDeleted: () => void; // Callback to refresh users list
}

const DeleteUserForm: React.FC<DeleteUserFormProps> = ({
  visible,
  onClose,
  userId,
  onUserDeleted,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { message } = App.useApp(); // Ant Design message API

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/delete-user/${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        const data = await response.json();
        message.success(data.message || "User deleted successfully.");
        onClose(); // Close modal on success
        onUserDeleted(); // Trigger parent re-fetch
      } else {
        const errorData = await response.json();
        message.error(`Delete failed: ${errorData.message}`);
      }
    } catch (error) {
      message.error("An error occurred while deleting the user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Confirm Delete"
      open={visible}
      onCancel={onClose}
      footer={null}
    >
      <p>Are you sure you want to delete this user?</p>
      <p>
        <strong>User ID:</strong> {userId}
      </p>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button type="primary" danger onClick={handleDelete} loading={loading}>
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteUserForm;
