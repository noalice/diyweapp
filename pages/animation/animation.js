//animation.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bkimg: app.globalData.rootURL + 'UGKP0001.png', //背景图片
    opacity: 0 //背景透明度
  },
  //事件处理函数（点击跳转函数bindViewTap注册）
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../production/theme/theme'
  //   })
  // },

  /* 点击屏幕回调函数(水波纹) */
  containerTap: function(res) {
    var that = this
    var x = res.touches[0].pageX;
    var y = res.touches[0].pageY + 85;
    this.setData({
      rippleStyle: '',
      rippleStyle1: ''
    });
    setTimeout(function() {
      that.setData({
        rippleStyle: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.6s ease-in-out;animation:ripple 0.6s linear;'
      });
    }, 1000)

    setTimeout(function() {
      that.setData({
        rippleStyle1: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.6s ease-in-out;animation:ripple 0.6s linear 0.2s;'
      });
    }, 1000)

    setTimeout(function() {
      that.setData({
        rippleStyle2: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.6s ease-in-out;animation:ripple 0.6s linear 0.4s;'
      });
    }, 1000)

    setTimeout(function() {
      wx.navigateTo({
        url: '../production/theme/theme'
      })
    }, 2000)

  },

  onLoad: function() {

    // 背景由透明到不透明
    var that = this;
    setTimeout(function() {
      that.setData({
        opacity: 0.2
      });
    }, 1000)

    setTimeout(function() {
      that.setData({
        opacity: 0.4
      });
    }, 2000)

    setTimeout(function() {
      that.setData({
        opacity: 0.6
      });
    }, 3000)

    setTimeout(function() {
      that.setData({
        opacity: 0.8
      });
    }, 4000)

    setTimeout(function() {
      that.setData({
        opacity: 1
      });
    }, 5000)

    // （动画）背景不透明后自动跳转
    // setTimeout(function () {
    //   wx.navigateTo({
    //     url: '../production/theme/theme'
    //   })
    // }, 6000)

  }
})