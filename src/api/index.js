import request from '@/utils/request';

/**
* 轮播图
*/
export function getCarouselsAPI() {
  return request({
    url: '/banner',
    method: 'get',
  })
}

/**
* 热门歌单
* @param cat (分类)
* @param pageSize
* @param page
*/
export function getHotSongListsAPI(params) {
  return request({
    url: '/songList/hot',
    method: 'get',
    params,
  })
}

/**
* 最新单曲
* @param cat (分类)
* @param pageSize
* @param page
*/
export function getNewlySingleAPI(params) {
  return request({
    url: '/song/newest',
    method: 'get',
    params,
  })
}

/**
* 精品歌单
* @param cat (分类)
* @param pageSize
*/
export function getHighQualitySongListsAPI(params) {
  return request({
    url: '/songList/highQuality',
    method: 'get',
    params,
  })
}

/**
* 音乐搜索
* @param keyword 关键字
* @param type     类型 默认为song
* @param pageSize
* @param page 关键字 默认0
*/
export function findMusicAPI(params) {
  return request({
    url: '/search',
    method: 'get',
    params,
  })
}

/**
* 单曲详情
* @param id
*/
export function getSingleDetailsAPI(id) {
  return request({
    url: '/song',
    method: 'get',
    params: {
      id,
    },
  })
}

/**
* 单曲详情
* @param id
*/
export function getMusicLrcAPI(id) {
  return request({
    url: '/lrc',
    method: 'get',
    params: {
      id,
    },
  })
}

/**
* 获取播放地址
* @param id
* @param quality 音乐品质 默认最高
*/
export function getPlayUrlAPI(id) {
  return request({
    url: '/url',
    method: 'get',
    params: {
      id,
      quality: 'flac',
    },
  })
}

/**
* 获取歌单详情
* @param id
*/
export function getSongListDetailsAPI(id) {
  return request({
    url: '/songList',
    method: 'get',
    params: {
      id,
    },
  })
}

/**
* 获取专辑详情
* @param id
*/
export function getAlbumDetailsAPI(id) {
  return request({
    url: '/album',
    method: 'get',
    params: {
      id,
    },
  })
}
