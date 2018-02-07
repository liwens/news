import  {vue} from '../main'
import {url_requestTypeList} from './url'

export function requestTypeList() {
  return vue.$axios.get(url_requestTypeList).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    return Promise.reject(e)
  })
}
