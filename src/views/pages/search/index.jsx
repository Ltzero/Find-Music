import React from "react";
import styles from "./search.scss";
import { Tabs, Table, Card } from "antd";
import PropTypes from "prop-types";

import { store } from "@/store/";
import {
  searchSingleMusicAction,
  setSearchKeyAction,
  searchSongListsAction,
  searchAlbumAction
} from "@/store/actionCreator";
import { Link } from "react-router-dom";

import { formateDuration, separateSingers } from "@/utils";
import { findMusicAPI } from "@/api";

const { TabPane } = Tabs;
const { Meta } = Card;

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe(this.handleStoreChange);
  }

  componentDidMount() {
    this.findMusic();
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  static propTypes = {
    location: PropTypes.object.isRequired
  };

  render() {
    const columns = [
      {
        title: "单曲",
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
          <Link to={"/details/song/" + record.id}>{text}</Link>
        )
      },
      {
        title: "专辑",
        dataIndex: "al",
        key: "al",
        render: al => <Link to={"/details/album/" + al.id}>{al.name}</Link>
      },
      {
        title: "歌手",
        dataIndex: "ar",
        key: "ar",
        render: ar => separateSingers(ar)
      },
      {
        title: "时长",
        dataIndex: "dt",
        key: "dt",
        render: dt => formateDuration(dt)
      }
    ];

    return (
      <section className={styles.search}>
        <div className={styles.nav}>
          <div className={styles.bar}>
            <h1>Find music~</h1>
            <div className={styles.searcher}>
              <input
                type="text"
                ref="key"
                value={this.state.searchKey}
                onChange={this.handleInputChange}
              />
              <span onClick={e => this.findMusic("song", 20, 0, e)}>Go</span>
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <Tabs onChange={this.changeTags} type="card" tabPosition="right">
            <TabPane tab="单曲" key="1">
              <div className={styles.songsPannel}>
                <Table
                  columns={columns}
                  pagination={false}
                  rowKey={record => record.id}
                  //   showHeader={false}
                  dataSource={this.state.singleList}
                  //   onRow={ this.handleOnRow }
                />
              </div>
            </TabPane>
            <TabPane tab="歌单" key="2">
              <div className={styles.songListPannel}>
                {this.state.songLists.map(item => {
                  return (
                    <div className={styles.songList} key={item.id}>
                      <Link to={"/details/songList/" + item.id}>
                        <Card
                          bodyStyle={{ height: "150px", overFlow: "hidden" }}
                          hoverable
                          cover={<img alt={item.name} src={item.coverImgUrl} />}
                        >
                          <Meta
                            style={{
                              overflow: "hidden",
                              height: "100%",
                              paddingTop: "5px"
                            }}
                            title={item.name}
                            description={item.description}
                          />
                        </Card>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </TabPane>
            <TabPane tab="专辑" key="3">
              <div className={styles.albumPannel}>
                {this.state.albumLists.map(item => {
                  return (
                    <div className={styles.albumItem} key={item.id}>
                      <Link to={"/details/album/" + item.id}>
                        <div className={styles.cover}>
                          <img src={item.picUrl} alt={item.name} />
                          <span />
                        </div>
                        <div className={styles.info}>
                          <h3 className={styles.title}>{item.name}</h3>
                          <p className={styles.description}>
                            {item.artist.name}
                          </p>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </TabPane>
          </Tabs>
        </div>
      </section>
    );
  }

  handleStoreChange = () => {
    this.setState(store.getState());
  };

  findMusic = (type = "song", pageSize = 20, page = 0) => {
    if (this.state.searchKey === "") {
      return false;
    }
    console.log(type);
    console.log(pageSize);
    console.log(page);
    const params = {
      keyword: this.state.searchKey,
      type: type,
      pageSize: pageSize,
      page: page
    };
    findMusicAPI(params).then(Response => {
      switch (type) {
        case "song":
          const singleAction = searchSingleMusicAction(Response.data.songs);
          store.dispatch(singleAction);
          break;
        case "songList":
          const listAction = searchSongListsAction(Response.data.playlists);
          store.dispatch(listAction);
          break;
        case "album":
          const albumAction = searchAlbumAction(Response.data.albums);
          store.dispatch(albumAction);
      }
    });
  };

  handleInputChange = e => {
    const action = setSearchKeyAction(e.target.value);
    store.dispatch(action);
  };

  changeTags = index => {
    if (this.state.searchKey === "") return false;
    let mark = "";
    switch (index) {
      case "1":
        mark = "song";
        break;
      case "2":
        mark = "songList";
        break;
      case "3":
        mark = "album";
        break;
    }
    this.findMusic(mark);
  };
}
