import React from 'react'
import { Carousel, Card, Divider } from 'antd'
import styles from './carousel.scss'
import { Link } from 'react-router-dom'

export default class homeCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pics: [],
      hot: []
    }
  }

  componentDidMount() {
    this.getCarousel()
    this.getHot()
  }

  componentWillUnmount(){
    this.setState = (state,callback)=>{
     return
     }
  }


  getHot(cat = '全部', pageSize = 6, page = 0) {
    const url = `https://v1.itooi.cn/netease/songList/hot?cat=${cat}&pageSize=${pageSize}&page=${page}`
    fetch(url)
    .then( response => {
      if(response.status === 200)
        return response.json()
    })
    .then( data => {
      this.setState({
        hot: data.data
      })
    })
  }

  getCarousel() {
    fetch('https://v1.itooi.cn/netease/banner')
    .then( response => {
      if(response.status === 200)
        return response.json()
    })
    .then( data => {
      this.setState({
        pics: data.data
      })
    })
  }

  render() {
    return <section className={styles.content}>
      <div className={styles.carousel}>
        <Carousel afterChange={ this.onChange } autoplay effect="fade">
        { this.state.pics.map( item => {
            return <div key={item.targetId}>
              <div style={{ background: 'url('+item.backgroundUrl+')'}}>
                <div>
                  {
                    item.targetType === '1' 
                    ? <Link to={ '/details/'+item.targetId }><img src={item.picUrl} alt={item.targetId}/></Link>
                    : <img src={item.picUrl} alt={item.targetId}/>
                  }
                </div>
              </div>
            </div>
        })}
        </Carousel>
      </div>
      <div className={styles.recommend}>
        <Card bodyStyle={{padding: '0 30px 25px 30px'}}>
        <Divider orientation="right" style={{color: '#666', fontWeight: '600'}}>大家都在听</Divider>
            {
              this.state.hot.map( item=> {
              return <Link key={item.id} to={'/home'}>
              <div className={styles.item}> 
                <Card.Grid className={styles.grid} key={item.id} >
                <img src={item.coverImgUrl} alt={item.name} style={{width: '90px', height: '90px'}}/>
                <div className={styles.info}>
                  <span className={styles.count}>{item.playCount}</span>
                  <p className={styles.name}>{item.name}</p>
                </div>
                </Card.Grid>
              </div>
              </Link>
            })}
        </Card>
      </div>
      </section>
  }
}