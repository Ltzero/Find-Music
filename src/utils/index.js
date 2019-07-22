export const separateSingers = arry => {
  let singers = ''
  arry.map((artist, index) => {
    index===(arry).length-1 ? singers += artist.name : singers += artist.name + '/'
  })
  return singers
}

export const formateDuration = duration => {
  const hours = Math.floor(duration/1000/60/60)
  const minutes = Math.floor(duration/1000/60)
  let secends = Math.round(duration/1000%60)

  if(secends <= 9) {
    secends = '0' + secends
  } 
  return `${ hours === 0 ? '' : hours + ':' }${minutes}:${secends}`
}

export const getMusicInfo = (id, arry) => {
  const fid = id + 0
  console.log(fid)
  arry.find( item => {
    if(item.id === fid) {
      return item
    }
  })
}

export const findIndexByKey = (arry, attr, key) => {
  return arry.findIndex( (item ) => {
    if(item[`${attr}`] === key ) {
      return true
    }
  })
}

export const objectArrayConcatAndRemoveDuplicate = (array1, array2) => {
  let conCatArray = array1.concat(array2) //两个数组对象合并
  let newArray = [] //盛放去重后数据的新数组
  for(const item1 of conCatArray){  //循环json数组对象的内容
    let flag = true  //建立标记，判断数据是否重复，true为不重复
    for(const item2 of newArray){  //循环新数组的内容
      if(item1.id === item2.id){ //让json数组对象的内容与新数组的内容作比较，相同的话，改变标记为false
        flag = false
      }
    }
    if(flag){ //判断是否重复
      newArray.push(item1) //不重复的放入新数组。  新数组的内容会继续进行上边的循环。
    }
  }
  return newArray
}

// 处理各种播放模式下切换播放歌曲或者歌曲播放完后的函数方法

export const handlePlayerChangeOrMusicEnded = (type) => {
  let PA1, PA2, PA3 = null
  if(type ==='next' || type === 'ended') {
    PA1 = this.state.myList.length - 1
    PA2 = index-1
    PA3 = this.state.myList.length - 1
  }
  if(type === 'pre') {
    PA1 = 0
    PA2 = index - 1
    PA3 = this.state.myList.length - 1
  }

  if(this.state.myList.length===0) return false
  // 获取当前这首歌在列表的索引
  const index = findIndexByKey(this.state.myList, 'id', this.state.audio.id )
  // 是否有播放地址
  // 顺序播放 单曲循环 列表循环 列表随机
  switch(this.state.playMode) {
    case 'single_cycle': 
      this.refs.audio.load()
      this.refs.audio.play()
      break
    case 'random_cycle':
      const random = ~~(Math.random()*this.state.myList.length)
      // 检测播放地址是否为空
      if(this.state.myList[random].playUrl === '') {
        const id = this.state.myList[random].id
        this.getMusicUrl(id).then( data => {
          const value = {
            index: random,
            playUrl: data
          }
          const action = addSongPlayUrlAction(value)
          store.dispatch(action)
          const changeAction = changePlayerMusicAction(this.state.myList[random])
          store.dispatch(changeAction)
        })
      }
      break
    case 'list_order':
      if(index === -1) console.log(err)
      if(index === PA1) {
        const action = switchMusicPlayerAction(false)
        store.dispatch(action) 
        // 前面已经没有了
      } else {
        console.log(PA2)
        if(this.state.myList[PA2].playUrl === '') {
          const id = this.state.myList[PA2].id
          this.getMusicUrl(id).then( data => {
            const value = {
              index: PA2,
              playUrl: data
            }
            const action = addSongPlayUrlAction(value)
            store.dispatch(action)
            const changeAction = changePlayerMusicAction(this.state.myList[PA2])
            store.dispatch(changeAction)
          })
        } else {
          const action = changePlayerMusicAction(this.state.myList[PA2])
          store.dispatch(action)
        }
      }
      break
    case 'list_cycle':
      if(index === -1) console.log(err)
      if(index === PA1) {
        if(this.state.myList[PA3].playUrl === '') {
          const id = this.state.myList[PA3].id
          this.getMusicUrl(id).then( data => {
            const value = {
              index: PA3,
              playUrl: data
            }
            const action = addSongPlayUrlAction(value)
            store.dispatch(action)
            const changeAction = changePlayerMusicAction(this.state.myList[PA3])
            store.dispatch(changeAction)
          })
        } else {
          // 不为空直接拨
          const action = changePlayerMusicAction(this.state.myList[PA3])
          store.dispatch(action)
        }
      } else {
        const id = this.state.myList[PA2].id
        this.getMusicUrl(id).then( data => {
          const value = {
            index: PA2,
            playUrl: data
          }
          const action = addSongPlayUrlAction(value)
          store.dispatch(action)
          const changeAction = changePlayerMusicAction(this.state.myList[PA2])
          store.dispatch(changeAction)
        })
      }
      break
    }
  }
