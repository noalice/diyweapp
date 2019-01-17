// pages/production/element/element.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    c_index: 0,//当前
    s3_width: 0,
    t_width: 250,//选择按钮tab的宽度
    scroll_left: 0,//上方滚动的位置
    tab_tite_data: [
      { "name": "1", "color": "orange", } ,
      { "name": "2", "color": "blue", }, 
      { "name": "3", "color": "green", }
    ],

  },

  onShow: function () {
    this.getwidth();
  },
  //滑
  get_index: function (e) {
    var crash_current = e.detail.current;
    var s = 0;
    if (crash_current != 0 && crash_current != 1) {
      s = parseInt(crash_current - 1) * this.data.s3_width;
    }
    this.setData({
      c_index: e.detail.current,
      scroll_left: s
    });
  },
  //点
  changeview: function (e) {
    var crash_current = e.currentTarget.dataset.current;
    var s = 0;
    if (crash_current != 0 && crash_current != 1) {
      s = parseInt(crash_current - 1) * this.data.s3_width;
    }
    this.setData({
      c_index: e.currentTarget.dataset.current,
      scroll_left: s
    });
  },
  getwidth: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData(that.data.s3_width = res.windowWidth / 3);
      },
    })
  },

  //事件处理函数
  ResultTap: function () {
    wx.navigateTo({
      url: '../result/result'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})