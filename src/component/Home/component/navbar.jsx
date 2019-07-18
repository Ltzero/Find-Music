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
        <Link to="/home" className={styles.link}><li style={{background: '#333', color: "#FFF"}}>首页</li></Link>
        <Link to="/home" className={styles.link}><li>最新音乐</li></Link>
        <Link to="/home" className={styles.link}><li>歌单推荐</li></Link>
        <Link to="/home" className={styles.link}><li>热门歌单</li></Link>
      </ul>
      <div className={styles.content}>
        <input className={styles.search} type="text" placeholder="发现音乐~"/>
        <button className={styles.submit}><Icon type="search" /></button>
      </div>
    </div>
    </Affix>
  }
}
