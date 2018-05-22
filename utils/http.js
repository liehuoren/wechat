var root = 'https://smallapi.ittun.com';
var app = getApp()
function Get(url, data, header, cb) {
  wx.showNavigationBarLoading();
  wx.request({
    method: 'GET',
    url: root + url,
    data: data,
    header: Object.assign({}, app.globalData.header, header),
    success: (res) => {
      typeof cb == "function" && cb(res.data, "");
      wx.hideNavigationBarLoading();
    },
    fail: (err) => {
      typeof cb == "function" && cb(null, err.errMsg);
      wx.hideNavigationBarLoading();
    }
  });
};

function Post(url, data, header, cb) {
  wx.request({
    url: root + url,
    data: data,
    header: Object.assign({}, app.globalData.header, header),
    dataType: 'json',
    method: 'POST',
    success: (res) => {
      typeof cb == "function" && cb(res.data, "");
    },
    fail: (err) => {
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