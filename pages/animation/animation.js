//animation.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bkimg: "", //背景图片
    motto: '动画页面',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数（点击跳转函数bindViewTap注册）
  bindViewTap: function() {
    wx.navigateTo({
      // url: '../logs/logs'
      // 点击跳转到产品页面
      url: '../production/theme/theme'
    })
  },

  /* 点击屏幕回调函数 */
  containerTap: function(res) {
    var that = this
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY+85;
    this.setData({
      rippleStyle: '',
      rippleStyle1:''
    });
    setTimeout(function() {
      that.setData({
        rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.6s ease-in-out;animation:ripple 0.6s linear;'
      });
    }, 200)

    setTimeout(function () {
      that.setData({
        rippleStyle1: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.6s ease-in-out;animation:ripple 0.6s linear 0.2s;'
      });
    },200)

    setTimeout(function () {
      that.setData({
        rippleStyle2: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.6s ease-in-out;animation:ripple 0.6s linear 0.4s;'
      });
    }, 200)

setTimeout(function(){

  wx.navigateTo({
    // url: '../logs/logs'
    // 点击跳转到产品页面
    url: '../production/theme/theme'
  })
},1000)
  
  },

  onLoad: function() {
    this.setData({
      bkimg: app.globalData.rootURL + "5ae220b2bf444ed499dcdb74ad5dcf0a.png"
    })


    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})