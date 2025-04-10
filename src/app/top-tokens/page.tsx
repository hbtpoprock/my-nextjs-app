"use client";

import React, { useState } from "react";
import { App, Button } from "antd";

const TopTokensPage: React.FC = () => {
  const { message } = App.useApp(); // Access Ant Design's message API
  const [loading, setLoading] = useState(false);

  const getTopTokens = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/top-tokens", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        message.error(`Error: ${errorData.message}`);
        return;
      }

      message.success("get top tokens successfully");
      const topTokens = await response.json();
      console.log("topTokens", topTokens);
    } catch (error) {
      message.error("An error occurred while fetching the top-tokens.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Ensure the div takes the full viewport height
        textAlign: "center", // Centers the text inside the button
      }}
    >
      <Button
        style={{ padding: "5px" }}
        type="primary"
        onClick={getTopTokens}
        loading={loading}
      >
        Get Top Tokens
      </Button>
    </div>
  );
};

export default TopTokensPage;
