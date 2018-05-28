//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var MID = wx.getStorageSync('MID') || ''
    var SOCKET = wx.getStorageSync('SOCKET') || ''
    var userInfo = wx.getStorageSync('userInfo') || ''
    if (userInfo) {
      this.globalData.userInfo = JSON.parse(userInfo)
      this.globalData.header.MID = this.globalData.userInfo.member_id
      this.globalData.header.SOCKET = this.globalData.userInfo.socket
    }
    console.log(this.globalData.userInfo)
    if (this.globalData.userInfo) {
      
    }
  },
  globalData: {
    userInfo: null,
    header: {
      'MID': '',
      'SOCKET': '',
      'content-type': 'application/x-www-form-urlencoded'
    }
  }
})