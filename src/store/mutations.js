import *as types from './mutation-types'

const mutations = {
  [types.SET_CUR_TYPE](state, newstype) {
    state.curType = newstype;
  }
}
