import React from 'react'

import styles from './songDetail.scss'
import { Button, Divider, notification, Icon } from 'antd';
import { store } from '@/store'

import { getSongDetailsAction, computedLrcAction, getLrcAction, addToMyListAction, switchMusicPlayerAction, changePlayerMusicAction, openMusicListAction } from '@/store/actionCreator'
import { Link } from 'react-router-dom'
 
import { separateSingers } from '@/utils'

const openNotification = () => {
  const args = {
    message: '提示',
    description:
      '该歌曲由于未bei知ban原因le不可播放,试试别的吧~',
    icon: <Icon type="smile" style={{ color: '#F0CF61' }} />
  }
  notification.open(args)
}




export default class SongDetail extends React.Component {
  constructor(props) {
      super(props)
      this.state = store.getState()
      // 订阅store中内容的变化执行监听回掉
      store.subscribe(this.handleStoreChange)
  }

  handleStoreChange = () => {
    // 从store中获取最新的数据并更新数据
    this.setState(store.getState())
  }


  componentDidMount() {
    this.getSongDetails(this.props.id)
    this.getLrc(this.props.id).then( () => {
      const comLrc = this.computedLrc()
      const action = computedLrcAction(comLrc)
      store.dispatch(action) 
    })
  }

  componentWillUnmount(){
    this.setState = (state,callback)=>{
     return
     }
   }

  // 获取歌曲详情
  getSongDetails(id) {
    const url = 'https://v1.itooi.cn/netease/song?id='+id
    fetch(url)
      .then((response) => {
        if(response.status === 200)
        return response.json()
      })
      .then((data) => {
        // 编写action
        const action = getSongDetailsAction(data.data.songs)
        store.dispatch(action)
      })
  }


  render() {
    return <section className={styles.wrap}>
      {this.state.songs.map( item => {
        return  <div key={item.id}><section className={styles.details}>
         <div className={styles.tag}><span>单曲</span></div>
        <div className={styles.cover}>
          <img src={item.al.picUrl} alt={item.name}/>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <h3>{item.name}</h3>
            <p>歌手名: {item.ar[0].name}</p>
            <p>所属专辑: <Link to={'/details/album/'+item.al.id}>{item.al.name}</Link></p>
            <div>
              <Button  icon="caret-right" onClick={this.playMusic}>播放</Button>
            </div>
          </div>
          <div className={styles.lyrics}>
            <div className={styles.content} ref="lrc">
            <Divider style={{ color: '#62BFAD'}}>歌词</Divider>
              { this.state.comptedLrc.map(( line,index) => {
                return <p key={index}>{line}</p>  
              }) }
            </div>
            <a onClick={this.toggleLrc} ref="toggle">展开</a>
          </div>
        </div>
      </section> 
      </div>
      })}
      <section className={styles.recommend}>
        <div className={styles.list}></div>
      </section>
    </section>
  }

  addToList(url) {
    // 建立一个音乐粗略信息文本
    const songsData = this.state.songs[0]
    const singers = separateSingers(songsData.ar)
    const song = {
      id: songsData.id,
      name: songsData.name,
      singer: singers,
      time: songsData.dt,
      cover: songsData.al.picUrl,
      playUrl: url
    }
    const action1 = addToMyListAction(song)
    store.dispatch(action1)

    const action2 = changePlayerMusicAction(song)
    store.dispatch(action2)

  }

  // 添加到列表并播放
  playMusic = () => {
    this.getMusicUrl(this.props.id).then( data => {
      this.addToList(data)

      const action1 = switchMusicPlayerAction(true)
      store.dispatch(action1)

      const action2 = openMusicListAction(true)
      store.dispatch(action2)
    })
  }

  getMusicUrl(id) {
    return new Promise((resolve, reject) => {
      const url = `https://v1.itooi.cn/netease/url?id=${id}&quality=flac`
      fetch(url)
      .then((response) => {
        if(response.status === 200){
          return response.url
        } else {
          // 请求地址失败 一般403 
          openNotification()
          reject()
        }
      })
      .then((data) => {
        resolve(data)
      })
    })
  }

  getLrc(id) {
    return new Promise((resolve, reject) => {
      const url = 'https://v1.itooi.cn/netease/lrc?id='+id
      fetch(url)
      .then((response) => {
        if(response.status === 200)
        return response.text()
      })
      .then((data) => {
        const action = getLrcAction(data)
        store.dispatch(action)
        resolve()
      })
    })
  }

  // 展开歌词列表
  toggleLrc = () => {
    if(this.state.flag) {
      this.refs.lrc.style.height = '300px'
      this.setState({
        flag: !this.state.flag
      })
      this.refs.toggle.innerHTML = '展开'
    } else {
      this.refs.lrc.style.height = 'auto'
      this.setState({
        flag: !this.state.flag
      })
      this.refs.toggle.innerHTML = '收起'
    }
  }

computedLrc() {
    const lrc = this.state.lrc
    const compLrc = []
    lrc.split('\n').forEach(item => {
      compLrc.push(item.replace(/\[.*\]/, ''))
    })
    compLrc.shift()
    return compLrc
  }
}
