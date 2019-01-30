// pages/production/element/element.js

var app = getApp()
const utilApi = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

    indexb: 0, //外面滑片
    //地毯
    carpet: [{
        "name": "主题",
        "url": app.globalData.rootURL + "USTT0408.png"
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
        "url": app.globalData.rootURL + "USTT0409.png"
      },
      {
        "name": "配色",
        "url": app.globalData.rootURL + "USTT0403.png"
      }
    ],
    returnimg: app.globalData.rootURL + "UGTP0002.png",
    finishimg: app.globalData.rootURL + "UGTP0001.png",
    autoimg: '',
    Eimg: "",
    Mimg: "",
    Cimg: "",
    Rimg: "",
    is_rimg: false, //判断是否为地毯（披肩）结果图，是就添加白色背景
    Pimg: "",
    // image URL
    pURL: "",
    tURL: "",
    eURL: "",
    imgformat: "",
    imgURL: [],
    imgName: [],
    // 里面滑片默认选择
    select: 0,
    drawName: "",
    showFinishbt: true, //展示完成按钮
    enablecolor: false, //自动生成颜色变换（可点击）
    // 图片位置
    centerheight: 0,
    Eimgwidth: 0,
    Eimgheight: 0,
    Eimgwidth: 0,
    Mimgheight: 0,
    Mimgwidth: 0,
    Cimgheight: 0,
    Cimgwidth: 0,
    //L：左 ；R：右 ；T：上 ；B：下
    CimgleftLT: 0,
    CimgtopLT: 0,
    CimgleftLB: 0,
    CimgtopLB: 0,
    CimgleftRT: 0,
    CimgtopRT: 0,
    CimgleftRB: 0,
    CimgtopRB: 0,
    Eimgwidth: 0,
    Pimgbottom: 0,
    flag: -1, //判断布包选择了色块后是否点击了自动上色
    dissatisfaction: false, //用户不满意结果，重新选择
  },

  //根据tab，得到滑片索引（通过 data-current="{{index}}" 得到）
  changeview: function(e) {
    this.setData({
      indexb: e.currentTarget.dataset.current,
    });
    // console.log("外部滑片indexb:" + this.data.indexb);

    if (this.data.select == 0) {
      //不带默认选择框
      this.setData({
        select: -1,
      });
    }

    if (app.globalData.production == "C") {
      if (this.data.indexb == 0) {
        this.data.eURL = "M";

        this.setData({
          select: app.globalData.selectcm,
        });
      }
      if (this.data.indexb == 1) {
        this.data.eURL = "E";

        this.setData({
          select: app.globalData.selectce,
        });

      }
      if (this.data.indexb == 2) {
        this.data.eURL = "C";

        this.setData({
          select: app.globalData.selectcc,
        });
      }
    } else {
      if (this.data.indexb == 0) {
        this.data.eURL = "P";

        this.setData({
          select: app.globalData.selectbp,
        });
      }
      if (this.data.indexb == 1) {
        this.data.eURL = "C";

        this.setData({
          select: app.globalData.selectbc,
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
    // console.log("select里面滑片:" + this.data.select);

    // 用户不满意，清除数据
    if (this.data.dissatisfaction == true) {
      if (app.globalData.production == "B") {
        //用户不满意，重新选择元素，布包需要重新判断点击完成按钮的条件
        this.data.flag = -1;
      } else {
        //用户不满意，重新选择元素，地毯（披肩）需要隐藏完成按钮
        this.setData({
          showFinishbt: false,
        });
      }

      this.setData({
        Rimg: "",
        is_rimg: false,
        Pimg: app.globalData.rootURL + app.globalData.bp_name + this.data.imgformat
      });

      //重新判断满意度
      this.data.dissatisfaction = false;
    }


    var str = this.data.imgName[this.data.select];
    // 字符串去掉首位的“u”，再在末尾补0
    // 字符串长度 str.toString().length
    str = str.substr(1) + "0";
    this.data.drawName = str;
    // console.log("需要绘画图片名称:" + this.data.drawName);

    if (app.globalData.production == "C") {
      if (this.data.indexb == 0) {
        app.globalData.cm_name = this.data.drawName;
        // console.log("滑片0 cm_name：" + app.globalData.cm_name);

        //记录选择里面滑片
        app.globalData.selectcm = this.data.select;

        //页面使用
        this.setData({
          Mimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        // console.log("Mimg：" + this.data.Mimg);
      }

      if (this.data.indexb == 1) {
        app.globalData.ce_name = this.data.drawName;
        // console.log("滑片1 ce_name：" + app.globalData.ce_name);

        //记录选择里面滑片
        app.globalData.selectce = this.data.select;

        this.setData({
          Eimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        // console.log("Eimg：" + this.data.Eimg);
      }

      if (this.data.indexb == 2) {
        app.globalData.cc_name = this.data.drawName;
        // console.log("滑片2 cc_name：" + app.globalData.cc_name);

        //记录选择里面滑片
        app.globalData.selectcc = this.data.select;

        this.setData({
          Cimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        // console.log("Cimg：" + this.data.Cimg);
      }
    } else {

      if (this.data.indexb == 0) {
        app.globalData.bp_name = this.data.drawName;
        // console.log("滑片0 bp_name：" + app.globalData.bp_name);

        //记录选择里面滑片
        app.globalData.selectbp = this.data.select;

        //布包没有选择色块的图片路径记录
        app.globalData.bagNoColorUrl = app.globalData.rootURL + this.data.drawName + this.data.imgformat;

        this.setData({
          Pimg: app.globalData.rootURL + this.data.drawName + this.data.imgformat
        });
        // console.log("Pimg：" + this.data.Pimg);
      }
      if (this.data.indexb == 1) {
        app.globalData.bc_name = this.data.drawName;
        // console.log("滑片1 bc_name：" + app.globalData.bc_name);

        //记录选择里面滑片
        app.globalData.selectbc = this.data.select;
      }
    }

    //判断完成度
    if (app.globalData.production == "C") {
      if (app.globalData.cc_name != "" && app.globalData.ce_name != "" && app.globalData.cm_name != "") {
        this.setData({
          enablecolor: true,
          autoimg: app.globalData.rootURL + "USTT0406.png"
        });
      } else {
        this.setData({
          enablecolor: false,
        });
      }
    } else {
      if (app.globalData.bp_name != "" && app.globalData.bc_name != "") {
        this.setData({
          enablecolor: true,
          autoimg: app.globalData.rootURL + "USTT0405.png"
        });
      } else {
        this.setData({
          enablecolor: false,
        });
      }
    }
  },


  //事件处理函数
  ReturnTap: function() {
    // 点击返回按钮，清空参数
    app.globalData.ce_name = "";
    app.globalData.cm_name = "";
    app.globalData.cc_name = "";
    app.globalData.bp_name = "";
    app.globalData.bc_name = "";
    // 点击返回按钮，清空选择
    app.globalData.selectce = -1; //选择图片记录(默认不选)
    app.globalData.selectcm = 0; //默认第一个
    app.globalData.selectcc = -1;
    app.globalData.selectbp = 0; //默认第一个
    app.globalData.selectbc = -1;

    wx.redirectTo({
      url: '../production'
    })
  },
  ResultTap: function() {
    if (app.globalData.bc_name == "") {

      wx.redirectTo({
        url: '../result/result'
      })
    } else {
      //判断是否可以点击完成按钮
      if (this.data.flag == 0) {
        wx.redirectTo({
          url: '../result/result'
        })
      } else {
        wx.showToast({
          title: '请先点击 “ 自动上色 ” 按钮！',
          icon: 'none',
          duration: 2000 //持续的时间
        })
      }
    }
  },
  //自动生成按钮事件（变色可用）
  enablebt: function() {

    //判断用户是否没有直接点击完成
    this.data.dissatisfaction = true;

    if (this.data.enablecolor == true) {
      if (app.globalData.production == "C") {

        wx.showToast({
          title: '正在自动生成。。。',
          icon: 'none',
          duration: 2000 //持续的时间
        })

        // console.log("cc_name, ce_name, cm_name:" + app.globalData.cc_name, app.globalData.ce_name, app.globalData.cm_name)
        // 获取结果图名(c,e,m,id)
        var that = this;
        utilApi.requestPromiseCp(app.globalData.cc_name, app.globalData.ce_name, app.globalData.cm_name, app.globalData.openId)
          // 使用.then处理结果
          .then(res => {
            // console.log("结果图rName：" + res.data.rName)

            // 获取结果图路径
            app.globalData.rNameUrl = app.globalData.rURL + res.data.rName + that.data.imgformat
            // 展示结果图（显示完成按钮）
            that.setData({
              showFinishbt: true,
              Rimg: app.globalData.rURL + res.data.rName + that.data.imgformat,
              is_rimg: true
            });

          });

      } else {

        wx.showToast({
          title: '正在自动上色。。。',
          icon: 'none',
          duration: 2000 //持续的时间
        })

        // 布包点击自动上色按钮，判断条件
        this.data.flag = 0;

        // console.log("bp_name, bc_name:" + app.globalData.bp_name, app.globalData.bc_name)
        // 获取结果图名(p,c,id)
        var that = this;
        utilApi.requestPromiseBp(app.globalData.bp_name, app.globalData.bc_name, app.globalData.openId)
          // 使用.then处理结果
          .then(res => {
            // console.log("结果图rName：" + res.data.rName)

            // 获取结果图路径
            app.globalData.rNameUrl = app.globalData.rURL + res.data.rName + that.data.imgformat
            // 展示结果图
            that.setData({
              Pimg: app.globalData.rURL + res.data.rName + that.data.imgformat
            });

          });

      }

    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    console.log("cc_name, ce_name, cm_name , bp_name , bc_name:" + app.globalData.cc_name, app.globalData.ce_name, app.globalData.cm_name, app.globalData.bp_name, app.globalData.bc_name)
    console.log("Pimg, Eimg , Mimg , Cimg:" + this.data.Pimg, this.data.Eimg, this.data.Mimg, this.data.Cimg)
    console.log("flag , dissatisfaction，is_return:" + this.data.flag, this.data.dissatisfaction, app.globalData.is_return)

    wx.showLoading({
      title: '加载中',
    })

    //wx.getSystemInfoSync().windowHeight单位px，h单位rpx（px到rpx转换）
    var h = 750 * wx.getSystemInfoSync().windowHeight / wx.getSystemInfoSync().windowWidth;
    this.setData({
      //下面153rpx的83rpx的83rpx,上面的间距20rpx,上面的按钮100rpx
      centerheight: h - 153 - 83 - 83 - 20 - 100,
    })

    if (this.data.centerheight > 750) {
      this.setData({
        Pimgwidth: 750,
        Pimgbottom: (this.data.centerheight - 750) / 2,
        Eimgwidth: 750,
        Eimgheight: 500,
        Mimgwidth: 625 + 6,
        Mimgheight: 375 + 6, //加7偏差
        Cimgwidth: 80, //角宽度为80rpx
        //0.8*750 外面view的宽度,400为主题宽度
        //L：左 ；R：右 ；T：上 ；B：下
        CimgleftLT: (0.8 * 750 - 375) / 2 - 2,
        CimgtopLT: (this.data.centerheight - 625) / 2 - 2,
        CimgleftLB: (0.8 * 750 - 375) / 2 - 2,
        CimgtopLB: (this.data.centerheight - 625) / 2 + 625 - 80 + 3,
        //加3偏差
        CimgleftRT: (0.8 * 750 - 375) / 2 + 375 - 80 + 4,
        CimgtopRT: (this.data.centerheight - 625) / 2 - 2,
        CimgleftRB: (0.8 * 750 - 375) / 2 + 375 - 80 + 4,
        CimgtopRB: (this.data.centerheight - 625) / 2 + 625 - 80 + 3,
      })
    } else {
      this.setData({
        //图片上下间隔10rpx
        Pimgwidth: this.data.centerheight - 20,
        Pimgbottom: 10,
        Eimgwidth: this.data.centerheight - 20,
        Eimgheight: (this.data.centerheight - 20) / 3 * 2,
        // 边框和主题相差80rpx
        Mimgwidth: this.data.centerheight - 20 - 80,
        Mimgheight: (this.data.centerheight - 20) / 3 * 2 - 80,
        Cimgwidth: 80, //角宽度为80rpx
        //0.8*750 外面view的宽度, (this.data.centerheight - 20) / 3 * 2 - 100 为主题宽度
        //L：左 ；R：右 ；T：上 ；B：下
        CimgleftLT: (0.8 * 750 - ((this.data.centerheight - 20) / 3 * 2 - 80)) / 2,
        CimgtopLT: (this.data.centerheight - (this.data.centerheight - 20 - 80)) / 2,
        CimgleftLB: (0.8 * 750 - ((this.data.centerheight - 20) / 3 * 2 - 80)) / 2,
        CimgtopLB: (this.data.centerheight - (this.data.centerheight - 20 - 80)) / 2 + (this.data.centerheight - 20 - 80) - 80 + 2,
        //加2偏差
        CimgleftRT: (0.8 * 750 - ((this.data.centerheight - 20) / 3 * 2 - 80)) / 2 + ((this.data.centerheight - 20) / 3 * 2 - 80) - 80 + 3,
        CimgtopRT: (this.data.centerheight - (this.data.centerheight - 20 - 80)) / 2,
        CimgleftRB: (0.8 * 750 - ((this.data.centerheight - 20) / 3 * 2 - 80)) / 2 + ((this.data.centerheight - 20) / 3 * 2 - 80) - 80 + 3,
        CimgtopRB: (this.data.centerheight - (this.data.centerheight - 20 - 80)) / 2 + (this.data.centerheight - 20 - 80) - 80 + 2,
      })
    }

    this.setData({
      production: app.globalData.production
    });


    if (app.globalData.production == "C") {
      //地毯默认可跳转结果页面
      this.data.flag = 0;

      //隐藏完成按钮
      this.setData({
        showFinishbt: false,
        autoimg: app.globalData.rootURL + "USTT0407.png"
      });

      this.data.pURL = "UC";
      this.data.eURL = "M";
      this.data.imgformat = ".png";
    } else {

      this.setData({
        autoimg: app.globalData.rootURL + "USTT0404.png"
      });

      this.data.pURL = "UB";
      this.data.eURL = "P";
      this.data.imgformat = ".jpg";
    }

    switch (app.globalData.theme) {
      case 1:
        this.data.tURL = "01"
        if (app.globalData.is_return == false) {
          // 顺序进入默认展示图
          this.setData({
            Pimg: app.globalData.rootURL + 'B01PI010' + this.data.imgformat,
            Mimg: app.globalData.rootURL + 'C01MI010' + this.data.imgformat
          });
          //默认获取元素图名
          app.globalData.cm_name = 'C01MI010'
          app.globalData.bp_name = 'B01PI010'
        }
        break;
      case 2:
        this.data.tURL = "02"
        if (app.globalData.is_return == false) {
          // 顺序进入默认展示图
          this.setData({
            Pimg: app.globalData.rootURL + 'B02PI010' + this.data.imgformat,
            Mimg: app.globalData.rootURL + 'C02MI010' + this.data.imgformat
          });
          //默认获取元素图名
          app.globalData.cm_name = 'C02MI010'
          app.globalData.bp_name = 'B02PI010'
        }
        break;
      case 3:
        this.data.tURL = "03"
        if (app.globalData.is_return == false) {
          // 顺序进入默认展示图
          this.setData({
            Pimg: app.globalData.rootURL + 'B03PI010' + this.data.imgformat,
            Mimg: app.globalData.rootURL + 'C03MI010' + this.data.imgformat
          });
          //默认获取元素图名
          app.globalData.cm_name = 'C03MI010'
          app.globalData.bp_name = 'B03PI010'
        }
        break;
      case 4:
        this.data.tURL = "04"
        if (app.globalData.is_return == false) {
          // 顺序进入默认展示图
          this.setData({
            Pimg: app.globalData.rootURL + 'B04PI010' + this.data.imgformat,
            Mimg: app.globalData.rootURL + 'C04MI010' + this.data.imgformat
          });
          //默认获取元素图名
          app.globalData.cm_name = 'C04MI010'
          app.globalData.bp_name = 'B04PI010'

        }
        break;
      case 5:
        this.data.tURL = "05"
        if (app.globalData.is_return == false) {
          // 顺序进入默认展示图
          this.setData({
            Pimg: app.globalData.rootURL + 'B05PI010' + this.data.imgformat,
            Mimg: app.globalData.rootURL + 'C05MI010' + this.data.imgformat
          });
          //默认获取元素图名
          app.globalData.cm_name = 'C05MI010'
          app.globalData.bp_name = 'B05PI010'
        }
        break;
      default:
        break;
    }

    //由结果页面返回
    if (app.globalData.is_return == true) {
      this.setData({
        Pimg: app.globalData.rootURL + app.globalData.bp_name + this.data.imgformat,
        Mimg: app.globalData.rootURL + app.globalData.cm_name + this.data.imgformat,
        Eimg: app.globalData.rootURL + app.globalData.ce_name + this.data.imgformat,
        Cimg: app.globalData.rootURL + app.globalData.cc_name + this.data.imgformat
      });
      if (app.globalData.production == "C" && this.data.indexb == 0) {
        this.setData({
          //地毯（披肩）需要隐藏完成按钮
          showFinishbt: false,
          select: app.globalData.selectcm,
        });
      }
      if (app.globalData.production == "B" && this.data.indexb == 0) {
        this.setData({
          select: app.globalData.selectbp,
        });
      }
    } else {
      //布包没有色块默认路径
      app.globalData.bagNoColorUrl = this.data.Pimg
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