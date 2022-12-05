import { createHash } from 'crypto'

export const filterKey = (data = [], filter = '') => {
  const keys = Object.keys(data)
  const filterKeys = keys.filter(key => key.match(new RegExp(filter, 'gi')))
  return filterKeys.reduce((obj: any, key: any) => {
    if (!key) return obj
    obj[key] = data[key]
    return obj
  }, {})
}

export const modifyKeysANS = (obj: any): Object => {
  return Object.keys(obj).reduce((acc, item) => {
    if(typeof obj[item] === 'object'){
      if(obj[item]?.length){
        return {
          ...acc,
          [`ans:${item}`]: obj[item].map(function(subItem: any) { return modifyKeysANS(subItem) })
        }
      }
      return {
        ...acc,
        [`ans:${item}`]: modifyKeysANS(obj[item])
      }
    }
    return {
      ...acc,
      [`ans:${item}`]: obj[item]
    }
  }, {});
}


export const getHash = (obj: any): string => {
  const data = Object.keys(obj).reduce((acc, key) => {
    if(typeof obj[key] === 'object'){
      return getHash(obj[key])
    }
    acc += obj[key]
    return acc.trim()
  }, '')
  return createHash('md5').update(data).digest("hex").replace('\n', '')
}