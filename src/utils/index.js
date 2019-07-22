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