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
    pro2: app.globalData.rootURL + "USTT0202.png",
    bkimg: app.globalData.rootURL + "UGKP0001.png",
  },

  //事件处理函数
  CatpetTap: function() {
    // 地毯参数
    app.globalData.production="C",
      console.log("production：" + app.globalData.production);

    wx.navigateTo({
      url: './element/element'
    })
  },

  BagTap: function () {
    // 布包参数
    app.globalData.production = "B",
      console.log("production：" + app.globalData.production);

    wx.navigateTo({
      url: './element/element'
    })
  } ,

  ReturnTap: function () {
    wx.navigateTo({
      url: './theme/theme'
    })
  }

})
