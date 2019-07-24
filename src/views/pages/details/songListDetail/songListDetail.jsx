import React from 'react'
import styles from './songListDetail.scss'
import { Button, Divider, Tag, Table } from 'antd';
import { store } from '@/store'
import { Link } from 'react-router-dom'
import { getSongListDetailsAction, addSongListToMyListAction, switchMusicPlayerAction, openMusicListAction } from '@/store/actionCreator'
import { separateSingers, formateDuration } from '@/utils'
import { getSongListDetailsAPI, getPlayUrlAPI } from '@/api'

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
  }

  componentWillUnmount(){
    this.setState = (state,callback)=>{
      return
    }
  }

  // 获取歌曲列表详情
  getSongListDetails(id) {
    getSongListDetailsAPI(id).then( Response => {
      const action = getSongListDetailsAction(Response.data)
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
        key: 'artists',
        render: artists => separateSingers(artists)
      },
      {
        title: '专辑',
        dataIndex: 'album',
        key: 'album',
        render: album =>  <Link to={'/details/album/' + album.id } >{album.name}</Link> 
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
      <div className={styles.sort}><span>歌单</span></div>
      <section className={styles.details}>  
        <div className={styles.cover}>
          <img src={this.state.songList.coverImgUrl} alt={this.state.songList.name}/>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <h3>{this.state.songList.name}</h3>
            <div className={styles.tags}>{ this.state.songList.tags &&  this.state.songList.tags.map( (item,index) => {
              return <Tag key={index}> {item} </Tag>  
            })  }</div>
            <div>
            <p><span style={{ paddingRight: '15px'}}>简介:</span>{ this.state.songList.description}</p>
              <Button  icon="caret-right" onClick={this.playMusic}>一键播放</Button>
            </div>
          </div>
        </div>
      </section> 
      <section className={styles.songs}>
        <Divider style={{ color: '#888'}}>共收录{ this.state.songList.trackCount && this.state.songList.trackCount }首歌</Divider>
        <div className={styles.list}>
        <Table 
          columns={columns} 
          pagination={{
            pageSize: 20
          }}
          rowKey={ record => record.id }
          dataSource={this.state.songList.tracks}
          //   onRow={ this.handleOnRow }
         />
        </div>
      </section>
    </section>
  }

// 添加到列表并播放
  playMusic = () => {
    getPlayUrlAPI(this.state.songList.tracks[0].id).then( Response => {
      let songList =  this.arrangeList(this.state.songList.tracks)       // 顺序问题？
      songList[0].playUrl = Response
      const action = addSongListToMyListAction(songList)
      store.dispatch(action)
    })
    const action1 = switchMusicPlayerAction(true)
    store.dispatch(action1)
    const action2 = openMusicListAction(true)
    store.dispatch(action2)
  }

  arrangeList(list) {
    const songList = []
    list.map( k => {
      const singer = separateSingers(k.artists)
      const Item = {
        id: k.id,
        name: k.name,
        singer,
        time: k.duration,
        cover: k.album.picUrl,
        playUrl: ''
      }
      songList.push(Item)
    })
    return songList
  }
}
