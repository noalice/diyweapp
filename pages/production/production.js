// pages/production/production.js
//获取应用实例
// 不写次代码会出现错误：thirdScriptError
// app is not defined;[Component] Event Handler Error @pages/production/production#bound CatpetTap
// ReferenceError: app is not defined
const app = getApp()

/**
   * 页面的初始数据
   */
Page({
  data: {
    motto: '产品页面',
  },

  //事件处理函数
  CatpetTap: function() {
    // 地毯参数
    app.globalData.production="C",
      console.log("production：" + app.globalData.production);

    wx.navigateTo({
      url: './theme/theme'
    })
  },

  BagTap: function () {
    // 布包参数
    app.globalData.production = "B",
      console.log("production：" + app.globalData.production);

    wx.navigateTo({
      url: './theme/theme'
    })
  } ,

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
