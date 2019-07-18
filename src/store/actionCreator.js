import { GET_SONG_DETAILS, GET_LRC, COMPUTED_LRC, ADD_TO_MY_LIST, OPEN_MUSIC_LIST, CLOSE_MUSIC_LIST } from './actionTypes'

// 创建事件对应的action
export const getSongDetailsAction = value => ({
  type: GET_SONG_DETAILS,
  value
})

export const computedLrcAction = value => ({
  type: COMPUTED_LRC,
  value
})

export const getLrcAction = value => ({
  type: GET_LRC,
  value
})

export const addToMyListAction = value => ({
  type: ADD_TO_MY_LIST,
  value
}) 

export const openMusicListAction = value => ({
  type: OPEN_MUSIC_LIST,
  value
}) 

export const closeMusicListAction = value => ({
  type: CLOSE_MUSIC_LIST,
  value
})