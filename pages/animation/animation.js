//animation.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bkimg: app.globalData.rootURL + 'UGKP0001.png', //背景图片
    end:'',
    outer:'',
    inner:'',
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
    }, 200)

    setTimeout(function() {
      that.setData({
        rippleStyle1: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.6s ease-in-out;animation:ripple 0.6s linear 0.2s;'
      });
    }, 200)

    // setTimeout(function() {
    //   that.setData({
    //     rippleStyle2: 'top:' + y + 'px;left:' + x + 'px;-webkit-animation: ripple 0.6s ease-in-out;animation:ripple 0.6s linear 0.4s;'
    //   });
    // }, 1000)

    // 若干秒自动跳转至主题选择界面（动画完）
    setTimeout(function() {
      wx.navigateTo({
        url: '../production/theme/theme'
      })
    }, 1000)
  },
  animationend:function(event){
    wx.navigateTo({
      url: '../production/theme/theme',
    })
  },
  onLoad: function() {
    this.setData({
      outer:'outer',
      inner:'inner',
    })
  }
})