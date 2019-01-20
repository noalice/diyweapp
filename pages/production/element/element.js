// pages/production/element/element.js

const app = getApp()
const util = require('../../../utils/util.js')

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
    drawName01: '',
    drawName02: '',
    drawName03: '',
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

    this.setData({
      imgName: [
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

      imgURL: [
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I01" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I02" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I03" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I04" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I05" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I06" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I07" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I08" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I09" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I10" + this.data.imgformat,
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

    var str = this.data.imgName[this.data.select];
    // 字符串去掉首位的“u”，再在末尾补0
    // 字符串长度 str.toString().length
    str = str.substr(1) + "0";
    this.data.drawName = str;

    // this.data.drawName = this.data.imgName[this.data.select];

    console.log("需要绘画图片名称:" + this.data.drawName);

    if (this.data.indexb == 0) {
      this.data.drawName01 = this.data.drawName;
      console.log("滑片0drawName01：" + this.data.drawName01);

      if (app.globalData.production == "C") {

        //页面使用
        this.setData({
          Mimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        console.log("Mimg：" + this.data.Mimg);
      } else {

        this.setData({
          Pimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        console.log("Pimg：" + this.data.Pimg);
      }

    }
    if (this.data.indexb == 1) {
      this.data.drawName02 = this.data.drawName;
      console.log("滑片1drawName02：" + this.data.drawName02);

      if (app.globalData.production == "C") {

        this.setData({
          Eimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        console.log("Eimg：" + this.data.Eimg);
      }

    }
    if (this.data.indexb == 2) {
      this.data.drawName03 = this.data.drawName;
      console.log("滑片2drawName03：" + this.data.drawName03);


      this.setData({
        Cimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
      });
      console.log("Cimg：" + this.data.Cimg);

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
      if (this.data.drawName01 != "" && this.data.drawName02 != "" && this.data.drawName03 != "") {
        // 获取结果图名(e,c,m,id)
        console.log("this.data.drawName02, this.data.drawName03, this.data.drawName01:" + this.data.drawName02, this.data.drawName03, this.data.drawName01);
        app.globalData.rName = util.createCp(this.data.drawName02, this.data.drawName03, this.data.drawName01, app.globalData.openId);
        console.log("调用函数cp等到结果rName:" + app.globalData.rName);

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
        // 获取结果图名(id,p,c)
        app.globalData.rName = util.createBp(app.globalData.openId,this.data.drawName01, this.data.drawName02);
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

    wx.showLoading({
      title: '加载中',
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

    this.setData({
      imgName: [
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

      imgURL: [
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I01" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I02" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I03" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I04" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I05" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I06" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I07" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I08" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I09" + this.data.imgformat,
        app.globalData.rootURL + this.data.pURL + this.data.tURL + this.data.eURL + "I10" + this.data.imgformat,
      ]
    })

    console.log("页面加载获取图片路径：" + this.data.imgURL);
    console.log("图片名称：" + this.data.imgName[0]);

  },
  // 监听页面初次渲染完成
  onReady: function () {
    wx.hideLoading()
  },

})