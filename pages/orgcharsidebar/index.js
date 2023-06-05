import React, { useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import SelectionDemo from '../../components/orgchar';
import axios from 'axios';

const { Header, Sider, Content } = Layout;

export default function Posts({ posts }) {
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [selectedPostData, setSelectedPostData] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [updateKey, setUpdateKey] = useState(0); // Added updateKey state

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handlePostClick = async (postId) => {
    setSelectedPostId(postId);
  
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      const data = response.data;
  
      setSelectedPostData(data);
      setUpdateKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div>
          <Menu theme="dark" mode="inline">
            {posts.map((post) => (
              <Menu.Item key={post.id} icon={<UserOutlined />}>
                <a onClick={() => handlePostClick(post.id)}>{post.title}</a>
              </Menu.Item>
            ))}
          </Menu>
        </div>
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <div>
          <Content style={{ padding: '20px' }}>
            {selectedPostData ? (
              <div>
                <p>{selectedPostData.title}</p>
                <p>{selectedPostData.body}</p>
                <SelectionDemo selectedPostData={selectedPostData} key={updateKey} /> {/* Add the key prop */}
              </div>
            ) : (
              <p>No post selected</p>
            )}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
}

// Rest of the code remains the same

export async function getServerSideProps(context) {
  const { id } = context.query;

  if (id) {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const data = response.data;

      return {
        props: {
          posts: [],
          selectedPostData: data,
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10');
    const data = response.data;

    return {
      props: {
        posts: data,
        selectedPostData: null,
      },
    };
  } catch (error) {
    console.error(error);
  }

  return {
    props: {
      posts: [],
      selectedPostData: null,
    },
  };
}
