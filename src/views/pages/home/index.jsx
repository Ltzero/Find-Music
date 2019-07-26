import React from 'react';
import Carousel from './component/carousel';
import CardList from './component/cardList';
import DescribeList from './component/describeList';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{ height: '100%' }}>
        <Carousel />
        <CardList />
        <DescribeList />
      </div>
    );
  }
}
