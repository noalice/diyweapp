// pages/production/element/element.js

var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    indexb: 0, //外面滑片
    //地毯
    carpet: [{
        "name": "主题",
        "url": app.globalData.rootURL + "UGTT0001.png"
      },
      {
        "name": "边框",
        "url": app.globalData.rootURL + "USTT0401.png"
      },
      {
        "name": "角隅",
        "url": app.globalData.rootURL + "USTT0402.png"
      }
    ],
    //布包
    bag: [{
        "name": "主题",
        "url": app.globalData.rootURL + "UGTT0001.png"
      },
      {
        "name": "配色",
        "url": app.globalData.rootURL + "USTT0403.png"
      }
    ],
    returnimg: app.globalData.rootURL + "UGTP0002.png",
    finishimg: app.globalData.rootURL + "UGTP0001.png",
    Eimg: "",
    Mimg: "",
    Cimg: "",
    Pimg: "",
    Bagimg: app.globalData.rootURL + "UGKP0002.png",
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

    // 图片位置
    centerheight: 0,
    Eimgbottom: 0,
    Cimgtop:0,
  },

  //根据tab，得到滑片索引（通过 data-current="{{index}}" 得到）
  changeview: function(e) {
    this.setData({
      indexb: e.currentTarget.dataset.current,
    });
    console.log("外部滑片indexb:" + this.data.indexb);

    if (app.globalData.production == "C") {
      if (this.data.indexb == 0) {
        this.data.eURL = "M";

        //不带默认选择框
        this.setData({
          select: -1,
        });
      }
      if (this.data.indexb == 1) {
        this.data.eURL = "E";

        //不带默认选择框
        this.setData({
          select: -1,
        });
      }
      if (this.data.indexb == 2) {
        this.data.eURL = "C";

        //不带默认选择框
        this.setData({
          select: -1,
        });
      }
    } else {
      if (this.data.indexb == 0) {
        this.data.eURL = "P";

        //不带默认选择框
        this.setData({
          select: -1,
        });
      }
      if (this.data.indexb == 1) {
        this.data.eURL = "C";

        //不带默认选择框
        this.setData({
          select: -1,
        });
      }
    }

    this.data.imgName = [
        this.data.pURL + this.data.tURL + this.data.eURL + "I01",
        this.data.pURL + this.data.tURL + this.data.eURL + "I02",
        this.data.pURL + this.data.tURL + this.data.eURL + "I03",
        this.data.pURL + this.data.tURL + this.data.eURL + "I04",
        this.data.pURL + this.data.tURL + this.data.eURL + "I05",
        this.data.pURL + this.data.tURL + this.data.eURL + "I06",
        this.data.pURL + this.data.tURL + this.data.eURL + "I07",
        this.data.pURL + this.data.tURL + this.data.eURL + "I08",
        this.data.pURL + this.data.tURL + this.data.eURL + "I09",
        this.data.pURL + this.data.tURL + this.data.eURL + "I10",
      ],

      this.setData({
        imgURL: [
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I01.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I02.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I03.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I04.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I05.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I06.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I07.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I08.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I09.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I10.png",
        ]
      })

    // console.log("事件点击加载获取图片路径：" + this.data.imgURL);
    // console.log("图片名称：" + this.data.imgName[0]);


  },
  // 禁止外部swiper手指触摸滑动
  stopTouchMove: function() {
    return false;
  },

  swipclick: function(e) {
    this.setData({
      select: e.currentTarget.dataset.num,
    });
    console.log("select里面滑片:" + this.data.select);

    var str = this.data.imgName[this.data.select];
    // 字符串去掉首位的“u”，再在末尾补0
    // 字符串长度 str.toString().length
    str = str.substr(1) + "0";
    this.data.drawName = str;
    console.log("需要绘画图片名称:" + this.data.drawName);

    if (app.globalData.production == "C") {
      if (this.data.indexb == 0) {
        app.globalData.cm_name = this.data.drawName;
        console.log("滑片0 cm_name：" + app.globalData.cm_name);

        //页面使用
        this.setData({
          Mimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        console.log("Mimg：" + this.data.Mimg);
      }

      if (this.data.indexb == 1) {
        app.globalData.ce_name = this.data.drawName;
        console.log("滑片1 ce_name：" + app.globalData.ce_name);

        this.setData({
          Eimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        console.log("Eimg：" + this.data.Eimg);
      }

      if (this.data.indexb == 2) {
        app.globalData.cc_name = this.data.drawName;
        console.log("滑片2 cc_name：" + app.globalData.cc_name);

        this.setData({
          Cimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        console.log("Cimg：" + this.data.Cimg);
      }
    } else {
      if (this.data.indexb == 0) {
        app.globalData.bp_name = this.data.drawName;
        console.log("滑片0 bp_name：" + app.globalData.bp_name);

        this.setData({
          Pimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        console.log("Pimg：" + this.data.Pimg);
      }
      if (this.data.indexb == 1) {
        app.globalData.bc_name = this.data.drawName;
        console.log("滑片1 bc_name：" + app.globalData.bc_name);
      }
    }
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
      if (app.globalData.cc_name != "" && app.globalData.ce_name != "" && app.globalData.cm_name != "") {

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
      if (app.globalData.bp_name != "") {

        wx.navigateTo({
          url: '../result/result'
        })
      } else {
        // 弹窗
        wx.showToast({
          title: '需要选择主题元素!!!',
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

    wx.showLoading({
      title: '加载中',
    })

    //wx.getSystemInfoSync().windowHeight单位px，h单位rpx（px到rpx转换）
    var h = 750 * wx.getSystemInfoSync().windowHeight / wx.getSystemInfoSync().windowWidth;
    this.setData({
      //上面100rpx,下面150rpx的60rpx
      centerheight: h - 210,
      // 上面的100rpx,下面的40rpx的150rpx的60rpx，中间的750rpx（120rpx手动调的）
      Eimgbottom: (h - 1100) / 2 +120,
      Cimgtop:(h-1000)/2,
    })

    this.setData({
      production: app.globalData.production
    });

    if (app.globalData.production == "C") {
      this.data.pURL = "UC";
      this.data.eURL = "M";
      this.data.imgformat = ".png";
    } else {
      this.data.pURL = "UB";
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

    this.data.imgName = [
        this.data.pURL + this.data.tURL + this.data.eURL + "I01",
        this.data.pURL + this.data.tURL + this.data.eURL + "I02",
        this.data.pURL + this.data.tURL + this.data.eURL + "I03",
        this.data.pURL + this.data.tURL + this.data.eURL + "I04",
        this.data.pURL + this.data.tURL + this.data.eURL + "I05",
        this.data.pURL + this.data.tURL + this.data.eURL + "I06",
        this.data.pURL + this.data.tURL + this.data.eURL + "I07",
        this.data.pURL + this.data.tURL + this.data.eURL + "I08",
        this.data.pURL + this.data.tURL + this.data.eURL + "I09",
        this.data.pURL + this.data.tURL + this.data.eURL + "I10",
      ],

      this.setData({
        imgURL: [
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I01.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I02.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I03.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I04.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I05.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I06.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I07.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I08.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I09.png",
          app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I10.png",
        ]
      })

    // console.log("页面加载获取图片路径：" + this.data.imgURL);
    // console.log("图片名称：" + this.data.imgName[0]);

  },
  // 监听页面初次渲染完成
  onReady: function() {
    wx.hideLoading()
  },

})