// pages/production/carpet.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rimg: '',
    Bagimg: app.globalData.rootURL + "UGKP0002.png",
    imgformat: "",
    returnimg: app.globalData.rootURL + "USTT0501.png",
    tipimg: app.globalData.rootURL + "UGKT0501.png",
    centerh:"",
  },

// 结果页面跳转到哪里？？？
  returnTap: function () {
    wx.navigateTo({
      url: '../element/element'
    })
  },
  /**
   * 获取生成的地毯图片名
   * cName 四角
   * eName 边框
   * mName 中心
   */
  createCp: function(cName, eName, mName, openId) {
    var that = this;
    wx.request({
      url: 'https://www.vrwbg.com:8080/mini/create-cp',
      method: 'GET', //默认
      // data 参数说明:最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String
      data: {
        ename: eName,
        cname: cName,
        mname: mName,
        openId: openId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      // 获取图片名成功回调
      success: function(res) {
        that.setData({
          rimg: app.globalData.rURL + res.data.rName + that.data.imgformat
        });
      }
    })
  },

  /**
   * 获取生成的布包图片名
   * pName 图案
   * cName 颜色
   */
  createBp: function(pName, cName, openId) {
    var that =this;
    wx.request({
      url: 'https://www.vrwbg.com:8080/mini/create-bp',
      method: 'GET', //默认
      data: {
        openId: openId,
        pName: pName,
        cName: cName,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        that.setData({
          rimg: app.globalData.rURL + res.data.rName + that.data.imgformat
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.showLoading({
      title: '加载中',
    })

    //wx.getSystemInfoSync().windowHeight单位px，h单位rpx（px到rpx转换）
    var h = 750 * wx.getSystemInfoSync().windowHeight / wx.getSystemInfoSync().windowWidth;
    this.setData({
      centerh: h-120,
    })

    this.setData({
      production: app.globalData.production
    })
    if (app.globalData.production == "C") {
      this.data.imgformat = ".png";

      console.log("cc_name, ce_name, cm_name:" + app.globalData.cc_name, app.globalData.ce_name, app.globalData.cm_name)
      // 获取结果图名(c,e,m,id)
      this.createCp(app.globalData.cc_name, app.globalData.ce_name, app.globalData.cm_name, app.globalData.openId)

    } else {
      this.data.imgformat = ".jpg";

      console.log("bp_name, bc_name:" + app.globalData.bp_name, app.globalData.bc_name)
      // 获取结果图名(p,c,id)
      this.createBp(app.globalData.bp_name, app.globalData.bc_name, app.globalData.openId)
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})