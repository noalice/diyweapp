// pages/production/element/element.js

const app = getApp()
const util = require('../../../utils/util.js')

const contextC = wx.createCanvasContext('canvasC')
const contextB = wx.createCanvasContext('canvasB')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    indexb: 0, //外面滑片
    //地毯
    carpet: [{
        "name": "主题",
        "color": "orange",
        "url": app.globalData.rootURL + "UGTT0001.png"
      },
      {
        "name": "边框",
        "color": "blue",
        "url": app.globalData.rootURL + "USTT0401.png"
      },
      {
        "name": "角隅",
        "color": "green",
        "url": app.globalData.rootURL + "USTT0402.png"
      }
    ],
    //布包
    bag: [{
        "name": "主题",
        "color": "pink",
        "url": app.globalData.rootURL + "UGTT0001.png"
      },
      {
        "name": "配色",
        "color": "black",
        "url": app.globalData.rootURL + "USTT0403.png"
      }
    ],
    returnimg: app.globalData.rootURL + "UGTP0002.png",
    finishimg: app.globalData.rootURL + "UGTP0001.png",
    // image URL
    pURL: "",
    tURL: "",
    eURL: "",
    imgformat: "",
    imgURL: [],
    imgName: [],
    // 里面滑片默认不选择
    select: -1,
    drawName: "",
    drawName01: '',
    drawName02: '',
    drawName03: '',
    x: 0, //绘画位置
    y: 0, //绘画位置
    width: 0, //绘画宽度
    height: 0, //绘画高度
  },

  //根据tab，得到滑片索引（通过 data-current="{{index}}" 得到）
  changeview: function(e) {
    this.setData({
      indexb: e.currentTarget.dataset.current,
    });

    console.log("外部滑片:" + this.data.indexb);

    if (app.globalData.production == "C") {
      if (this.data.indexb == 0) {
        this.data.eURL = "M";

        //不带默认选择框
        this.setData({
          select: -1,
        });

        this.data.x = 25;
        this.data.y = 25;
        this.data.width = 175;
        this.data.height = 275
      }
      if (this.data.indexb == 1) {
        this.data.eURL = "E";

        //不带默认选择框
        this.setData({
          select: -1,
        });

        this.data.x = 0;
        this.data.y = 0;
        this.data.width = 200;
        this.data.height = 300
      }
      if (this.data.indexb == 2) {
        this.data.eURL = "C";

        //不带默认选择框
        this.setData({
          select: -1,
        });
        // 画四个
        // this.data.x = 25;
        // this.data.y = 25;
        // this.data.width = 175;
        // this.data.height = 275 
      }
    } else {
      if (this.data.indexb == 0) {
        this.data.eURL = "P";

        //不带默认选择框
        this.setData({
          select: -1,
        });

        this.data.x = 100;
        this.data.y = 100;
        this.data.width = 100;
        this.data.height = 100
      }
      if (this.data.indexb == 1) {
        this.data.eURL = "C";

        //不带默认选择框
        this.setData({
          select: -1,
        });

        // 色块不画
        this.data.x = 0;
        this.data.y = 0;
        this.data.width = 0;
        this.data.height = 0
      }
    }

    this.setData({
      imgName: [
        this.data.pURL + this.data.tURL + this.data.eURL + "I010",
        this.data.pURL + this.data.tURL + this.data.eURL + "I020",
        this.data.pURL + this.data.tURL + this.data.eURL + "I030",
        this.data.pURL + this.data.tURL + this.data.eURL + "I040",
        this.data.pURL + this.data.tURL + this.data.eURL + "I050",
        this.data.pURL + this.data.tURL + this.data.eURL + "I060",
        this.data.pURL + this.data.tURL + this.data.eURL + "I070",
        this.data.pURL + this.data.tURL + this.data.eURL + "I080",
        this.data.pURL + this.data.tURL + this.data.eURL + "I090",
        this.data.pURL + this.data.tURL + this.data.eURL + "I100",
      ],

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

    console.log("事件点击加载获取图片路径：" + this.data.imgURL);
    console.log("图片名称：" + this.data.imgName[0]);


  },
  // 禁止外部swiper手指触摸滑动
  stopTouchMove: function() {
    return false;
  },

  swipclick: function(e) {
    this.setData({
      select: e.currentTarget.dataset.num,
    });

    console.log("里面滑片:" + this.data.select);

    // var str = this.data.imgName[this.data.select];
    // // 字符串去掉首位的“u”，再在末尾补0
    // // 字符串长度 str.toString().length
    // str = str.substr(1) +"0";
    // this.data.drawName = str;

    this.data.drawName = this.data.imgName[this.data.select];

    console.log("需要绘画图片名称:" + this.data.drawName);

    if (this.data.indexb == 0) {
      this.data.drawName01 = this.data.drawName;
      console.log("滑片0：" + this.data.drawName01);
    }
    if (this.data.indexb == 1) {
      this.data.drawName02 = this.data.drawName;
      console.log("滑片1：" + this.data.drawName02);
    }
    if (this.data.indexb == 2) {
      this.data.drawName03 = this.data.drawName;
      console.log("滑片2：" + this.data.drawName03);
    }

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
      url: app.globalData.rootURL + this.data.drawName + this.data.imgformat,
      success: function(res) {
        console.log(res);
        context.drawImage(res.tempFilePath, x, y, width, height)
        //绘制图片
        context.draw();
        //保存
        context.save();
        console.log(context);
      },
      fail: function(res) {}
    })

  },


  //事件处理函数
  ReturnTap: function() {
    wx.navigateTo({
      url: '../production'
    })
  },
  ResultTap: function() {
    // 判断完成度
    if (app.globalData.production == "C") {
      if (this.data.drawName01 != "" && this.data.drawName02 != "" && this.data.drawName03 != "") {
        // 获取结果图名
        app.globalData.rName = util.createCp(this.data.drawName01, this.data.drawName02, this.data.drawName03, app.globalData.openId);
        console.log("调用函数cp等到结果rName:" + app.globalData.rName );

        wx.navigateTo({
          url: '../result/result'
        })
      } else {
        // 弹窗
        wx.showToast({
          title: '需要选择三个元素!!!',
          icon: 'none',
          duration: 2000 //持续的时间
        })
      }
    } else {
      if (this.data.drawName01 != "" && this.data.drawName02 != "") {
        // 获取结果图名
        app.globalData.rName = util.createBp(this.data.drawName01, this.data.drawName02, app.globalData.openId);
        console.log("调用函数bp得到结果rName:" + app.globalData.rName);

        wx.navigateTo({
          url: '../result/result'
        })
      } else {
        // 弹窗
        wx.showToast({
          title: '需要选择两个元素!!!',
          icon: 'none',
          duration: 2000 //持续的时间
        })
      }
    }
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

      this.data.eURL = "M";
      this.data.x = 25;
      this.data.y = 25;
      this.data.width = 175;
      this.data.height = 275;

      this.data.imgformat = ".png";
    } else {
      this.data.pURL = "B";

      this.data.eURL = "P";
      this.data.x = 100;
      this.data.y = 100;
      this.data.width = 100;
      this.data.height = 100;

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
      imgName: [
        this.data.pURL + this.data.tURL + this.data.eURL + "I010",
        this.data.pURL + this.data.tURL + this.data.eURL + "I020",
        this.data.pURL + this.data.tURL + this.data.eURL + "I030",
        this.data.pURL + this.data.tURL + this.data.eURL + "I040",
        this.data.pURL + this.data.tURL + this.data.eURL + "I050",
        this.data.pURL + this.data.tURL + this.data.eURL + "I060",
        this.data.pURL + this.data.tURL + this.data.eURL + "I070",
        this.data.pURL + this.data.tURL + this.data.eURL + "I080",
        this.data.pURL + this.data.tURL + this.data.eURL + "I090",
        this.data.pURL + this.data.tURL + this.data.eURL + "I100",
      ],

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

    console.log("页面加载获取图片路径：" + this.data.imgURL);
    console.log("图片名称：" + this.data.imgName[0]);

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