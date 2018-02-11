import * as types from './mutation-types'

const mutations = {
  [types.SET_CUR_TYPE](state, newstype) {
    state.curType = newstype;
  },
  [types.SET_LIST_TYPES](state, listTypes){
    state.listTypes = listTypes;
  },
  [types.SET_CUR_LIST_DATA](state, curlistdata) {
    if (state.curListData.length == 0) {
      state.curListData = curlistdata
    } else {
      state.curListData.data = state.curListData.data.concat(curlistdata);
      state.curListData.page = state.curListData.page + 1;
    }
  },
  [types.REMOVE_CUR_LIST_DATA](state) {
    state.curListData = {
      data: [],
      page:1
    };
  }

}
export default mutations
