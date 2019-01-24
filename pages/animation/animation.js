//animation.js
//获取应用实例
const app = getApp()

Page({
  data: {
    bkimg: app.globalData.rootURL + 'UGKP0001.png', //背景图片
    end: '',
    outer: '',
    inner: '',
    flag: 1 //判断页面是否已经跳转
  },

  /* 点击屏幕回调函数(水波纹) */
  containerTap: function(res) {
    //点击跳转判断(点击多次跳转一次)
    this.data.flag++;

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

    // 点击水波，跳转事件
    if (this.data.flag == 2) {
      setTimeout(function() {
        wx.navigateTo({
          url: '../production/theme/theme'
        })
      }, 1000)
    }

  },

  //图片显示动画结束事件
  animationend: function(event) {

    if (this.data.flag == 1) {
      setTimeout(function() {
        wx.navigateTo({
          url: '../production/theme/theme',
        })
      }, 1000)
    }

  },
  onLoad: function() {
    this.setData({
      outer: 'outer',
      inner: 'inner',
    })
  }
})