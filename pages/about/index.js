// pages/about/index.js

var http = require('/../../utils/http.js')
var util = require('/../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    logo_url: '',
    person_name: '',
    tel_phone: '',
    information: '',
    address: '',
    lat:'',
    long: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    http.httpPost("/app/common/aboutus", '', {}, function (res) {
      util.upperJSONKey(res.data)
  
      that.setData({
        logo_url: res.data.logo_url,
        person_name: res.data.person_name,
        tel_phone: res.data.tel_phone,
        information: res.data.information,
        address: res.data.address,
        lat: res.data.lat,
        long: res.data.long
      })
    })
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