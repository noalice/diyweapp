// pages/production/carpet.js

var app = getApp()

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
    tipimg: app.globalData.rootURL + "UGKT0501.png",
    h: 0, //动态获取到的屏幕展示高度
    centerh: "",
    textimg:[],
    txtURL:"UDKT"
  },

  // 结果页面跳转到哪里？？？
  returnTap: function() {
    wx.navigateTo({
      url: '../element/element'
    })
  },
  /**
   * 获取生成的地毯图片名
   * cName 四角
   * eName 边框
   * mName 中心
   */
  createCp: function(cName, eName, mName, openId) {
    var that = this;
    wx.request({
      url: 'https://www.vrwbg.com:8080/mini/create-cp',
      method: 'GET', //默认
      // data 参数说明:最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String
      data: {
        ename: eName,
        cname: cName,
        mname: mName,
        openId: openId
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      // 获取图片名成功回调
      success: function(res) {
        // that.setData({
        //   rimg: app.globalData.rURL + res.data.rName + that.data.imgformat
        // });

        that.data.rimg = app.globalData.rURL + res.data.rName + that.data.imgformat;

        // 画图【单位自px，需要换算：在样式中你的canvas宽度650rpx，那么在canvas中绘制使用的宽度就是：（屏幕宽度 / 750）* 650)】
        //width = （屏幕宽度 / 750）* 750 ;
        //height = （屏幕高度 / 1334）* 500;

        //120rpx 为文字图片的高度
        // var bagy = (that.data.h - 890-125) / 4;

        // 画背景包（x：125rpx）
        // contextB.drawImage(that.data.Bagimg, 62.5, bagy, 250, 375)
        // contextB.draw();

        // 下载网络图片
        // wx.downloadFile({
        //   url: that.data.rimg,
        //   success: function(res) {
        //     console.log(res);
        //     contextB.drawImage(res.tempFilePath, x, y, width, height)
        //     //绘制图片
        //     contextB.draw();
        //     //保存
        //     contextB.save();
        //     console.log(contextB);
        //   },
        //   fail: function(res) {}
        // })

      }
    })
  },

  /**
   * 获取生成的布包图片名
   * pName 图案
   * cName 颜色
   */
  createBp: function(pName, cName, openId) {
    var that = this;
    wx.request({
      url: 'https://www.vrwbg.com:8080/mini/create-bp',
      method: 'GET', //默认
      data: {
        openId: openId,
        pName: pName,
        cName: cName,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function(res) {
        that.setData({
          rimg: app.globalData.rURL + res.data.rName + that.data.imgformat
        });
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    wx.showLoading({
      title: '加载中',
    })

    //wx.getSystemInfoSync().windowHeight单位px，h单位rpx（px到rpx转换）
    this.data.h = 750 * wx.getSystemInfoSync().windowHeight / wx.getSystemInfoSync().windowWidth;
    this.setData({
      centerh: this.data.h - 140,
    })

    this.setData({
      production: app.globalData.production
    })
    if (app.globalData.production == "C") {
      this.data.imgformat = ".png";

      console.log("cc_name, ce_name, cm_name:" + app.globalData.cc_name, app.globalData.ce_name, app.globalData.cm_name)
      // 获取结果图名(c,e,m,id)
      this.createCp(app.globalData.cc_name, app.globalData.ce_name, app.globalData.cm_name, app.globalData.openId)

    } else {
      this.data.imgformat = ".jpg";

      console.log("bp_name, bc_name:" + app.globalData.bp_name, app.globalData.bc_name)
      // 获取结果图名(p,c,id)
      this.createBp(app.globalData.bp_name, app.globalData.bc_name, app.globalData.openId)
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
    this.data.textimg=[
      app.globalData.rootURL + this.data.txtURL + this.data.tURL  + "01.png",
      app.globalData.rootURL + this.data.txtURL + this.data.tURL  + "02.png",
      app.globalData.rootURL + this.data.txtURL + this.data.tURL  + "03.png",
      // app.globalData.rootURL + this.data.txtURL + this.data.tURL  + "04.png",
      // app.globalData.rootURL + this.data.txtURL + this.data.tURL  + "05.png",
    ];
    console.log("选择的问题图片路径："+this.data.textimg[Math.floor(Math.random() * this.data.textimg.length)]);

    //120rpx 为文字图片的高度
    var bagy = (this.data.h - 890 - 125) / 4;
    var txty = (this.data.h - 890 - 125) / 4 + 750/2;
    // 画背景包（x：125rpx）
    contextB.drawImage(this.data.Bagimg, 62.5, bagy, 250, 375);
    contextB.drawImage(this.data.textimg[Math.floor(Math.random() * this.data.textimg.length)], 62.5, txty, 250, 62.5)
    contextB.draw();

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