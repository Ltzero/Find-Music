import React from 'react'
import styles from './navbar.scss'
import { Icon, Affix } from 'antd'
import { Link } from 'react-router-dom'

export default class ClassName extends React.Component {
  constructor(props) {
      super(props)
      this.state={
        top: 0
      }
  }
  render() {
    return <Affix offsetTop={this.state.top}>
      <div className={styles.nav}>
      <ul className={styles.list}>
      <div className={styles.logo}>
        LOGO
      </div>
        <li><Link to="/home">首页</Link></li>
        <li><Link to="/details">最新音乐</Link></li>
        <li><Link to="/home">歌单推荐</Link></li>
        <li><Link to="/home">热门歌单</Link></li>
      </ul>
      <div className={styles.content}>
        <input className={styles.search} type="text" placeholder="发现音乐~"/>
        <button className={styles.submit}><Icon type="search" /></button>
      </div>
    </div>
    </Affix>
  }
}
