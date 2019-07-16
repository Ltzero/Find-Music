import React from 'react'
import { Layout, Menu } from 'antd';

import { Route, Link} from 'react-router-dom'

import MovieList from './movieList'

const {  Content, Sider } = Layout;


export default class Movie extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        routerParam: props.match.params 
      }
  }
  render() {
    return <Layout style={ {height: '100%', flex: 1} }>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="2">
            <Link to="/movie/hot/1">正在热映</Link>         
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/movie/comming_soon/1">即将上映</Link>
          </Menu.Item>
          <Menu.Item key="1">
            <Link to="/movie/top250/1">Top 250</Link>            
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ paddingLeft: '1px' }}>
        <Content
          style={{
            background: '#fff',
            padding: 10,
            margin: 0,
            minHeight: 280,
          }}
        >
          <Route path="/movie/:type/:page" component={MovieList}></Route>
        </Content>
      </Layout>
    </Layout>
  </Layout>
  }
}
