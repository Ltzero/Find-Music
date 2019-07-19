import React from 'react'

import styles from './musicPlayer.scss'
import { Drawer, Table, Icon, Progress } from 'antd'
import { store } from '@/store/'
import { openMusicListAction, closeMusicListAction, switchMusicPlayerAction, setPlayerProgressAction, removeFromMyListAction, changeMusicOrder } from '@/store/actionCreator'

import { formateDuration } from '@/utils'



export default class MusicPlayer extends React.Component {

  constructor() {
    super()
    this.state = store.getState()
    store.subscribe(this.handleStoreChange)
  }
  
  handleStoreChange = () => {
    // 从store中获取最新的数据并更新数据
    this.setState(store.getState())
  }

  showDrawer = () => {
    const action = openMusicListAction(true)
    store.dispatch(action)
  }

  onClose = () => {
    const action = closeMusicListAction(false)
    store.dispatch(action)
  }

  render() {
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
        render: time => formateDuration(time)
      },
      {
        title: 'Action',
        key: 'action',
        dataIndex: 'id',
        render: (text, record, index) => (
          <span className={styles.action}>
            {/* text为主键  record为当前对象 index为列表索引 */}
            {/* <a className={styles.play} href="javascript:;" onClick={ this.}><Icon type="caret-right"/></a> */}
            <a className={styles.delete} onClick={  this.removeMusic.bind(this, record) }><Icon type="delete" /></a>
          </span>
        ),
      }
    ]

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

          <div className={styles.controlBar}>
            <div className={styles.overview}>
              <div className={styles.cover}>
                {  this.state.audio ?  <img src={ this.state.audio.cover } alt={ this.state.audio.name }/> : ''}
                {/* <img src={ this.state.audio.cover } alt={ this.state.audio.name }/> */}
              </div>
              <div className={styles.info}>
                <h3>{ this.state.audio.name }</h3>
                <p>{ this.state.audio.singer }</p>
              </div>
            </div>
            <div className={styles.progress}>
              <div className={styles.currentTime}>
              { this.state.audio === '' ? '0:0' : formateDuration(this.state.currentTime) }
              </div>
              <Progress
                showInfo={false}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                percent={ this.state.audio ? this.state.progress : 0 }
              />
              <div className={styles.totalTime}>
              { this.state.audio === '' ? '0:0' : formateDuration(this.state.audio.time) }
              </div>
            </div>
            <div>
              <button onClick={ this.playMusic }>{ this.state.audio === '' ? '暂无' : this.state.isPlay ? '暂停': '播放' }</button>
              <button>上一曲</button>
              <button>下一曲</button>
            </div>
          </div>

          <audio ref="audio" autoPlay src = { this.state.audio && this.state.audio.playUrl } onTimeUpdate={ this.handleTimeUpdate }></audio>
          <Table 
            columns={columns} 
            pagination={false}
            rowKey={ record => record.id }
            showHeader={false}
            dataSource={this.state.myList}
          />
        </Drawer>   
    </div>
  }

  removeMusic = (record) => {
    const action = removeFromMyListAction(record.id)
    store.dispatch(action)
  }

  playMusic = () => {
    if(this.state.isPlay) {
      const action = switchMusicPlayerAction(false)
      store.dispatch(action) 
      this.refs.audio.pause()
    } else {
      const action = switchMusicPlayerAction(true)
      store.dispatch(action) 
      this.refs.audio.play()
    }
  }
  
  handleTimeUpdate = () => {
    
    const action = setPlayerProgressAction(this.refs.audio.currentTime)
    store.dispatch(action)
  }
}