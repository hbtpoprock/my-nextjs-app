"use client";

import { Layout, Button, Menu } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import UserProfile from "../components/UserProfile";
import SearchUsers from "../components/SearchUsers";
import { useState } from "react";

const { Sider, Content } = Layout;

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  console.log("collapsed", collapsed);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={300}
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{
          background: "#fff",
          borderRight: "1px solid #ccc",
        }}
      >
        <div style={{ padding: "16px", textAlign: "right" }}>
          <Button
            type="text"
            icon={collapsed ? <MenuOutlined /> : <CloseOutlined />}
            onClick={toggleSidebar}
          />
        </div>
        <UserProfile />
      </Sider>
      <Layout>
        <Content style={{ padding: "20px" }}>
          <SearchUsers />
        </Content>
      </Layout>
    </Layout>
  );
}
