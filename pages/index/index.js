//index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '用户授权',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数（点击跳转函数bindViewTap注册）
  bindViewTap: function() {
    wx.navigateTo({
      // url: '../logs/logs'
      // 点击跳转到动画页面
      url: '../animation/animation'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        motto:'用户已授权'
      })
      setTimeout(function () {
        wx.navigateTo({
          url: '../animation/animation'
        })
      }, 1000);
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          motto: '用户已授权'
        })
        setTimeout(function () {
          wx.navigateTo({
            url: '../animation/animation'
          })
        }, 1000);
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            motto: '用户已授权'
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../animation/animation'
            })
          }, 1000);
        }
      })
    }
  },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      motto: '用户已授权',
    })
    setTimeout(function () {
      wx.navigateTo({
        url: '../animation/animation'
      })
    }, 1000);
  }
})
