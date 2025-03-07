"use client";

import React, { useEffect, useState } from "react";
import { message, Card, Avatar, Typography, Spin } from "antd";
import { useRouter } from "next/navigation";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

interface UserProfileProps {
  collapsed?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ collapsed }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch("/api/user-profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          message.error(`Error: ${errorData.message}`);
          router.push("/"); // Redirect to the home page
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        message.error("An error occurred while fetching the user profile.");
        router.push("/"); // Redirect to the home page
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  if (collapsed) {
    // Return null or a placeholder when collapsed
    return null;
  }

  if (loading) {
    return (
      <div style={styles.container}>
        <Spin size="large" />
      </div>
    );
  }

  if (!user) {
    return (
      <div style={styles.container}>
        <Text>No user data found.</Text>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Card style={styles.card}>
        <Avatar size={64} icon={<UserOutlined />} style={styles.avatar} />
        <Title level={2}>{user.username}</Title>
        <Text>Name: {user.name}</Text>
        <br />
        <Text>Age: {user.age}</Text>
      </Card>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: "flex",
    justifyContent: "center",
    // alignItems: "center",
    height: "100vh",
    padding: "20px",
    // marginTop: "5vh",
  },
  card: {
    // width: "300px",
    textAlign: "center",
    border: "none",
  },
  avatar: {
    marginBottom: "16px",
    backgroundColor: "#87d068",
  },
};

export default UserProfile;
