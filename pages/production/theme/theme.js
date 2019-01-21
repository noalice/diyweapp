// pages/production/result.js

const app = getApp()
/*保证是中间图案的放大*/
function chageIndex(index) {
  if (index == 4) {
    return 0;
  } else {
    return ++index;
  }
}
Page({
  data: {

    imgUrls: [{
        img: app.globalData.rootURL + 'USTP0301.png',
        text: app.globalData.rootURL + 'USTT0301.png'
      },

      {
        img: app.globalData.rootURL + 'USTP0302.png',
        text: app.globalData.rootURL + 'USTT0302.png'
      },

      {
        img: app.globalData.rootURL + 'USTP0303.png',
        text: app.globalData.rootURL + 'USTT0303.png'
      },

      {
        img: app.globalData.rootURL + 'USTP0304.png',
        text: app.globalData.rootURL + 'USTT0304.png'
      },

      {
        img: app.globalData.rootURL + 'USTP0305.png',
        text: app.globalData.rootURL + 'USTT0305.png'
      },
    ],
    bkimg: app.globalData.rootURL + 'UGKP0001.png',
    // swiper组件设置
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 2000,
    vertical: true,
    //初始状态就让中间的图案放大
    swiperIndex: 1,
  },

  swiperChange(e) {
    const that = this;
    that.setData({
      swiperIndex: chageIndex(e.detail.current),
    })
  },

  //轮播图点击事件(问题：点击任意位置均为放大主题)
  swipclick: function(e) {
    app.globalData.theme = this.data.swiperIndex + 1;
    console.log("theme:" + app.globalData.theme);

    wx.navigateTo({
      url: '../production'
    })

  },
  ReturnTap: function() {
    wx.navigateTo({
      url: '../production'
    })
  },

  // 页面初始化
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    // 自适应屏幕高度
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        // 高度,宽度 单位为px
        that.setData({
          // swiper-block样式 bgHeight
          bgHeight: Math.ceil(((res.windowHeight * 750)) / (res.windowWidth)),
        })
      }
    })
  },
  // 监听页面初次渲染完成
  onReady: function() {
    wx.hideLoading()
  },

})