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

  if(secends < 9) {
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