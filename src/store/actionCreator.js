import {
  GET_SONG_DETAILS, GET_LRC, COMPUTED_LRC, ADD_TO_MY_LIST, OPEN_MUSIC_LIST, CLOSE_MUSIC_LIST, SWITCH_MUSIC_PLAYER,
  CHANGE_PLAYER_MUSIC, SET_PLAYER_PROGRESS, REMOVE_FROM_MY_LIST, CHANGE_MUSIC_ORDER, CHANGE_PLAYER_MODE,
  SEARCH_SINGLE_MUSIC, GET_SONG_LIST_DETAILS, ADD_SONG_LIST_TO_MY_LIST, ADD_SONG_PLAY_URL, SET_SEARCH_KEY, SEARCH_SONG_LISTS,
  GET_ALBUM_DETAILS, SEARCH_ALBUM,
} from './actionTypes';

// 创建事件对应的action
export const getSongDetailsAction = value => ({
  type: GET_SONG_DETAILS,
  value,
});

export const computedLrcAction = value => ({
  type: COMPUTED_LRC,
  value,
});

export const getLrcAction = value => ({
  type: GET_LRC,
  value,
});

export const addToMyListAction = value => ({
  type: ADD_TO_MY_LIST,
  value,
});

export const addSongListToMyListAction = value => ({
  type: ADD_SONG_LIST_TO_MY_LIST,
  value,
});

export const addSongPlayUrlAction = value => ({
  type: ADD_SONG_PLAY_URL,
  value,
});

export const openMusicListAction = value => ({
  type: OPEN_MUSIC_LIST,
  value,
});

export const closeMusicListAction = value => ({
  type: CLOSE_MUSIC_LIST,
  value,
});

export const switchMusicPlayerAction = value => ({
  type: SWITCH_MUSIC_PLAYER,
  value,
});

export const changePlayerMusicAction = value => ({
  type: CHANGE_PLAYER_MUSIC,
  value,
});

export const setPlayerProgressAction = value => ({
  type: SET_PLAYER_PROGRESS,
  value,
});

export const removeFromMyListAction = value => ({
  type: REMOVE_FROM_MY_LIST,
  value,
});

export const changeMusicOrderAction = value => ({
  type: CHANGE_MUSIC_ORDER,
  value,
});

export const changePlayerModeAction = value => ({
  type: CHANGE_PLAYER_MODE,
  value,
});

export const getSongListDetailsAction = value => ({
  type: GET_SONG_LIST_DETAILS,
  value,
});

export const getAlbumDetailsAction = value => ({
  type: GET_ALBUM_DETAILS,
  value,
});


// search
export const searchSingleMusicAction = value => ({
  type: SEARCH_SINGLE_MUSIC,
  value,
});

export const setSearchKeyAction = value => ({
  type: SET_SEARCH_KEY,
  value,
});

export const searchSongListsAction = value => ({
  type: SEARCH_SONG_LISTS,
  value,
});

export const searchAlbumAction = value => ({
  type: SEARCH_ALBUM,
  value,
});
