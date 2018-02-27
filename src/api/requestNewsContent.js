import  {vue} from '../main'
import {url_requestNewContent} from './url'

export function requestNewContent(params) {
  return vue.$axios.get(url_requestNewContent,{
    params
  }).then((res) => {
    return Promise.resolve(res.data)
  }).catch((e) => {
    return Promise.reject(e)
  })
}
