import React from 'react'
import styles from './lineBlock.scss'
import { Card, Divider, Tag  } from 'antd';
const { Meta } = Card;

export default class LineBlock extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      albumList: []
    }
  }

  componentWillMount(){
    this.getHighQualitySongList()
  }

  getHighQualitySongList(cat = '全部', pageSize = 4) {
    const url = `https://v1.itooi.cn/netease/songList/highQuality?cat=${cat}&pageSize=${pageSize}`
    fetch(url)
    .then( response => {
      return response.json()
    })
    .then( data => {
      if(data.code===200)
      this.setState({
        albumList: data.data
      })
    })
  }

  render() {
    return <section style={{padding: '0 5% 30px 5%', background: '#FFFFF3'}}>
      <Divider orientation="right" style={{fontSize: '24px',color: '#ff5035', margin: 0, padding: '16px 0'}} className={styles.divider}>歌单推荐</Divider>
      {this.state.albumList.map( (item, index) => {
        if(index>3){
          return null
        }
        else {
          return  <div className={styles.content} key={item.id}>
            <div className={styles.album}>
              <div className={styles.cover}>
                <img src={item.creator.backgroundUrl} alt=""/>
              </div>
              <div className={styles.info}>
                <div className={styles.titile}>
                  <span>{item.name}</span>
                  <div>
                    { item.tags.map( tag => {
                      return <Tag color="#f50" key={tag}>{tag}</Tag>
                    })}
                  </div>
                </div>
                <div className={styles.line}></div>
                <p>{item.description}</p>
              </div>
            </div>
         </div>
        }
      })}
    </section>
  }
}