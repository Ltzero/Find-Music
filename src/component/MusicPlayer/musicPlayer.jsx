import React from 'react'

import styles from './musicPlayer.scss'
import { Drawer, Table, Icon } from 'antd'
import { store } from '@/store/'
import { openMusicListAction, closeMusicListAction } from '@/store/actionCreator'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',

  },
  {
    title: 'Singer',
    dataIndex: 'singer',
    key: 'singer',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',

  },
  {
    title: 'Action',
    key: 'action',
    render: () => (
      <span className={styles.action}>
        <a className={styles.play} href="javascript:;"><Icon type="caret-right"/></a>
        <a className={styles.delete} href="javascript:;"><Icon type="delete" /></a>
      </span>
    ),

  }
];

export default class MusicPlayer extends React.Component {
  constructor() {
    super()
    // this.state = {
    //   visible: false
    // }
    this.state = store.getState()
    store.subscribe(this.handleStoreChange)
  }

  handleStoreChange = () => {
    // 从store中获取最新的数据并更新数据
    this.setState(store.getState())
  }

  showDrawer = () => {
    // this.setState({
    //   visible: true,
    // })
    const action = openMusicListAction(true)
    store.dispatch(action)
  }

  onClose = () => {
    const action = closeMusicListAction(false)
    store.dispatch(action)
  }

  render() {
    return <div>
        <div className={styles.pendant}>
          <div className={styles.outerLine} ></div>
          <div className={styles.innerLine} onClick={this.showDrawer}></div>
        </div>
        <Drawer
          title="播放列表"
          placement={'left'}
          width={400}
          mask={false}
          closable={true}
          onClose={this.onClose}
          visible={this.state.visible}
          bodyStyle={{padding:0}}
        >
          {/* <div class="">
            <audio src=""></audio>
          </div> */}


          <Table 
            columns={columns} 
            pagination={false}
            rowKey={this.state.myList.map( item => {return item.id})}
            // showHeader={false}
            dataSource={this.state.myList}
          />
        </Drawer>   
    </div>
  }
}