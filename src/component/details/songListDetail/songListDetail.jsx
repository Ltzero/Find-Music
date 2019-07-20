import React from 'react'

import styles from './songListDetail.scss'
import { Button, Divider, notification, Icon, Tag, Table } from 'antd';
import { store } from '@/store'
import { Link } from 'react-router-dom'

import { getSongListDetailsAction, computedLrcAction, getLrcAction, addToMyListAction, switchMusicPlayerAction, changePlayerMusicAction, openMusicListAction } from '@/store/actionCreator'

import { separateSingers, formateDuration } from '@/utils'

// const openNotification = () => {
//   const args = {
//     message: '提示',
//     description:
//       '该歌曲由于未bei知ban原因le不可播放,试试别的吧~',
//     icon: <Icon type="smile" style={{ color: '#F0CF61' }} />
//   }
//   notification.open(args)
// }




export default class SongListDetail extends React.Component {
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
    this.getSongListDetails(this.props.id)


    // this.getLrc(this.props.id).then( () => {
    //   const comLrc = this.computedLrc()
    //   const action = computedLrcAction(comLrc)
    //   store.dispatch(action) 
    // })
  }

  componentWillUnmount(){
    this.setState = (state,callback)=>{
     return
     }
   }

  // // 获取歌曲详情
  getSongListDetails(id) {
    const url = 'https://v1.itooi.cn/netease/songList?id='+id
    fetch(url)
      .then((response) => {
        if(response.status === 200)
        return response.json()
      })
      .then((data) => {
        console.log(data)
        // 编写action
        const action = getSongListDetailsAction(data.data)
        store.dispatch(action)
      })
  }

  
  render() {
    const columns = [
      {
        title: '标题',
        dataIndex: 'name',
        key: 'name',
        width: 250,
        render: (text, record) => (
          <Link to={'/details/song/'+record.id} >{text}</Link>
        )    
      },
      {
        title: '歌手',
        dataIndex: 'artists',
        width: 300,
        key: 'artists',
        render: artists => separateSingers(artists)
      },
      {
        title: '专辑',
        dataIndex: 'album',
        key: 'album',
        render: album => album.name
      },
      {
        title: '时长',
        dataIndex: 'duration',
        width: 100,
        key: 'duration',
        render: duration => formateDuration(duration)
      }
    ]



    return <section className={styles.wrap}>
      <div className={styles.tag}><span>歌单</span></div>
      <section className={styles.details}>
        
        <div className={styles.cover}>
          <img src={this.state.songList.coverImgUrl} alt={this.state.songList.name}/>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <h3>{this.state.songList.name}</h3>
            <p>介绍:{ this.state.songList.description}</p>
            <div>
              {/* <Button  icon="caret-right" onClick={this.playMusic}>播放</Button> */}
            </div>
          </div>

          {/* <div className={styles.lyrics}>
            <div className={styles.content} ref="lrc">
            <Divider style={{ color: '#62BFAD'}}>歌词</Divider>
              { this.state.comptedLrc.map(( line,index) => {
                return <p key={index}>{line}</p>  
              }) }
            </div>
            <a onClick={this.toggleLrc} ref="toggle">展开</a>
          </div> */}
        </div>
      </section> 


      <section className={styles.songs}>
        <div className={styles.list}>
        <Table 
          columns={columns} 
          // showTotal={total => `Total ${total} items`}
          pagination={{
            pageSize: 20,
            total: this.state.songList.trackCount,
            // showTotal: this.
          }}
          rowKey={ record => record.id }
          //   showHeader={false}
          dataSource={this.state.songList.tracks}
          //   onRow={ this.handleOnRow }
         />
        </div>
      </section>
    </section>
  }

//   addToList(url) {
//     // 建立一个音乐粗略信息文本
//     const songsData = this.state.songs[0]
//     const singers = separateSingers(songsData.ar)
//     const song = {
//       id: songsData.id,
//       name: songsData.name,
//       singer: singers,
//       time: songsData.dt,
//       cover: songsData.al.picUrl,
//       playUrl: url
//     }
//     const action1 = addToMyListAction(song)
//     store.dispatch(action1)

//     const action2 = changePlayerMusicAction(song)
//     store.dispatch(action2)

//   }

//   // 添加到列表并播放
//   playMusic = () => {
//     this.getMusicUrl(this.props.id).then( data => {
//       this.addToList(data)

//       const action1 = switchMusicPlayerAction(true)
//       store.dispatch(action1)

//       const action2 = openMusicListAction(true)
//       store.dispatch(action2)
//     })
//   }

//   getMusicUrl(id) {
//     return new Promise((resolve, reject) => {
//       const url = `https://v1.itooi.cn/netease/url?id=${id}&quality=flac`
//       fetch(url)
//       .then((response) => {
//         if(response.status === 200){
//           return response.url
//         } else {
//           // 请求地址失败 一般403 
//           openNotification()
//           reject()
//         }
//       })
//       .then((data) => {
//         resolve(data)
//       })
//     })
//   }

//   getLrc(id) {
//     return new Promise((resolve, reject) => {
//       const url = 'https://v1.itooi.cn/netease/lrc?id='+id
//       fetch(url)
//       .then((response) => {
//         if(response.status === 200)
//         return response.text()
//       })
//       .then((data) => {
//         const action = getLrcAction(data)
//         store.dispatch(action)
//         resolve()
//       })
//     })
//   }

//   // 展开歌词列表
//   toggleLrc = () => {
//     if(this.state.flag) {
//       this.refs.lrc.style.height = '300px'
//       this.setState({
//         flag: !this.state.flag
//       })
//       this.refs.toggle.innerHTML = '展开'
//     } else {
//       this.refs.lrc.style.height = 'auto'
//       this.setState({
//         flag: !this.state.flag
//       })
//       this.refs.toggle.innerHTML = '收起'
//     }
//   }

// computedLrc() {
//     const lrc = this.state.lrc
//     const compLrc = []
//     lrc.split('\n').forEach(item => {
//       compLrc.push(item.replace(/\[.*\]/, ''))
//     })
//     compLrc.shift()
//     return compLrc
//   }
}