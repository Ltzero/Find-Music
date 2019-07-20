import React from 'react'
import { HashRouter, Route } from 'react-router-dom'

import Home from '@/component/home'
import songDetail from '@/component/details/songDetail'
import albumDetails from '@/component/details/albumDetail'
import songListDetail from '@/component/details/songListDetail'

import Search from '@/component/Search'

import 'antd/dist/antd.css';
import { Layout } from 'antd';
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
        <Route path="/" exact component={ Home }></Route>
        <Route path="/home" component={ Home }></Route>
        <Route path="/details/song/:id" component={ songDetail } ></Route>
        <Route path="/details/album/:id" component={ albumDetails } ></Route>
        <Route path="/details/songList/:id" component={ songListDetail } ></Route>
        <Route path="/search" component={ Search }></Route>
    </Content>
    <Footer style={{ textAlign: 'center',background: '#333', color: '#fff' }}> ©2019 Created by lint </Footer>
  </Layout>
  </HashRouter>
  }
}



