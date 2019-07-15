import React from 'react'
import { Spin } from 'antd'

export default class MovieList extends React.Component {
  constructor(props) {
      super(props)
      this.state={
        MovieParams: this.props.match.params,
        isLoading: true
      }
  }

  componentWillMount() {
    setInterval(() => {
      this.setState({
        isLoading: false
      })
    },1000)
  }  
  render() {
    return <div style={{ textAlign: 'center'}}>
      {/* <h3>{ this.state.MovieParams.type}-------{ this.state.MovieParams.page }</h3> */}
      { this.loadMovieList()}
    </div>
  }
  loadMovieList = () => {
    if(this.state.isLoading) {
        return <Spin />
    } else {
        return <h1>加载完成</h1>
    }
  }

}
