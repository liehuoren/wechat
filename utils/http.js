var root = 'https://api-small.worktoapp.com';
function Get(url, data, cb) {
  wx.showNavigationBarLoading();
  wx.request({
    method: 'GET',
    url: root + url,
    data: data,
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

function Post(url, data, cb) {
  wx.request({
    method: 'POST',
    url: root + url,
    data: data,
    success: (res) => {
      typeof cb == "function" && cb(res.data, "");
    },
    fail: (err) => {
      typeof cb == "function" && cb(null, err.errMsg);
      console.log("http请求:" + config.HTTP_url);
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
        typeof cb == "function" && cb(JSON.parse(res.data), "");
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