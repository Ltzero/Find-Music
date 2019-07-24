import React from 'react'
import styles from './cardList.scss'
import { Card, Divider  } from 'antd';
import { Link } from 'react-router-dom'
import { separateSingers } from '@/utils'
import { getNewlySingleAPI } from '@/api'

const { Meta } = Card;

export default class CardList extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      newList: []
    }
  }

  componentDidMount(){
    this.getNewlyMusic()
  }

  componentWillUnmount(){
    this.setState = (state,callback)=>{
     return
     }
  }

  getNewlyMusic() {
    getNewlySingleAPI().then( response => {
      this.setState({
        newList: response.data
      })
    })
  }

  render() {
    return <section style={{padding: '0 5% 30px 5%',  background: '#fff'}}>
      <Divider orientation="right" style={{fontSize: '24px', margin: 0, padding: '16px 0', color: '#62BFAD'}} className={styles.divider}>最新音乐</Divider>
      <div className={styles.content}>
        { this.state.newList.map( item => {
          return <div className={styles.item} key={item.id}> 
          <Link to={"/details/song/"+item.id}>
          <Card
            hoverable
            cover={<img alt={ item.name } src={item.song.album.picUrl} />}
          >
          <Meta title={item.name} description={separateSingers(item.song.artists)}/>
        </Card>
        </Link>
        </div>
        })}
      </div>
    </section>
  }
}