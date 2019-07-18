import React from 'react'

import styles from './mainBlock.scss'
import { Button, Divider } from 'antd';
import { store } from '@/store'

import { getSongDetailsAction, computedLrcAction, getLrcAction, addToMyListAction } from '@/store/actionCreator'


export default class MainBlock extends React.Component {
  constructor(props) {
      super(props)
      this.state = store.getState()
      // this.state={
      //   songs: [],
      //   musicUrl: '',
      //   lrc: '',
      //   flag: false,
      //   comptedLrc: []
      // }

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
      // this.setState({
      //   comptedLrc: this.computedLrc()
      // })
      const comLrc = this.computedLrc()
      // const action = {
      //   type: COMPUTED_LRC,
      //   value: comLrc
      // }
      const action = computedLrcAction(comLrc)
      store.dispatch(action) 
    })
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

        // this.setState({
        //   songs: data.data.songs
        // })
        // 编写action
        const action = getSongDetailsAction(data.data.songs)
        store.dispatch(action)
      })
  }


  render() {
    return <section className={styles.wrap}>
      {this.state.songs.map( item => {
        return  <div key={item.id}><section className={styles.details}>
        <div className={styles.cover}>
          <img src={item.al.picUrl} alt={item.name}/>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <h3>{item.name}</h3>
            <p>歌手名: <a>{item.ar[0].name}</a></p>
            <p>所属专辑: <a>{item.al.name}</a></p>
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
      <audio ref="audio"></audio>
    </section>
  }

  addToList() {
    // 建立一个音乐粗略信息文本
    // console.log(this.state.songs)
    const songsData = this.state.songs[0]
    let singers = ''
    songsData.ar.map( item => {
      singers += item.name + ''
    })

    const song = {
      id: songsData.id,
      name: songsData.name,
      singer: singers,
      time: songsData.dt,
      cover: songsData.al.picUrl,
    }
    const action = addToMyListAction(song)
    store.dispatch(action)
  }




  // 添加到列表并播放
  playMusic = () => {
    this.addToList()
    // this.getMusicUrl(this.props.id).then( ()=> {
    //   this.refs.audio.src = this.state.musicUrl
    //   this.refs.audio.autoplay = true
    // })
  }

  getMusicUrl(id) {
    return new Promise((resolve, reject) => {
      const url = `https://v1.itooi.cn/netease/url?id=${id}&quality=flac`
      fetch(url)
      .then((response) => {
        if(response.status === 200)
        return response.url
      })
      .then((data) => {
        console.log(data)
        resolve()
        // this.setState({
        //   musicUrl: data
        // })
        // resolve()
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
        // this.setState({
        //   lrc: data
        // })
        const action = getLrcAction(data)
        store.dispatch(action)
        resolve()
      })
    })
  }

  // 展开歌词列表
  toggleLrc = () => {
    console.log(this.state.flag)
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
