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
        tipimg: app.globalData.rootURL + "UGKT0501.png",
        h: 0, //动态获取到的屏幕展示高度
        centerh: "",
        textimg: [],
        txtURL: "UDKT"
      },

      // 结果页面跳转到哪里？？？
      returnTap: function() {
        wx.navigateTo({
          url: '../element/element'
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
                    contextB.drawImage(res.tempFilePath, 62.5, bagy, 250, 375);
                  });

              utilApi.downloadimgPromise(that.data.textimg[Math.floor(Math.random() * that.data.textimg.length)])
                // 使用.then处理结果
                .then(res => {
                  // 画文字图片
                  contextB.drawImage(res.tempFilePath, 62.5, txty, 250, 62.5)
                });

              utilApi.downloadimgPromise(app.globalData.rURL + res.data.rName + that.data.imgformat)
                // 使用.then处理结果
                .then(res => {
                  // 画结果图
                  contextB.drawImage(res.tempFilePath, 112.5, proy, 150, 150);
                  contextB.draw();
                });

                  });
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