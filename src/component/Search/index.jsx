import React from 'react'
import styles from './search.scss'
import { Tag, Tabs, Table  } from 'antd'

import { store } from '@/store/'
import { searchSingleMusicAction } from '@/store/actionCreator'
import { Link } from 'react-router-dom'

import { formateDuration, separateSingers } from '@/utils'

const { TabPane } = Tabs

export default class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = store.getState()
    store.subscribe(this.handleStoreChange)
  }

  handleStoreChange = () => {
    this.setState(store.getState())
  }

  componentDidMount() {
    this.findMusic()
  }

  componentWillUnmount(){
    this.setState = (state,callback)=>{
     return
     }
  }


  render() {
    const columns = [
        {
          title: '单曲',
          dataIndex: 'name',
          key: 'name',
          render: (text, record) => (
            <Link to={'/details/song/'+record.id} >{text}</Link>
          )    
        },
        {
          title: '专辑',
          dataIndex: 'al',
          key: 'al',
          render: al => al.name
        },
        {
          title: '歌手',
          dataIndex: 'ar',
          key: 'ar',
          render: ar => separateSingers(ar)
        },
        {
          title: '时长',
          dataIndex: 'dt',
          key: 'dt',
          render: dt => formateDuration(dt)
        }
      ]

      return (<section className={styles.search} >
        <div className={styles.nav}>
          <div className={styles.bar}>
            <h1>Find music~</h1>
            <div className={styles.searcher}>
              <input type="text"/>
              <span>Go</span>    
            </div>
          </div>
        </div>
        <div className={styles.content}>
          <Tabs onChange={this.changeTags} type="card" tabPosition="right">
            <TabPane tab="单曲" key="1" >
              <div ref="indexPannel">
                <Table 
                  columns={columns} 
                  pagination={false}
                  rowKey={ record => record.id }
                //   showHeader={false}
                  dataSource={this.state.singerList}
                //   onRow={ this.handleOnRow }
                />
              </div>
            </TabPane>
            <TabPane tab="歌单" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="专辑" key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
          {/* <div className={styles.tags}>
            <Tag color="#108ee9">音乐</Tag>
            <Tag color="#108ee9">歌单</Tag>
            <Tag color="#108ee9">专辑</Tag>
            <Tag color="#108ee9">歌手</Tag>
          </div>
          <hr/> 
          <div className={styles.pannel}>主体显示区域</div> */}
        </div>
      </section>)
  }

  findMusic = () => {
    const key = this.props.location.state.key
    // this.props.location.state.key ? key = this.props.location.state.key : key = ''
    if(key === '') {
        return false
    }
    const url = `https://v1.itooi.cn/netease/search?keyword=${key}&type=song&pageSize=20&page=0`
      fetch(url).then( response => {
        return response.json()
      }).then( data => {
        const action = searchSingleMusicAction(data.data.songs)
        store.dispatch(action)
      })
  }

  changeTags = () => {

  }
}