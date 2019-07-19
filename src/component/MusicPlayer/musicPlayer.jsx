import React from 'react'

import styles from './musicPlayer.scss'
import { Drawer, Table, Icon, Progress, Button } from 'antd'
import { store } from '@/store/'
import { openMusicListAction, closeMusicListAction, switchMusicPlayerAction, setPlayerProgressAction, removeFromMyListAction, changeMusicOrderAction, changePlayerMusicAction, changePlayerModeAction } from '@/store/actionCreator'

import { formateDuration, findIndexByKey } from '@/utils'



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
                <h3>{ this.state.audio ? this.state.audio.name : '' }</h3>
                <p>{ this.state.audio ? this.state.audio.singer : '' }</p>
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
            <div className={styles.option}>
              <div className={styles.base}>
                <Button shape="circle" icon="step-backward" onClick={ this.changeMusic.bind(this, 'pre') } ></Button>
                <Button size="large" shape="circle" onClick={ this.playMusic } icon={ this.state.audio === '' ? 'caret-right' : this.state.isPlay ? 'pause': 'caret-right'}>
                </Button>
                <Button shape="circle" icon="step-forward" onClick={ this.changeMusic.bind(this, 'next')} ></Button>
              </div>
              <div className={styles.extend}>
                <Button onClick={ this.changePlayerMode.bind(this, 'list_cycle') } >
                  列表循环
                </Button>
                <Button onClick={ this.changePlayerMode.bind(this, 'single_cycle') } >
                  单曲循环
                </Button>
                <Button onClick={ this.changePlayerMode.bind(this, 'list_order') } >
                  顺序播放
                </Button>
                <Button onClick={ this.changePlayerMode.bind(this, 'random_cycle') } >
                  随机播放
                </Button>
              </div>
            </div>
          </div>

          <audio ref="audio" autoPlay src = { this.state.audio && this.state.audio.playUrl } onTimeUpdate={ this.handleTimeUpdate } onEnded={ this.handleMusicEnded}></audio>
          <Table 
            columns={columns} 
            pagination={false}
            rowKey={ record => record.id }
            showHeader={false}
            dataSource={this.state.myList}
            onRow={ this.handleOnRow }
          />
        </Drawer>   
    </div>
  }

  removeMusic = record => {
    const action = removeFromMyListAction(record.id)
    store.dispatch(action)
  }

  changeMusic = option => {
    if(this.state.myList.length===0) {
      return false
    }
    const action = changeMusicOrderAction(option)
    store.dispatch(action)
  }

  changePlayerMode = mode => {
    const action = changePlayerModeAction(mode)
    store.dispatch(action)
  }



  playMusic = () => {
    if(this.state.isPlay) {
      const action = switchMusicPlayerAction(false)
      store.dispatch(action) 
      this.refs.audio.pause()
    } else {
      if(this.state.myList.length===0) {
        return false
      }
      const action = switchMusicPlayerAction(true)
      store.dispatch(action) 
      this.refs.audio.play()
    }
  }
  
  handleTimeUpdate = () => {
    const action = setPlayerProgressAction(this.refs.audio.currentTime)
    store.dispatch(action)
  }

  handleMusicEnded = () => {
    if(this.state.myList.length===0) return false
    const index = findIndexByKey(this.state.myList, 'id', this.state.audio.id )
    // 顺序播放 单曲循环 列表循环 列表随机
    switch(this.state.playMode) {
      case 'single_cycle': 
        this.refs.audio.load()
        this.refs.audio.play()
        break
      case 'random_cycle':
        const random = ~~(Math.random()*this.state.myList.length)
        const action = changePlayerMusicAction(this.state.myList[random])
        store.dispatch(action)
        break
      case 'list_order':
        // let index = findIndexByKey(this.state.myList, 'id', this.state.audio.id )
        if(index === -1) console.log(err)
        if(index === this.state.myList.length-1) {
          const action = switchMusicPlayerAction(false)
          store.dispatch(action) 
        } else {
          const action = changePlayerMusicAction(this.state.myList[index+1])
          store.dispatch(action)
        }
        break
      case 'list_cycle':
        // let index = findIndexByKey(this.state.myList, 'id', this.state.audio.id )
        if(index === -1) console.log(err)
        // 是否会设置相同值
        if(index === this.state.myList.length-1) {
          const action = changePlayerMusicAction(this.state.myList[0])
          store.dispatch(action)
        } else {
          const action = changePlayerMusicAction(this.state.myList[index+1])
          store.dispatch(action)
        }
        break
    }
  }


  handleOnRow = record => {
    return {
      onDoubleClick: () => {
        // 播放双击歌曲
        const action = changePlayerMusicAction(record)
        store.dispatch(action)

      }
    }
  }
}