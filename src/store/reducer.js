// 引入actiontypes
import { GET_SONG_DETAILS, GET_LRC, COMPUTED_LRC, ADD_TO_MY_LIST, OPEN_MUSIC_LIST, CLOSE_MUSIC_LIST } from './actionTypes'

// 给数据赋初值用于第一次渲染
const defaultState = {
  // musicplayer中的state
  visible: false,
  myList: [],
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
        console.log(isRepeat)
        isRepeat || newState.myList.push(action.value)
        return newState
    case OPEN_MUSIC_LIST:
        newState.visible = action.value
        return newState
    case CLOSE_MUSIC_LIST:
        newState.visible = action.value
        return newState
    default:
      return state
  }
}