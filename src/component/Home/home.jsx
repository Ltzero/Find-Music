import React from 'react'
import Carousel from '@/component/Home/component/carousel'
import '@/css/home.scss'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  render() {
    return <div>
      这是首页
      <Carousel></Carousel>
    </div>
  }
}