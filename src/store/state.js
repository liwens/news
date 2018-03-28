const state = {
  /**
   * 当前显示的频道
   * */
  curType: '',

  /**
   * 所有频道列表
   * */
  listTypes: '',

  /**
   * 当前频道记录的数据。
   * */
  curListData: [],

  listPage: 1,

  /**
   * 详情页新闻数据
   * @type {Object}
   */
  contentData: {},

  /**
   * 控制列表页进入详情页的过渡动画的标志位
   * */
  loadingVis: false
}

export default state;