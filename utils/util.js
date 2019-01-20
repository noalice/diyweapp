
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获取生成的地毯图片名
 * cName 四角
 * eName 边框
 * mName 中心
 */
function createCp(cName,eName,mName,openId){
  var rName='';
  wx.request({
    url: 'https://www.vrwbg.com:8080/mini/create-cp',
    method: 'GET',//默认
    // data 参数说明:最终发送给服务器的数据是 String 类型，如果传入的 data 不是 String 类型，会被转换成 String
    data:{
      ename: eName,
      cname: cName,
      mname: mName,
      openId:openId
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    // 获取图片名成功回调
    success: function (res) {
      rName=res.data.rName;
      console.log("获取到的rName：" + res.data.rName);
    }
  })
  return rName;
}

/**
 * 获取生成的布包图片名
 * pName 图案
 * cName 颜色
 */
function createBp(pName,cName,openId){
  var rName = '';
  wx.request({
    url: 'https://www.vrwbg.com:8080/mini/create-bp',
    method:'GET',//默认
    data:{
      openId: openId,
      pName:pName,
      cName:cName,
    },
    header: {
      'content-type': 'application/json' // 默认值
    },
    success: function (res) {
      rName = res.data.rName;
      console.log("获取到的rName：" + res.data.rName);
    }
  })
  return rName;
}

module.exports = {
  formatTime: formatTime,
  createBp: createBp,
  createCp: createCp

}



