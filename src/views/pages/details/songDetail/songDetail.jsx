import React from 'react'

import styles from './songDetail.scss'
import { Button, Divider, notification, Icon } from 'antd';
import { store } from '@/store'

import { getSongDetailsAction, computedLrcAction, getLrcAction, addToMyListAction, switchMusicPlayerAction, changePlayerMusicAction, openMusicListAction } from '@/store/actionCreator'
import { Link } from 'react-router-dom'
 
import { separateSingers, computedLrc } from '@/utils'
import { getSingleDetailsAPI, getMusicLrcAPI, getPlayUrlAPI  } from '@/api'

export default class SongDetail extends React.Component {
  constructor(props) {
      super(props)
      this.state = store.getState()
      store.subscribe(this.handleStoreChange)
  }

  handleStoreChange = () => {
    this.setState(store.getState())
  }

  componentDidMount() {
    this.getSongDetails(this.props.id)
    this.getLrc(this.props.id)
  }

  componentWillUnmount(){
    this.setState = (state,callback)=>{
     return
     }
   }

  // 获取歌曲详情
  getSongDetails(id) {
    getSingleDetailsAPI(id).then( Response => {
      const action = getSongDetailsAction(Response.data.songs)
      store.dispatch(action)
    })
  }

  render() {
    return <section className={styles.wrap}>
      {this.state.single.map( item => {
        console.log(item)
        return <section className={styles.details} key={item.id}>
         <div className={styles.tag}><span>单曲</span></div>
        <div className={styles.cover}>
          <img src={item.al.picUrl} alt={item.name}/>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <h3>{item.name}</h3>
            <p>歌手名: {item.ar[0].name}</p>
            <p>所属专辑: <Link to={'/details/album/'+ item.al.id }>{item.al.name}</Link></p>
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
       })} 
      <section className={styles.recommend}>
        <div className={styles.list}></div>
      </section>
    </section>
  }

  addToList(url) {
    // 建立一个音乐粗略信息文本
    const songsData = this.state.single[0]
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
    getPlayUrlAPI(this.props.id).then( Response => {
      this.addToList(Response)
      const action1 = switchMusicPlayerAction(true)
      store.dispatch(action1)
      const action2 = openMusicListAction(true)
      store.dispatch(action2)
    })
  }

  getLrc(id) {
    getMusicLrcAPI(id).then( Response => {
      const copLrc = computedLrc(Response)
      const getAction = getLrcAction(Response)
      store.dispatch(getAction)
      const comAction = computedLrcAction(copLrc)
      store.dispatch(comAction) 
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
}
