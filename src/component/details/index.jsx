import React from 'react'

import MainBlock from './mainBlock'

export default class Details extends React.Component {
  constructor(){
    super()
    this.state = {}
  }
  render() {
    return <section style={{margin: '0 10%', background: '#FFF'}}>
      <MainBlock></MainBlock>
    </section>
  } 
}