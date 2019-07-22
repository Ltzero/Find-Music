// 引入actiontypes
import { GET_SONG_DETAILS, GET_LRC, COMPUTED_LRC, ADD_TO_MY_LIST, OPEN_MUSIC_LIST, CLOSE_MUSIC_LIST, SWITCH_MUSIC_PLAYER, CHANGE_PLAYER_MUSIC, SET_PLAYER_PROGRESS, REMOVE_FROM_MY_LIST, CHANGE_MUSIC_ORDER, CHANGE_PLAYER_MODE, SEARCH_SINGLE_MUSIC, GET_SONG_LIST_DETAILS, ADD_SONG_LIST_TO_MY_LIST, ADD_SONG_PLAY_URL, SET_SEARCH_KEY, SEARCH_SONG_LISTS, GET_ALBUM_DETAILS,SEARCH_ALBUM } from './actionTypes'
import { objectArrayConcatAndRemoveDuplicate } from '@/utils' 

// 给数据赋初值用于第一次渲染
const defaultState = {
  // musicplayer中的state
  visible: false,
  myList: [],
  isPlay: false,
  currentTime: 0,
  progress: 0,
  audio: '',
  searchKey: '',
  playMode: 'list_order',
  // 歌曲详情
  flag: false,
  songs: [],
  lrc: '',
  comptedLrc: [],
  // 歌单详情
  songList: [],
  // 专辑详情
  albumList: [],
  // 搜索页state
  singleList: [],
  songLists: [],  //此处为搜索页的歌单集合和songList不同
  albumLists: []
}
// 暴露一个纯函数reducer
export const reducer = (state = defaultState , action) => {
  const newState = JSON.parse(JSON.stringify(state))
  switch(action.type) {
    case GET_SONG_DETAILS:
        newState.songs = action.value
        return newState
    case GET_LRC:
        newState.lrc = action.value 
        return newState
    case COMPUTED_LRC:
        newState.comptedLrc = action.value 
        return newState
    case ADD_TO_MY_LIST:
        const isRepeat = newState.myList.some( item => {
          return item.id === action.value.id
        })
        isRepeat || newState.myList.push(action.value)
        return newState
    case ADD_SONG_LIST_TO_MY_LIST:
        newState.myList = objectArrayConcatAndRemoveDuplicate(newState.myList, action.value)
        newState.audio = newState.myList[0]
        return newState
    case ADD_SONG_PLAY_URL:
        newState.myList[action.value.index].playUrl = action.value.playUrl
        return newState
    case REMOVE_FROM_MY_LIST:
        // 删除的是否为正在播放的内容
        if(action.value === newState.audio.id) {
          // id 相同 判断有没有下一首 有继续播放下一首，没有初始化列表
          newState.myList = newState.myList.filter( item => {
            return item.id !== action.value
          })
          if(newState.myList.length === 0) {
            newState.audio = ''
            newState.isPlay = false
            newState.currentTime = 0
            newState.progress = 0
          } else {
            newState.audio = newState.myList[0]
          }
        } else {
          // 直接删除
          newState.myList = newState.myList.filter( item => {
            return item.id !== action.value
          })
        }
        return newState
        // 歌单
    case GET_SONG_LIST_DETAILS:
        newState.songList = action.value
        return newState
        // 专辑
    case GET_ALBUM_DETAILS:
         newState.albumList = action.value
         return newState
    case OPEN_MUSIC_LIST:
        newState.visible = action.value
        return newState
    case CLOSE_MUSIC_LIST:
        newState.visible = action.value
        return newState
    case SWITCH_MUSIC_PLAYER:
        newState.isPlay = action.value
        return newState
    case CHANGE_PLAYER_MUSIC:
        newState.audio = action.value
        return newState
    case CHANGE_MUSIC_ORDER:
        const index = newState.myList.findIndex( item => {
          if(item.id === newState.audio.id) {
            return true
          }
        }) 
        console.log(index)
        // 一般不可能等于-1
        if(action.value === 'next') {
          if(index + 1 >= newState.myList.length) {
            newState.audio = newState.myList[0]
          } else {
            newState.audio = newState.myList[index+1]
          }
        }
        if(action.value === 'pre') {
          if(index <= 0) {
            newState.audio = newState.myList[newState.myList.length-1]
          } else {
            newState.audio = newState.myList[index-1]
          }
        }
        return newState
    case SET_PLAYER_PROGRESS:
        if(!newState.audio.time) {
          newState.progress = 0
          return newState
        }
        newState.currentTime = (action.value * 1000)
        newState.progress = (action.value/(newState.audio.time/1000) * 100).toFixed(2)-0
        return newState
    case CHANGE_PLAYER_MODE:
        newState.playMode = action.value
        return newState
    case SEARCH_SINGLE_MUSIC:
        newState.singleList = action.value
        // const Param = {
        //   id: 'id',
        //   name: '歌曲名',
        //   singer: '歌手名',
        //   album: '专辑名',
        //   time: '时长'
        // }
        return newState    
    case SET_SEARCH_KEY:
        newState.searchKey = action.value    
        return newState
    case SEARCH_SONG_LISTS:
        newState.songLists = action.value
        return newState   
    case SEARCH_ALBUM:
        newState.albumLists = action.value
        return newState
    default:
      return state
  }
}