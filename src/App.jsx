import React from 'react';
import { HashRouter, Route } from 'react-router-dom';


import { Layout } from 'antd';
// pages
import Home from '@/views/pages/home';
import Search from '@/views/pages/search';
import songDetail from '@/views/pages/details/songDetail';
import albumDetails from '@/views/pages/details/albumDetail';
import songListDetail from '@/views/pages/details/songListDetail';

// components
import NavBar from '@/component/navbar';
import MusicPlayer from '@/component/musicPlayer';

// third part
import 'antd/dist/antd.css';


const { Content, Footer } = Layout;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // 除了有HashRouter外还有BrowserRouter,该标签只能定义一个并且内部只能含有一个根节点
    return (
      <HashRouter>
        <Layout className="layout">
          <MusicPlayer />
          <NavBar />
          <Content>
            <Route path="/" exact component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/details/song/:id" component={songDetail} />
            <Route path="/details/album/:id" component={albumDetails} />
            <Route path="/details/songList/:id" component={songListDetail} />
            <Route path="/search" component={Search} />
          </Content>
          <Footer style={{ textAlign: 'center', background: '#333', color: '#fff' }}> ©2019 Created by lint </Footer>
        </Layout>
      </HashRouter>
    );
  }
}
