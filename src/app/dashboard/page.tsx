"use client";

import { Layout, Button } from "antd";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import UserProfile from "../components/UserProfile";
import SearchUsers from "../components/SearchUsers";
import { useState } from "react";

const { Sider, Content } = Layout;

export default function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

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
        {/* Pass the collapsed state to UserProfile */}
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
