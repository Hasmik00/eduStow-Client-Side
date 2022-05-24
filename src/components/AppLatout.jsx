import React from "react";
import { Layout } from "antd";
import AppHeader from "./AppHeader";
import "./components.css";
const { Header, Content, Footer } = Layout;

export const AppLayout = ({ children }) => {
  return (
    <Layout className="layout">
      <Header>
        <AppHeader />
      </Header>
      <Content className="content">{children}</Content>
      <Footer style={{textAlign: 'center', color:'#7d9391'}}><b>eduStow</b></Footer>
    </Layout>
  );
};
