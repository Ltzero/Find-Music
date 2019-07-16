import React from 'react'
import Carousel from '@/component/Home/component/carousel'
import ContentBlock from '@/component/Home/component/contentBlock'
import LineBlock from '@/component/Home/component/lineBlock'

export default class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  render() {
    return <div style={{height: '100%'}}>
      <Carousel></Carousel>
      <ContentBlock></ContentBlock>
      <LineBlock></LineBlock>
    </div>
  }
}