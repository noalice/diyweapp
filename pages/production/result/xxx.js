// pages/production/carpet.js

var app = getApp()
const utilApi = require('../../../utils/util.js')

const contextC = wx.createCanvasContext('canvasC')
const contextB = wx.createCanvasContext('canvasB')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rimg: '',
    Bagimg: app.globalData.rootURL + "UGKP0002.png",
    imgformat: "",
    returnimg: app.globalData.rootURL + "USTT0501.png",
    tipimg: app.globalData.rootURL + "USKT0501.png",
    h: 0, // 动态获取到的屏幕展示高度
    r: 0,  // 相对iphone6的相对单位
    centerh: "",
    textimg: [],
    txtURL: "UDKT"
  },

  // 结果页面跳转到哪里？？？
  returnTap: function () {
    wx.navigateTo({
      url: '../element/element'
    })
  },
  longtap: function () {
    var canvasId = 'canvasC';
    if (app.globalData.production === 'B') {
      canvasId = 'canvasB';
    }
    // 将画布保存至临时文件
    wx.canvasToTempFilePath({
      canvasId: canvasId,
      fileType: 'jpg',
      success: function (res) {
        console.log(canvasId + "保存图片成功：" + res.tempFilePath)
        // 保存至相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
      }
    }, this)
    // TODO 结果图片名
    utilApi.downloadimgPromise(app.globalData.rNameUrl)
      // 使用.then处理结果
      .then(res => {
        // 保存结果图至相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
      });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.showLoading({
      title: '加载中',
    })

    //wx.getSystemInfoSync().windowHeight单位px，h单位rpx（px到rpx转换）
    this.data.h = 750 * wx.getSystemInfoSync().windowHeight / wx.getSystemInfoSync().windowWidth;
    //相对单位，相对iPhone6的375px尺寸
    this.data.r = wx.getSystemInfoSync().windowWidth / 375;
    this.setData({
      // 60-顶部返回 80-长按提示 logo-120
      centerh: this.data.h - 60 - 80 - 120,
    })

    this.setData({
      production: app.globalData.production
    })

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
    this.data.textimg = [
      app.globalData.rootURL + this.data.txtURL + this.data.tURL + "01.png",
      app.globalData.rootURL + this.data.txtURL + this.data.tURL + "02.png",
      app.globalData.rootURL + this.data.txtURL + this.data.tURL + "03.png",
      // app.globalData.rootURL + this.data.txtURL + this.data.tURL  + "04.png",
      // app.globalData.rootURL + this.data.txtURL + this.data.tURL  + "05.png",
    ];
    console.log("选择的文字图片路径：" + this.data.textimg[Math.floor(Math.random() * this.data.textimg.length)]);

    if (app.globalData.production == "C") {
      this.data.imgformat = ".png";

      console.log("cc_name, ce_name, cm_name:" + app.globalData.cc_name, app.globalData.ce_name, app.globalData.cm_name)
      // 获取结果图名(c,e,m,id)
      // this.createCp(app.globalData.cc_name, app.globalData.ce_name, app.globalData.cm_name, app.globalData.openId)

    } else {
      this.data.imgformat = ".jpg";

      console.log("bp_name, bc_name:" + app.globalData.bp_name, app.globalData.bc_name)
      // 获取结果图名(p,c,id)

      var that = this;
      utilApi.requestPromiseBp(app.globalData.bp_name, app.globalData.bc_name, app.globalData.openId)
        // 使用.then处理结果
        .then(res => {
          console.log("结果图rName：" + res.data.rName)

          // 画图【单位自px，需要换算：在样式中你的canvas宽度650rpx，那么在canvas中绘制使用的宽度就是：（屏幕宽度 / 750）* 650)】
          //width = （屏幕宽度 / 750）* 750 ;
          //height = （屏幕高度 / 1334）* 500;

          //120rpx 为文字图片的高度
          var bagy = (that.data.h - 890 - 125) / 4;
          var txty = (that.data.h - 890 - 125) / 4 + 750 / 2;
          var proy = (that.data.h - 890 - 125) / 4 + 350 / 2;

          utilApi.downloadimgPromise(that.data.Bagimg)
            // 使用.then处理结果
            .then(res => {
              // 画背景包（x：125rpx）
              contextB.setFillStyle('#e0e0e0');
              contextB.fillRect(0, 0, wx.getSystemInfoSync().windowWidth, (this.data.h - 60 - 80 - 120) * this.data.r);
              contextB.drawImage(res.tempFilePath, 62.5 * this.data.r, bagy * this.data.r, 250 * this.data.r, 375 * this.data.r);
            });

          utilApi.downloadimgPromise(that.data.textimg[Math.floor(Math.random() * that.data.textimg.length)])
            // 使用.then处理结果
            .then(res => {
              // 画文字图片
              contextB.drawImage(res.tempFilePath, 62.5 * this.data.r, txty * this.data.r, 250 * this.data.r, 62.5 * this.data.r)
            });

          utilApi.downloadimgPromise(app.globalData.rURL + res.data.rName + that.data.imgformat)
            // 使用.then处理结果
            .then(res => {
              // 画结果图
              contextB.drawImage(res.tempFilePath, 112.5 * this.data.r, proy * this.data.r, 150 * this.data.r, 150 * this.data.r);
              contextB.draw();
            });

        });
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})