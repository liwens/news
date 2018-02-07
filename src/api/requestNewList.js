import  {vue} from '../main'
import {url_requestNewList} from './url'

export function requestNewList(params) {
  return vue.$axios.get(url_requestNewList,{params}).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    return Promise.reject(e)
  })
}
