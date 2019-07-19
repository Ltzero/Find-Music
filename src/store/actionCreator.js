import { GET_SONG_DETAILS, GET_LRC, COMPUTED_LRC, ADD_TO_MY_LIST, OPEN_MUSIC_LIST, CLOSE_MUSIC_LIST, SWITCH_MUSIC_PLAYER, CHANGE_PLAYER_MUSIC, SET_PLAYER_PROGRESS, REMOVE_FROM_MY_LIST, CHANGE_MUSIC_ORDER } from './actionTypes'

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

export const switchMusicPlayerAction = value => ({
  type: SWITCH_MUSIC_PLAYER,
  value
})

export const changePlayerMusicAction = value => ({
  type: CHANGE_PLAYER_MUSIC,
  value
})

export const setPlayerProgressAction = value => ({
  type: SET_PLAYER_PROGRESS,
  value
})

export const removeFromMyListAction = value => ({
  type: REMOVE_FROM_MY_LIST,
  value
})

export const changeMusicOrder = value => ({
  type: CHANGE_MUSIC_ORDER,
  value
})