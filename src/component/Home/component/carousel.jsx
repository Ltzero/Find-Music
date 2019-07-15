import React from 'react'
import { Carousel } from 'antd';

export default class homeCarousel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pics: []
    }
  }

  componentWillMount() {
    fetch('https://v1.itooi.cn/tencent/banner')
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
      if(this.state.pics.length>0) {
        return <Carousel afterChange={ this.onChange } autoplay effect="fade">
        { this.state.pics.map( item => {
            return <div  key={item.id} ><img src={item.pic_info.url} alt={item.id}/></div>
        })}
        </Carousel>
      } else {
          return null
      }
  }

  onChange = () => {
    
  }
}