import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

import Home from '@/component/home/'
import About from '@/component/about/'
import Movie from '@/component/movie/'
import Details from '@/component/details/'

import 'antd/dist/antd.css';
// import '@/css/modifyAntD.scss'
import { Layout, Menu } from 'antd';
const { Content, Footer } = Layout;

import NavBar from './component/Home/component/navbar' 
import MusicPlayer from './component/MusicPlayer/musicplayer';

export default class App extends React.Component {
  constructor(props) {
      super(props)
      this.state={}
  }
  render() {
    // 除了有HashRouter外还有BrowserRouter,该标签只能定义一个并且内部只能含有一个根节点
    return <HashRouter>   
    <Layout className="layout">
    <MusicPlayer></MusicPlayer>
    <NavBar></NavBar>
    <Content>
        <Route path="/home" component={ Home }></Route>
        <Route path="/details" component={ Details }></Route>
        <Route path="/about" component={ About }></Route>
    </Content>
    <Footer style={{ textAlign: 'center',background: '#333', color: '#fff' }}> ©2019 Created by lint </Footer>
  </Layout>
  </HashRouter>
  }
}



