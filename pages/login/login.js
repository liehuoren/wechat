var http = require('/../../utils/http.js')
var util = require('/../../utils/util.js')

const app = getApp()
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mobile: '',
    pwd: ''
  },

  bindMobilleInput (e) {
    this.setData({
      mobile: e.detail.value
    })
  },
  bindPwdInput (e) {
    this.setData({
      pwd: e.detail.value
    })
  },
  login () {

    let that = this
    var reg = /^((17[0-9])|(14[0-9])|(13[0-9])|(15[0-9])|(18[0,5-9]))\d{8}$/
    if (!reg.test(this.data.mobile)) {
      wx.showToast({
        title: '手机号码格式不正确',
        icon: 'none',
        duration: 2000
      });
      return false
    }
    var data = {
      mobile: this.data.mobile,
      pwd: this.data.pwd
    }

    http.httpPost("/app/user/login", data, {}, function (res) {
      if (res.code == '000000') {
        util.upperJSONKey(res.data)
        app.globalData.userInfo = res.data
        app.globalData.header.MID = res.data.member_id
        app.globalData.header.SOCKET = res.data.socket
        if (res.data.open_id == null || res.data.open_id == '') {
          that.bindUserWx()
        }
        var userInfo = JSON.stringify(res.data) + ''
        wx.setStorageSync(
          'userInfo', userInfo
        )
        wx.showToast({
          title: '登录成功',
          icon: 'success',
          duration: 2000,
          success: function (res) {
            wx.switchTab({
              url: '/pages/index/index'
            })
          }
        });
        
      } else {
        wx.showToast({
          title: '密码或账号错误',
          icon: 'none',
          duration: 2000
        });
      }

      
    })

  },
  bindUserWx() {
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          http.httpPost('/app/user/bindUserByCode',{code:res.code},{},function(ress){

          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    });
  },
  clearPhone() {
    var mobile = ''
    this.setData({
      mobile: mobile
    })
  },
  clearPassword() {
    this.setData({
      pwd: ''
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