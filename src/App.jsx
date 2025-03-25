import { useCallback, useState } from 'react';
import { Breadcrumb, Layout, Menu } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import Home from './components/Home';
import About from './components/About';
import ToDoList from './components/ToDoList';
import Counter from './components/Counter';

import { setCompomemt } from './store/layoutSlice';
import './App.scss';

const { Header, Content, Footer, Sider } = Layout;

export default function App() {
  const [collapsed, setCollapsed] = useState(true);
  const curComponent = useSelector((state) => state.layout.curComponent);
  const dispatch = useDispatch();

  const renderCom = useCallback(() => {
    switch (curComponent) {
      case 'home':
        return <Home />;
      case 'about':
        return <About />;
      case 'todoList':
        return <ToDoList />;
      case 'counter':
        return <Counter />;
      default:
        return <div>组件未加载，请排查异常</div>;
    }
  }, [curComponent]);

  return (
    <Layout className="react-vite-layout" style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['home']}
          mode="inline"
          onClick={(item) => {
            dispatch(setCompomemt(item.key));
          }}
          selectedKeys={[curComponent]}
          items={[
            {
              key: 'home',
              icon: <PieChartOutlined />,
              label: <span>Home</span>,
            },
            {
              key: 'about',
              icon: <DesktopOutlined />,
              label: <span>About</span>,
            },
            {
              key: 'todoList',
              icon: <FileOutlined />,
              label: 'ToDoList',
            },
            {
              key: 'counter',
              icon: <TeamOutlined />,
              label: 'counter',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0 }}>
          <div className="react-vite-layout-header">此处为大标题位置</div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div>{renderCom()}</div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
