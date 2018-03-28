/**
 *  当前频道
 * */
export const curType = state => state.curType;

/**
 * 所有频道
 * */
export const listTypes = state => state.listTypes;

/**
 * 当前频道的数据
 * */
export const curListData = state => state.curListData;

/**
 * [loadingVis description]
 * @type {[type]}
 */
export const listPage = state => state.listPage;

/**
 * 控制列表页进入详情页的过渡动画的标志位
 * */
export const loadingVis = state => state.loadingVis;

/**
 * 新闻详情页的新闻数据
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
export const contentData = state => state.contentData;