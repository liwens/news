import  {vue} from '../main'
import {url_requestRandomList} from './url'

export function requestRandomList() {
  return vue.$axios.get(url_requestRandomList).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    return Promise.reject(e)
  })
}
