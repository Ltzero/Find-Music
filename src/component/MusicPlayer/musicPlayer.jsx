import React from 'react'

import styles from './musicPlayer.scss'
import { Drawer } from 'antd'

export default class MusicPlayer extends React.Component {
  constructor() {
    super()
    this.state = {
      top: 0,
      visible: false, 
      placement: 'left'
    }
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    })
  }

  onClose = () => {
    this.setState({
      visible: false,
    })
  }

  onChange = e => {
    this.setState({
      placement: e.target.value,
    })
  }



  render() {
    return <div>
        <div className={styles.pendant}>
          <div className={styles.outerLine} ></div>
          <div className={styles.innerLine} onClick={this.showDrawer}></div>
        </div>
        <Drawer
          title="播放列表"
          placement={this.state.placement}
          height={40}
          mask={false}
          keyboard={true}
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
        </Drawer>   
    </div>
  }
}