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
    tipimg: '',
    h: 0, //动态获取到的屏幕展示高度
    r: 0, // 相对iphone6的相对单位
    // 系统屏幕参数
    windowWidth:0,
    windowHeight:0,
    pixelRatio:0,
    centerh: "",
    textimg: [],
    txtURL: "UDKT",
    // 画布背景高px
    canvasHeight:0,
  },

  // 结果页面跳转
  returnTap: function() {
    wx.navigateTo({
      url: '../element/element'
    })
  },

  //长按图片保存图片
  longtap: function() {
    var canvasId = 'canvasC';
    if (app.globalData.production === 'B') {
      canvasId = 'canvasB';
    }
    // 将画布保存至临时文件
    wx.canvasToTempFilePath({
      canvasId: canvasId,
      fileType: 'jpg',
      quality:1,
      success: function(res) {
        console.log(canvasId + "保存图片成功：" + res.tempFilePath)
        // 保存至相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
        })
      }
    }, this)
    // TODO 结果图片名
    var url = "";
    if (app.globalData.bc_name == "") {
      url = app.globalData.bagNoColorUrl

    } else {
      url = app.globalData.rNameUrl
    }

    utilApi.downloadimgPromise(url)
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
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    //wx.getSystemInfoSync().windowHeight单位px，h单位rpx（px到rpx转换）
    this.data.windowHeight = wx.getSystemInfoSync().windowHeight;
    this.data.windowWidth = wx.getSystemInfoSync().windowWidth;
    this.data.pixelRatio = wx.getSystemInfoSync().pixelRatio;
    this.data.h = 750 * this.data.windowHeight / this.data.windowWidth;
    //相对单位，相对iPhone6的375px尺寸
    this.data.r = this.data.windowWidth / 375;
    this.setData({
      // 60-顶部返回 80-长按提示 logo-120
      centerh: this.data.h - 60 - 80 - 80,
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

      this.setData({
        tipimg: app.globalData.rootURL + "USKT0502.png"
      })

      this.data.imgformat = ".png";

      var that = this;

      // 画图【单位自px，需要换算：在样式中你的canvas宽度650rpx，那么在canvas中绘制使用的宽度就是：（屏幕宽度 / 750）* 650)】
      //width = （屏幕宽度 / 750）* 750 ;
      //height = （屏幕高度 / 1334）* 500;

      //120rpx 为文字图片的高度
      // var txty = (that.data.h - 890 - 125) / 4 + 750 / 2;
      // var proy = (that.data.h - 890 - 125) / 4 + 350 / 2;

      // utilApi.downloadimgPromise(app.globalData.rNameUrl)
      //   // 使用.then处理结果
      //   .then(res => {
      //     // 画结果图
      //     contextC.save();
      //     contextC.translate(x, y);

      //     contextC.rotate(90 * Math.PI / 180);
      //     contextC.drawImage(res.tempFilePath, -250 / 2, -375 / 2, 250, 375);
      //     contextC.restore();
      //   });

      // utilApi.downloadimgPromise(that.data.textimg[Math.floor(Math.random() * that.data.textimg.length)])
      //   // 使用.then处理结果
      //   .then(res => {
      //     // 画文字图片
      //     contextC.drawImage(res.tempFilePath, 62.5, txty, 250, 62.5)
      //     contextC.draw();
      //   });

    } else {

      this.setData({
        tipimg: app.globalData.rootURL + "USKT0501.png"
      })

      this.data.imgformat = ".jpg";

      //120rpx 为文字图片的高度
      // 可以在这里调整位置 -往上调  +往下调
      var bagy = (this.data.h - 890 - 125) / 4 -20;
      var txty = (this.data.h - 890 - 125) / 4 + 750 / 2 ;
      var proy = (this.data.h - 890 - 125) / 4 + 350 / 2 - 30;

      utilApi.downloadimgPromise(this.data.Bagimg)
        // 使用.then处理结果
        .then(res => {
          //画画布背景(灰色)
          contextB.setFillStyle('#e0e0e0');
          contextB.fillRect(0, 0, this.data.windowWidth, (this.data.h - 60 - 80 - 120) * this.data.r);

          // 画背景包（x：125rpx）
          contextB.drawImage(res.tempFilePath, 62.5 * this.data.r, bagy * this.data.r, 250 * this.data.r, 375 * this.data.r);
        });

      utilApi.downloadimgPromise(this.data.textimg[Math.floor(Math.random() * this.data.textimg.length)])
        // 使用.then处理结果
        .then(res => {
          // 画文字图片
          contextB.drawImage(res.tempFilePath, 62.5 * this.data.r, txty * this.data.r, 250 * this.data.r, 62.5 * this.data.r)
        });

      if (app.globalData.bc_name == "") {

        utilApi.downloadimgPromise(app.globalData.bagNoColorUrl)
          // 使用.then处理结果
          .then(res => {
            // 画结果图
            contextB.drawImage(res.tempFilePath, 112.5 * this.data.r, proy * this.data.r, 150 * this.data.r, 150 * this.data.r);
            contextB.draw();
          });

      } else {

        utilApi.downloadimgPromise(app.globalData.rNameUrl)
          // 使用.then处理结果
          .then(res => {
            // 画结果图
            contextB.drawImage(res.tempFilePath, 112.5 * this.data.r, proy * this.data.r, 150 * this.data.r, 150 * this.data.r);
            contextB.draw();
          });

      }
    }


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading()
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