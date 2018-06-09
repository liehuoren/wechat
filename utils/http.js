var root = 'http://smallapi.capsui.com'
var app = getApp()
function Get(url, data, header, cb) {
  wx.showLoading({
    title: '加载中'
  })
  wx.request({
    method: 'GET',
    url: root + url,
    data: data,
    header: Object.assign({}, app.globalData.header, header),
    success: (res) => {
      typeof cb == "function" && cb(res.data, "");
      wx.hideLoading()
    },
    fail: (err) => {
      typeof cb == "function" && cb(null, err.errMsg);
      wx.hideLoading()
    }
  });
};

function Post(url, data, header, cb) {
  wx.showLoading({
    title: '加载中'
  })
  wx.request({
    url: root + url,
    data: data,
    header: Object.assign({}, app.globalData.header, header),
    dataType: 'json',
    method: 'POST',
    success: (res) => {
      wx.hideLoading()
      if (res.data.code == 'ex8880000') {
        wx.clearStorage()
        wx.reLaunch({
          url: '/pages/login/login'
        })
      }
      typeof cb == "function" && cb(res.data, "");
    },
    fail: (err) => {
      wx.hideLoading()
      typeof cb == "function" && cb(null, err.errMsg);
      console.log(err)
    }
  });
};

function Upload(url, file, data, cb) {
  wx.uploadFile({
    url: root + url,
    filePath: file,
    name: "file",
    formData: data,
    success: (res) => {
      if (typeof (res.data) == "string") {
        typeof cb == "function" && cb(res.data, "");
      } else {
        typeof cb == "function" && cb(res.data, "");
      }

    },
    fail: (err) => {
      typeof cb == "function" && cb(null, err.errMsg);
    }
  });
};

module.exports = {
  httpGet: Get,
  httpPost: Post,
  httpUpload: Upload
};