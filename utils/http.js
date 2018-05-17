var root = 'https://smallapi.ittun.com';
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
    url: root + url,
    data: data,
    dataType: 'json',
    method: 'POST',
    success: (res) => {
      typeof cb == "function" && cb(upperJSONKey(res.data), "");
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
function upperJSONKey(jsonObj) {
  for (var key in jsonObj) {
    if (Array.isArray(jsonObj[key]) || Object.keys(jsonObj[key]).length > 1) {
      jsonObj[key] = upperJSONKey(jsonObj[key])
    }
    jsonObj["\"" + key.toLowerCase() + "\""] = jsonObj[key];
    delete (jsonObj[key]);
  }
  return jsonObj;
};

module.exports = {
  httpGet: Get,
  httpPost: Post,
  httpUpload: Upload
};