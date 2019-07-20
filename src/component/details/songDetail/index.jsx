import React from 'react'

import SongDetail from './songDetail'

export default class SongDetailsWrap extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: props.match.params.id
    }
  }
  render() {
    return <section style={{margin: '0 10%', background: '#FFF'}}>
      <SongDetail id={this.state.id}></SongDetail>
    </section>
  } 
}