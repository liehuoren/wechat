// pages/user/password/modifyPassword.js

var http = require('/../../../utils/http.js')
var util = require('/../../../utils/util.js')
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwd: '',
    newPwd: '',
    newPwdr: '',
    showTopTips: false,
    topTip: ''
  },
  pwdInput (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  newPwdInput (e) {
    this.setData({
      newPwd: e.detail.value
    })
  },
  newPwdrInput (e) {
    this.setData({
      newPwdr: e.detail.value
    })
  },

  confirm: function () {
    if (this.data.newPwd != this.data.newPwd) {
      this.data.showTopTips = true
      this.data.topTips = '密码不一致'
      return false;
    }
    http.httpPost('/app/user/pwd/edit',{mobile: app.globalData.userInfo.mobile, pwd: this.data.pwd, newPwd: this.data.newPwd}, {}, function(res) {
      if (res.code == '000000') {
        app.globalData.userInfo = ''
        wx.clearStorageSync()
        wx.showModal({
          title: '提示',
          content: '修改成功',
          confirmText: "确认",
          confirmColor: "#ffaa2b",
          cancelText: "返回",
          success: function (res) {
            this.data.showTopTips = false
            if (res.confirm) {
              console.log('用户点击主操作')
            } else {
              console.log('用户点击辅助操作')
            }
          }
        });
      } else {
        wx.showModal({
          title: '提示',
          content: '提交失败，请重试',
          confirmText: "确认",
          confirmColor: "#ffaa2b",
          cancelText: "返回",
          success: function (res) {
            this.data.showTopTips = false
            if (res.confirm) {
              console.log('用户点击主操作')
            } else {
              console.log('用户点击辅助操作')
            }
          }
        });
      }
      
    })
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})