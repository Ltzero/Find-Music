import React from 'react'
import { Carousel, Card } from 'antd'
import styles from './carousel.scss'


const gridStyle = {
  width: '33%',
  height: '120px',
  lineHeight: '120px',
  padding: '0',
  textAlign: 'center',
};

export default class homeCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pics: [],
      hot: []
    }
  }

  componentWillMount() {
    this.getCarousel()
    this.getHot()
  }

  getHot(cat = '全部', pageSize = 9, page = 0) {
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
                <div><img src={item.picUrl} alt={item.targetId}/></div>
              </div>
            </div>
        })}
        </Carousel>
      </div>
      <div className={styles.recommend}>
        <Card 
          // title="热门推荐" 
          // style={{ textAlign: 'right'}}
          >
            {
              this.state.hot.map( item=> {
              return <Card.Grid style={gridStyle} key={item.id} >
                <img src={item.coverImgUrl} alt={item.name} style={{width: '100px', height: '100px'}}/>
                {/* <p>{item.name}</p> */}
              </Card.Grid>
            })}
        </Card>
      </div>

      </section>
  }
}