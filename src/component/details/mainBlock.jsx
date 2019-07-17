import React from 'react'

import styles from './mainBlock.scss'
export default class MainBlock extends React.Component {
  constructor(props) {
      super(props)
      this.state={
        songs: [],
        musicUrl: '',
        lrc: '',
        flag: false,
        comptedLrc: []
      }
  }

  componentDidMount() {
    this.getSongDetails()
    this.getLrc().then( () => {

      this.setState({
        comptedLrc: this.computedLrc()
      })
    })
  }

  // 获取歌曲详情
  getSongDetails() {
    const url = 'https://v1.itooi.cn/netease/song?id=37239038'
    fetch(url)
      .then((response) => {
        if(response.status === 200)
        return response.json()
      })
      .then((data) => {
        this.setState({
          songs: data.data.songs
        })
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
            <p>{item.ar[0].name}</p>
            <p>{item.al.name}</p>
            <div>操作
              <button onClick={this.playMusic}>播放</button>
            </div>
          </div>
          <div className={styles.lyrics}>
            <div className={styles.content} ref="lrc">
              歌词
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

  playMusic = () => {
    // this.getMusicUrl().then( ()=> {
    //   this.refs.audio.src = this.state.musicUrl
    //   this.refs.audio.autoplay = true
    // })
  }

  getMusicUrl() {
    return new Promise((resolve, reject) => {
      const url = 'https://v1.itooi.cn/netease/url?id=37239038&quality=flac'
      fetch(url)
      .then((response) => {
        if(response.status === 200)
        return response.url
      })
      .then((data) => {
        this.setState({
          musicUrl: data
        })
        resolve()
      })
    })
  }

  getLrc() {
    return new Promise((resolve, reject) => {
      const url = 'https://v1.itooi.cn/netease/lrc?id=37239038'
      fetch(url)
      .then((response) => {
        if(response.status === 200)
        return response.text()
      })
      .then((data) => {
        this.setState({
          lrc: data
        })
        resolve()
      })
    })
  }

  toggleLrc = () => {
    console.log(this.state.flag)
    if(this.state.flag) {
      this.refs.lrc.style.height = '400px'
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
