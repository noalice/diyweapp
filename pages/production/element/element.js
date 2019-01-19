// pages/production/element/element.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    indexb: 0,//外面滑片
    //地毯
    carpet: [{
        "name": "主题",
        "color": "orange",
        "url": "http://119.23.13.172:8080/appserver-master-1.0.0-dev/user-images/UGTT0001.png"
      },
      {
        "name": "边框",
        "color": "blue",
        "url": "http://119.23.13.172:8080/appserver-master-1.0.0-dev/user-images/USTT0401.png"
      },
      {
        "name": "角隅",
        "color": "green",
        "url": "http://119.23.13.172:8080/appserver-master-1.0.0-dev/user-images/USTT0402.png"
      }
    ],
    //布包
    bag: [{
        "name": "主题",
        "color": "pink",
        "url": "http://119.23.13.172:8080/appserver-master-1.0.0-dev/user-images/UGTT0001.png"
      },
      {
        "name": "配色",
        "color": "black",
        "url": "http://119.23.13.172:8080/appserver-master-1.0.0-dev/user-images/USTT0403.png"
      }
    ],

    // image URL
    pURL: "",
    tURL: "",
    eURL: "",
    imgformat: "",
    imgURL: [],
    imgName:[],
    // 里面滑片默认不选择
    select:-1,
    drawName: "",
    drawName01: "",
    drawName02: "",
    drawName03: ""
  },

  //根据tab，得到滑片索引（通过 data-current="{{index}}" 得到）
  changeview: function(e) {
    this.setData({
      indexb: e.currentTarget.dataset.current,
    });

    console.log("外部滑片:" + this.data.indexb);

    // 滑片切换有问题(一样的图片)
    if (this.data.indexb == 0 && app.globalData.production == "C") {
      this.data.eURL = "M";
    }
    if (this.data.indexb == 0 && app.globalData.production == "B") {
      this.data.eURL = "P";
    }

    if (this.data.indexb == 1 && app.globalData.production == "C") {
      this.data.eURL = "E";
    }
    if (this.data.indexb == 1 && app.globalData.production == "B") {
      this.data.eURL = "C";
    }

    if (this.data.indexb == 2) {
      this.data.eURL = "C";
    }

    this.setData({
      imgName:[
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
    console.log("图片名称："+this.data.imgName[0]);


  },
  // 禁止外部swiper手指触摸滑动
  stopTouchMove: function() {
    return false;
  },

  swipclick: function (e) {
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


    // 画图(问题：1.时间长，下载图片时间 + 绘制时间  2.闪屏)
    var context = wx.createCanvasContext('canvasC');
    //这个地方的图片是需要注意，图片需要下载不然，手机上不能正常显示
    // 将图片下载到本地(图片需要是https链接的)
    wx.downloadFile({
      url: app.globalData.rootURL + this.data.drawName + this.data.imgformat,
      success: function (res) {
        console.log(res);
        // context.drawImage(res.tempFilePath, 0, 0, 300, 300)
        context.drawImage(res.tempFilePath, 0, 0, 200, 300)
        //绘制图片
        context.draw();
        //保存
        context.save();
        console.log(context);
      }, fail: function (res) {
      }
    })

  },


  //事件处理函数
  ReturnTap: function() {
    wx.navigateTo({
      url: '../production'
    })
  },
  ResultTap: function() {
    wx.navigateTo({
      url: '../result/result'
    })
  },
  RequestTap: function() {

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
      this.data.imgformat = ".png";
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
    console.log("图片名称："+this.data.imgName[0]);

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