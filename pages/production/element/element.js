// pages/production/element/element.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    indexb: 0,
    //地毯
    carpet: [{
        "name": "边框",
        "color": "orange"
      },
      {
        "name": "四角",
        "color": "blue"
      },
      {
        "name": "中心",
        "color": "green"
      }
    ],
    //布包
    bag: [{
        "name": "图案",
        "color": "pink"
      },
      {
        "name": "颜色",
        "color": "black"
      }
    ],

    // image URL
    pURL: "",
    tURL: "",
    eURL: "",
    imgformat:"",
    imgURL: []
  },

  //根据tab，得到滑片索引（通过 data-current="{{index}}" 得到）
  changeview: function(e) {
    this.setData({
      indexb: e.currentTarget.dataset.current,
    });

    console.log("滑片:" + this.data.indexb);

    if (this.data.indexb == 0 && app.globalData.production == "C") {
      this.data.eURL = "E";
    }
    if (this.data.indexb == 0 && app.globalData.production == "B") {
      this.data.eURL = "P";
    }

    if (this.data.indexb == 1) {
      this.data.eURL = "C";
    }
    if (this.data.indexb == 2) {
      this.data.eURL = "M";
    }

    this.setData({
      imgURL: [
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I010" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I020" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I030" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I040" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I050" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I060" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I070" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I080" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I090" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I100" + this.data.imgformat,
      ]
    })

    console.log("事件点击加载获取图片路径："+this.data.imgURL);


  },
  // 禁止外部swiper手指触摸滑动
  stopTouchMove: function() {
    return false;
  },


  //事件处理函数
  ReturnTap: function() {
    wx.navigateTo({
      url: '../theme/theme'
    })
  },
  ResultTap: function() {
    wx.navigateTo({
      url: '../result/result'
    })
  },
  RequestTap: function () {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    this.setData({
      production: app.globalData.production
    });

    if (app.globalData.production == "C") {
      this.data.pURL = "C";
      this.data.eURL = "E";
      this.data.imgformat= ".png";
    } else {
      this.data.pURL = "B";
      this.data.eURL = "P";
      this.data.imgformat = ".jpg";
    }

    switch (app.globalData.theme) {
      case 1:
        this.data.tURL = "01"
        break;
      case 2:
        this.data.tURL = "02"
        break;
      case 3:
        this.data.tURL = "03"
        break;
      case 4:
        this.data.tURL = "04"
        break;
      case 5:
        this.data.tURL = "05"
        break;
      default:
        break;
    }

    this.setData({
      imgURL: [
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I010" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I020" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I030" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I040" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I050" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I060" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I070" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I080" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I090" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I100" + this.data.imgformat,
      ]
    })

    console.log("页面加载获取图片路径：" +this.data.imgURL);

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }

})