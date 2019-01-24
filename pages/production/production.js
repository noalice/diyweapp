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
    returnimg: app.globalData.rootURL + "USTT0306.png",
    pro1: app.globalData.rootURL + "USTT0201.png",
    pro2: app.globalData.rootURL + "USTT0203.png",
    bkimg: app.globalData.rootURL + "UGKP0001.png",
    centertop: 0
  },

  //事件处理函数
  CatpetTap: function() {
    // 地毯参数
    app.globalData.production = "C",
      console.log("production：" + app.globalData.production);

    wx.navigateTo({
      url: './element/element'
    })
  },

  BagTap: function() {
    // 布包参数
    app.globalData.production = "B",
      console.log("production：" + app.globalData.production);

    wx.navigateTo({
      url: './element/element'
    })
  },

  ReturnTap: function() {
    wx.navigateTo({
      url: './theme/theme'
    })
  },
  // 页面初始化
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })

    //wx.getSystemInfoSync().windowHeight单位px，h单位rpx（px到rpx转换）
    var h = 750 * wx.getSystemInfoSync().windowHeight / wx.getSystemInfoSync().windowWidth;

    this.setData({
      // 137rpx按钮，43rpx图片，100rpx间距
      centertop: (h-43*2-137*2-100)/2
    });

  },
  // 监听页面初次渲染完成
  onReady: function() {
    wx.hideLoading()
  },

})