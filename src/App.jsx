import React from 'react'
import { HashRouter, Route, Link} from 'react-router-dom'

import Home from '@/component/home/'
import About from '@/component/about/'
import Movie from '@/component/movie/'
import 'antd/dist/antd.css';
import '@/css/modifyAntD.scss'


import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

import NavBar from './component/Home/component/navbar' 

export default class App extends React.Component {
  constructor(props) {
      super(props)
      this.state={}
  }
  render() {
    // 除了有HashRouter外还有BrowserRouter,该标签只能定义一个并且内部只能含有一个根节点
    return <HashRouter>   
    <Layout className="layout">
    {/* <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={[window.location.hash.split("/")[1]]}
        style={{ lineHeight: '64px' }}
      >
        <Menu.Item key="home">
          <Link to="/home">首页</Link>
        </Menu.Item>
        <Menu.Item key="movie">
          <Link to="/movie">电影</Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">关于</Link>
        </Menu.Item>
      </Menu>
    </Header> */}
    <NavBar></NavBar>
    <Content>
      {/* <div style={{ background: '#fff', height: '100%' }}> */}
        <Route path="/home" component={ Home }></Route>
        <Route path="/movie" component={ Movie }></Route>
        <Route path="/about" component={ About }></Route>
      {/* </div> */}
    </Content>
    <Footer style={{ textAlign: 'center',background: '#333', color: '#fff' }}> ©2019 Created by lint </Footer>
  </Layout>
  </HashRouter>
  }
}



