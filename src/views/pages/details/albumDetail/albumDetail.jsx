import React from 'react'

import styles from './albumDetail.scss'
import { Button, Divider, Tag, Table } from 'antd';
import { store } from '@/store'
import { Link } from 'react-router-dom'

import { getAlbumDetailsAction, switchMusicPlayerAction, addSongListToMyListAction, openMusicListAction } from '@/store/actionCreator'
import { separateSingers, formateDuration } from '@/utils'
import { getPlayUrlAPI, getAlbumDetailsAPI } from '@/api'

export default class AlbumDetail extends React.Component {
  constructor(props) {
      super(props)
      this.state = store.getState()
      // 订阅store中内容的变化执行监听回掉
      store.subscribe(this.handleStoreChange)
  }

  handleStoreChange = () => {
    this.setState(store.getState())
  }

  componentDidMount() {
    this.getAlbumDetails(this.props.id)
  }

  componentWillUnmount(){
    this.setState = (state,callback)=>{
     return
     }
   }

  // 获取歌曲详情
  getAlbumDetails(id) {
    getAlbumDetailsAPI(id).then( Response => {
      const action = getAlbumDetailsAction(Response.data)
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
        dataIndex: 'ar',
        key: 'ar',
        render: ar => separateSingers(ar)
      },
      {
        title: '时长',
        dataIndex: 'dt',
        width: 100,
        key: 'dt',
        render: dt => formateDuration(dt)
      }
    ]
    return <section className={styles.wrap}>
      <div className={styles.sort}><span>专辑</span></div>
      {  this.state.albumList.album && 
      <section className={styles.details}>
          <div className={styles.cover}>
            <img src={this.state.albumList.album.picUrl} alt={this.state.albumList.album.name}/>
          </div>
          <div className={styles.info}>
          <div className={styles.title}>
            <h3>{this.state.albumList.album.name}</h3>
            <div className={styles.tags}>{ this.state.albumList.album.tags &&  this.state.albumList.album.tags.map( (item,index) => {
              return <Tag key={index}> {item} </Tag>  
            })  }</div>
            <div>
            <p><span style={{ paddingRight: '15px'}}>简介:</span>{ this.state.albumList.album.description}</p>
              <Button  icon="caret-right" onClick={this.playMusic}>一键播放</Button>
            </div>
          </div>
          </div>
      </section> 
    }

    {this.state.albumList.songs && 
      <section className={styles.songs}>
        <Divider style={{ color: '#888'}}>共收录{ this.state.albumList.songs.length }首歌</Divider>
        <div className={styles.list}>
        <Table 
          columns={columns} 
          pagination={{
            pageSize: 20
          }}
          rowKey={ record => record.id }
          dataSource={this.state.albumList.songs}
            // onRow={ this.handleOnRow }
         />
        </div>
      </section>}
    </section>    
  }

  //添加到列表并播放
  playMusic = () => {
    getPlayUrlAPI(this.state.albumList.songs[0].id).then( Response => {
      let songList =  this.arrangeList(this.state.albumList.songs)
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
      const singer = separateSingers(k.ar)
      const Item = {
        id: k.id,
        name: k.name,
        singer,
        time: k.dt,
        cover: k.al.picUrl,
        playUrl: ''
      }
      songList.push(Item)
    })
    return songList
  }
}
