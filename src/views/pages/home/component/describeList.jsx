import React from 'react';
import { Divider, Tag } from 'antd';
import { Link } from 'react-router-dom';
import styles from './describeList.scss';
import { getHighQualitySongListsAPI } from '@/api';

export default class DescribeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumList: [],
    };
  }

  componentDidMount() {
    this.getHighQualitySongList();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {

    };
  }

  getHighQualitySongList() {
    const params = {
      cat: '全部',
      pageSize: 4,
    };
    getHighQualitySongListsAPI(params).then((Response) => {
      this.setState({
        albumList: Response.data,
      });
    });
  }

  render() {
    return (
      <section style={{ padding: '0 5% 30px 5%', background: '#FFFFF3' }}>
        <Divider
          orientation="right"
          style={{
            fontSize: '24px', color: 'rgba(238,34,51,0.47)', margin: 0, padding: '16px 0',
          }}
          className={styles.divider}
        >
歌单推荐
        </Divider>
        {this.state.albumList.map((item, index) => {
          if (index > 3) {
            return null;
          }

          return (
            <div className={styles.content} key={item.id}>
              <div className={styles.album}>
                <Link to={`/details/songList/${item.id}`}>
                  <div className={styles.cover}>
                    <img src={item.coverImgUrl} alt="" />
                  </div>
                </Link>
                <div className={styles.info}>
                  <div className={styles.titile}>
                    <Link to={`/details/songList/${item.id}`}>
                      <span>{item.name}</span>
                    </Link>
                    <div>
                      { item.tags.map(tag => <Tag key={tag}>{tag}</Tag>)}
                    </div>
                  </div>
                  <div className={styles.line} />
                  <Link to={`/details/songList/${item.id}`}>
                    <p>{item.description}</p>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </section>
    );
  }
}
