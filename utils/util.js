
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
    method: 'GET',
    data:{
      ename: eName,
      cname: cName,
      mname: mName,
      openId:openId
    },
    // 获取图片名成功回调
    success: function (res) {
      rName=res.data.rName;
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
    method:'GET',
    data:{
      pName:pName,
      cName:cName,
      openId:openId
    },
    success: function (res) {
      rName = res.data.rName;
    }
  })
  return rName;
}

module.exports = {
  formatTime: formatTime,
  createBp: createBp,
  createCp: createCp

}



