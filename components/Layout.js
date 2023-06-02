import React from 'react';
import Link from "next/link";

import { Breadcrumb, Layout, Menu } from 'antd';
import { withTheme } from '@emotion/react';

const { Header, Content, Footer } = Layout;

const MyLayout = ({ children }) => {


  return (
    <Layout className="layout">
        <Header style={{ display: 'flex', alignItems: 'center' }}>
        <div className="demo-logo" />

        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['0']} style={{ width: '100%' }}>
        <Menu.Item key="home">
            <Link href="/">
            <a>Home</a>
            </Link>
        </Menu.Item>
        <Menu.Item key="about">
            <Link href="/about">
              <a>About</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="contact">
            <Link href="/contact">
              <a>Contact</a>
            </Link>
          </Menu.Item>
          <Menu.Item key="orgcharsidebar">
            <Link href="/orgcharsidebar">
              <a>orgchar</a>
            </Link>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={{minHeight:'100vh', padding: '0px 0px' }}>
        
        <div className="site-layout-content"  >
          {children}
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>Ant Design ©{new Date().getFullYear()} Created by Ant UED</Footer>
    </Layout>
  );
};

export default withTheme(MyLayout);
