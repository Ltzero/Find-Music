import React from 'react'
import styles from './navbar.scss'
import { Icon, Affix } from 'antd'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

class Navbar extends React.Component {
  constructor(props) {
      super(props)
      this.state={
        top: 0
      }
  }

  // static propTypes = {
  //   match: PropTypes.object.isRequired,
  //   location: PropTypes.object.isRequired,
  //   history: PropTypes.object.isRequired
  // }

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
        <input className={styles.search} type="text" placeholder="发现音乐~" ref="enter"/>
        <button className={styles.submit} onClick={ this.handleSearch }><Icon type="search" /></button>
      </div>
    </div>
    </Affix>
  }

  handleSearch = () => {
    const key = this.refs.enter.value
    this.props.history.push({pathname : '/search', state:{key}})
    
  }
}

export default withRouter(Navbar)