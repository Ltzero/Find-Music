import React from 'react'
import styles from './contentBlock.scss'
import { Card, Divider  } from 'antd';
const { Meta } = Card;

export default class ContentBlock extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      newList: []
    }
  }

  componentWillMount(){
    this.getNewlyMusic()
  }

  getNewlyMusic() {
    const url = 'https://v1.itooi.cn/netease/song/newest'
    fetch(url)
    .then( response => {
      return response.json()
    })
    .then( data => {
      if(data.code===200)
      this.setState({
        newList: data.data
      })
    })
  }


  render() {
    return <section style={{padding: '0 5% 30px 5%',  background: '#fff'}}>
      <Divider orientation="right" style={{fontSize: '24px', margin: 0, padding: '16px 0', color: '#62BFAD'}} className={styles.divider}>最新音乐</Divider>
      <div className={styles.content}>
        { this.state.newList.map( item => {
          return  <Card
            key={item.id}
            hoverable
            style={{ width: '18%', margin: '0 15px 15px 0' }}
            cover={<img alt={ item.name } src={item.song.album.picUrl} />}
          >
          <Meta title={item.name} description={(item.song.artists).map( (artist,index) => {
            if(index===(item.song.artists).length-1) return artist.name +' '
            return artist.name + '/'
          })}/>
        </Card>
        })}
      </div>
    </section>
  }
}