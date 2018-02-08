import * as types from './mutation-types'

const mutations = {
  [types.SET_CUR_TYPE](state, newstype) {
    state.curType = newstype;
  },
  [types.SET_LIST_TYPES](state, listTypes){
    state.listTypes = listTypes;
  }
}
export default mutations
