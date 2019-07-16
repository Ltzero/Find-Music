import React from 'react'
import styles from './navbar.scss'

export default class ClassName extends React.Component {
  constructor(props) {
      super(props)
      this.state={}
  }
  render() {
    return <div className={styles.nav}>
      <ul className={styles.list}>
        <li>最新音乐</li>
        <li>最新专辑</li>
        <li></li>
        <li></li>
      </ul>
      <div className={styles.content}>
        <input className={styles.search} type="text" placeholder="发现音乐~"/>
      </div>
    </div>
  }
}
