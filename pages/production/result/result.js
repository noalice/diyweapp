// pages/production/carpet.js

const app = getApp()

const contextC = wx.createCanvasContext('canvasC')
const contextB = wx.createCanvasContext('canvasB')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    x: 0, //绘画位置
    y: 0, //绘画位置
    width: 0, //绘画宽度
    height: 0, //绘画高度

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      production: app.globalData.production
    })

    var x = this.data.x;
    var y = this.data.y;
    var width = this.data.width;
    var height = this.data.height;
    var context;
    if (app.globalData.production == "C") {
      context = contextC;
    } else {
      context = contextB;
    }

    // 画图(问题：1.时间长，下载图片时间 + 绘制时间  2.闪屏 3.图片旋转90度 4.图片叠加 5.画四个角)
    // 将图片下载到本地(图片需要是https链接的)，不然手机上不能正常显示
    wx.downloadFile({
      url: app.globalData.rURL + app.globalData.rName +".jpg",
      success: function (res) {
        console.log(res);
        context.drawImage(res.tempFilePath, x, y, width, height)
        //绘制图片
        context.draw();
        //保存
        context.save();
        console.log(context);
      },
      fail: function (res) { }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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