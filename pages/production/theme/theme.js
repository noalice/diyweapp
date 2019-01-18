
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
    themeName:[
      '繁花似锦',
      '福寿天成',
      '龙凤呈祥',
      '鸟语花香',
      '鸢飞鱼跃',
    ],
    imgUrls: [
      '/resources/images/theme/0.jpg',
      '/resources/images/theme/1.jpg',
      '/resources/images/theme/2.jpg',
      '/resources/images/theme/3.jpg',
      '/resources/images/theme/4.jpg',
    ],
    // swiper组件设置
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 2000,
    vertical:true,
    //初始状态就让中间的图案放大
    swiperIndex:1
  },

  swiperChange(e) {
    const that = this;
    that.setData({
      swiperIndex:chageIndex(e.detail.current),
    })
  },

  //轮播图点击事件(点击任意位置均为放大主题)
  swipclick: function (e) {
    app.globalData.theme = this.data.swiperIndex +1;
    console.log("theme:" + app.globalData.theme);

    wx.navigateTo({
      url: '../element/element'
    })
  },
})