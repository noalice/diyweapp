//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  
  globalData: {
    userInfo: null,
    // 产品类型
    production:"",
    // 主题
    theme:0,
  },
  // 页面转发按钮
  onShareAppMessage: function () {
    return {
      // title: '自定义分享标题',
      // desc: '自定义分享描述',
      // path: '/page/user?id=123'  【小程序分享页面的路径 （目前该路径'/page/user?id=123'是指代的用户id）】
      title: '分享',
      desc: '分享该页面',
      path: '/page/user?id=123'
    }
  }
})