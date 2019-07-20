import React from 'react'

import SongListDetail from './songListDetail'

export default class SongListDetailsWrap extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: props.match.params.id
    }
  }
  render() {
    return <section style={{margin: '0 10%', background: '#FFF'}}>
      <SongListDetail id={this.state.id}></SongListDetail>
    </section>
  } 
}