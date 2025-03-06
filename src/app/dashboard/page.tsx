"use client";

import { Layout } from "antd";
import UserProfile from "../components/UserProfile";
import SearchUsers from "../components/SearchUsers";

const { Sider, Content } = Layout;

export default function Dashboard() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width="20%"
        breakpoint="lg"
        collapsedWidth="0"
        style={{
          background: "#fff",
          borderRight: "1px solid #ccc",
        }}
      >
        <UserProfile />
      </Sider>
      <Content style={{ padding: "20px" }}>
        <SearchUsers />
      </Content>
    </Layout>
  );
}
