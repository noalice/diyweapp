
// pages/production/result.js
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
      '/images/production/theme/fhsj.jpg',
      '/images/production/theme/lfcx1.jpg',
      '/images/production/theme/yfyy.jpg',
      '/images/production/theme/lfcx2.jpg',
      '/images/production/theme/lfcx3.jpg',
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

})