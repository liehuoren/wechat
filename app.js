//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var MID = wx.getStorageSync('MID') || ''
    var SOCKET = wx.getStorageSync('SOCKET') || ''
    this.globalData.header = {
      'MID': MID,
      'SOCKET': SOCKET
    }
  },
  globalData: {
    userInfo: null,
    header: {

    }
  }
})