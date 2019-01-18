
// pages/production/element/element.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    c_index: 0,//当前
    tab_number: 0,//tab的数量（是地毯或布包）
    s_width: 0,
    carpet: [
      { "name": "边框", "color": "orange", "url":[] },
      { "name": "四角", "color": "blue", "url": [] }, 
      { "name": "中心", "color": "green", "url": [] }
    ],
    bag: [
      { "name": "图案", "color": "pink", "url": [] },
      { "name": "颜色", "color": "black", "url": [] },
    ],

  },

  //滑
  get_index: function (e) {
    var crash_current = e.detail.current;
    this.setData({
      c_index: e.detail.current,
    });
  },
  //点
  changeview: function (e) {
    this.setData({
      c_index: e.currentTarget.dataset.current,
    });
  },


  //事件处理函数
  ReturnTap: function () {
    wx.navigateTo({
      url: '../theme/theme'
    })
  },
  ResultTap: function () {
    wx.navigateTo({
      url: '../result/result'
    })
  },
  // 禁止外部swiper手指触摸滑动
  stopTouchMove: function () {
    return false;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      production: app.globalData.production
    })

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