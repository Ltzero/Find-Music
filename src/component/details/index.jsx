import React from 'react'

import MainBlock from './mainBlock'

export default class Details extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: props.match.params.id
    }
  }
  render() {
    return <section style={{margin: '0 10%', background: '#FFF'}}>
      <MainBlock id={this.state.id}></MainBlock>
    </section>
  } 
}