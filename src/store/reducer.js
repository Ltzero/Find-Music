// 引入actiontypes
import { GET_SONG_DETAILS, GET_LRC, COMPUTED_LRC, ADD_TO_MY_LIST, OPEN_MUSIC_LIST, CLOSE_MUSIC_LIST, SWITCH_MUSIC_PLAYER, CHANGE_PLAYER_MUSIC, SET_PLAYER_PROGRESS, REMOVE_FROM_MY_LIST, CHANGE_MUSIC_ORDER } from './actionTypes'

// 给数据赋初值用于第一次渲染
const defaultState = {
  // musicplayer中的state
  visible: false,
  myList: [],
  isPlay: false,
  currentTime: 0,
  progress: 0,
  audio: '',
  // 详情页的state
  flag: false,

  songs: [],
  // musicUrl: '',
  lrc: '',
  comptedLrc: []
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
    case SET_PLAYER_PROGRESS:
        if(!newState.audio.time) {
          newState.progress = 0
          return newState
        }
        newState.currentTime = (action.value * 1000)
        newState.progress = (action.value/(newState.audio.time/1000) * 100).toFixed(2)-0
        return newState
    default:
      return state
  }
}