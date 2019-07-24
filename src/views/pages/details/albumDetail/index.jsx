import React from 'react'

import AlbumDetail from './albumDetail'

export default class AlbumDetailsWrap extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      id: props.match.params.id
    }
  }
  render() {
    return <section style={{margin: '0 10%', background: '#FFF'}}>
      <AlbumDetail id={this.state.id}></AlbumDetail>
    </section>
  } 
}