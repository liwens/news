import * as types from './mutation-types'

const mutations = {
  [types.SET_CUR_TYPE](state, newstype) {
    state.curType = newstype;
  },
  [types.SET_LIST_TYPES](state, listTypes) {
    state.listTypes = listTypes;
  },
  [types.SET_CUR_LIST_DATA](state, curlistdata) {
    if (state.curListData.length == 0) {
      state.curListData = curlistdata
    } else {
      state.curListData = state.curListData.concat(curlistdata);
    }
  },

  /**
   * 设置列表page
   * @type {[type]}
   */
  [types.SET_LIST_PAGE](state) {
    state.listPage++;
  },
  [types.REMOVE_CUR_LIST_DATA](state) {
    state.curListData = []
    state.listPage = 1
  },
  [types.SET_LOADING_VIS](state, isVis) {
    state.loadingVis = isVis
  },
  /**
   * 设置新闻新闻详情页数据
   * @type {[type]}
   */
  [types.SET_CONTENT_DATA](state, contentData) {
    state.contentData = contentData;
  }

}
export default mutations