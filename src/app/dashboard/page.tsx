"use client";

import { Layout, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import UserProfile from "../components/UserProfile";
import SearchUsers from "../components/SearchUsers";
import { useState, useEffect } from "react";

const { Sider, Content } = Layout;

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prevCollapsed) => !prevCollapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={250}
        breakpoint="lg"
        collapsedWidth="64"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        theme={isDarkMode ? "dark" : "light"} // Set the theme based on dark mode
        style={{
          borderRight: isDarkMode ? "1px solid #333" : "1px solid #ccc",
        }}
      >
        <div style={{ padding: "16px", textAlign: "right" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuOutlined /> : <CloseOutlined />}
            onClick={toggleSidebar}
            style={{ color: isDarkMode ? "#171717" : "#000" }} // Adjust button color
          />
        </div>
        <UserProfile collapsed={collapsed} />
      </Sider>
      <Layout>
        <Content style={{ padding: "20px" }}>
          <SearchUsers />
        </Content>
      </Layout>
    </Layout>
  );
}
