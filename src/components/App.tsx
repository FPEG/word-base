import { Layout, Menu } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined
} from '@ant-design/icons';
import 'antd/dist/antd.css'
import React, { useState } from 'react';
import PropTypes from 'prop-types'
import WordBase from './WordBase'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import CombinedReducers from '../redux/CombinedReducers';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import SentenceBase from './SentenceBase';

const { Header, Content, Footer, Sider } = Layout;

const store = createStore(CombinedReducers, composeWithDevTools(
  applyMiddleware(thunk),
));

const App: React.SFC = () => {

  const [collapsed, setCollapsed] = useState(true);

  return (
    <Provider store={store}>
      <BrowserRouter basename={"/WordBase"}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={() => { setCollapsed(!collapsed) }}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
              <Menu.Item key="1">
                <PieChartOutlined />
                <span>单词本</span>
                <Link to={'/'}></Link>
              </Menu.Item>
              <Menu.Item key="2">
                <DesktopOutlined />
                <span>例句库</span>
                <Link to={'/sentence'}></Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
              {/* <div style={{ padding: 24, background: '#fff' }}>Bill is a cat.</div> */}

              <Switch>
                <Route exact path="/" component={WordBase} />
                <Route path="/sentence" component={SentenceBase} />
              </Switch>

            </Content>
            <Footer style={{ textAlign: 'center',fontFamily:'SimHei' }}>◣◥◣◥◣◥◣◥◣◥◣◥◣WordBase WARNING WordBase◥◣◥◣◥◣◥◣◥◣◥◣◥</Footer>
          </Layout>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

App.propTypes = {
  collapsed: PropTypes.bool.isRequired,
  onCollapse: PropTypes.func.isRequired
}

export default App;
