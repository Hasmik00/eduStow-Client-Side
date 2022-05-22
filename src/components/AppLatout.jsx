import React from "react";
import { Layout } from "antd";
import AppHeader from "./AppHeader";
import "./components.css";
const { Header, Content } = Layout;

export const AppLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header>
        <AppHeader />
      </Header>
      <Content className="content">{children}</Content>
    </Layout>
  );
};
