import React from 'react';
import { Carousel, Card, Divider } from 'antd';
import { Link } from 'react-router-dom';
import styles from './carousel.scss';
import { getCarouselsAPI, getHotSongListsAPI } from '@/api';


export default class homeCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pics: [],
      hot: [],
    };
  }

  componentDidMount() {
    this.getCarousels();
    this.getHotSongLists();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {

    };
  }

  getCarousels() {
    getCarouselsAPI().then((response) => {
      this.setState({
        pics: response.data,
      });
    });
  }

  getHotSongLists() {
    const params = {
      cat: '全部',
      pageSize: 6,
      page: 0,
    };
    getHotSongListsAPI(params).then((response) => {
      this.setState({
        hot: response.data,
      });
    });
  }

  render() {
    return (
      <section className={styles.content}>
        <div className={styles.carousel}>
          <Carousel afterChange={this.onChange} autoplay effect="fade">
            { this.state.pics.map(item => (
              <div key={item.targetId}>
                <div style={{ background: `url(${item.backgroundUrl})` }}>
                  <div>
                    {
                    item.targetType === '1'
                      ? <Link to={`/details/song/${item.targetId}`}><img src={item.picUrl} alt={item.targetId} /></Link>
                      : item.targetType === '10' ? <Link to={`/details/album/${item.targetId}`}><img src={item.picUrl} alt={item.targetId} /></Link> : <img src={item.picUrl} alt={item.targetId} />
                  }
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
        <div className={styles.recommend}>
          <Card bodyStyle={{ padding: '0 30px 25px 30px' }}>
            <Divider orientation="right" style={{ color: '#666', fontWeight: '600' }}>大家都在听</Divider>
            {
              this.state.hot.map(item => (
                <Link key={item.id} to={`/details/songList/${item.id}`}>
                  <div className={styles.item}>
                    <Card.Grid className={styles.grid} key={item.id}>
                      <img src={item.coverImgUrl} alt={item.name} style={{ width: '90px', height: '90px' }} />
                      <div className={styles.info}>
                        <span className={styles.count}>{item.playCount}</span>
                        <p className={styles.name}>{item.name}</p>
                      </div>
                    </Card.Grid>
                  </div>
                </Link>
              ))}
          </Card>
        </div>
      </section>
    );
  }
}
