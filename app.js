//app.js
App({
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var openId = 
    console.log("onLaunch")
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('临时的code' + res.code);
        // 获取到临时凭证code
        if (res.code) {
          console.log('向服务器发送请求')
          // 目前的url仅做测试
          
          wx.request({
            // 自己服务器的接口
            url: 'https://www.vrwbg.com:8080/mini/getOpenId',
            method: 'GET',
            // 传code至后台
            // 请求参数
            data: {
              code: res.code
            },
            // 登录成功 返回json对象

            success: function(res) {
              console.log('返回的openId:' + res.data.openId);
              getApp().globalData.openId = res.data.openId;
            }

          })
          
        } else {
          // res.errMsg错误信息 没有获取到微信的code
          console.log('获取用户登录态失败！')
        }
      }
    })

    // 获取用户信息 获取用户的当前设置。返回值中只会出现小程序已经向用户请求过的权限。
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
    production: "",
    // 主题
    theme: 0,
    //服务器图片root路径
    rootURL: "https://www.vrwbg.com:8080/mini/image_resources/",
    // openId
    openId: "",
    //结果root路径
    rURL:"https://www.vrwbg.com:8080/mini/image_results/",
    //结果参数
    cc_name:"",//地毯参数
    ce_name: "",
    cm_name: "",
    bp_name: "",//布包参数
    bc_name: "",
  },
  // 页面转发按钮
  onShareAppMessage: function() {
    return {
      // title: '自定义分享标题',
      // desc: '自定义分享描述',
      // path: '/page/user?id=123'  【小程序分享页面的路径 （目前该路径'/page/user?id=123'是指代的用户id）】
      title: '分享',
      desc: '分享该页面',
      path: '/page/user?id=123'
    }
  },
  
})