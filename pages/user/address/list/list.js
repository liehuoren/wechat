// pages/user/address/list/list.js

var http = require('/../../../../utils/http.js')
var util = require('/../../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [

    ]
  },
  add() {
    wx.navigateTo({
      url: '/pages/user/address/add/add'
    })
  },
  edit(num) {
    wx.navigateTo({
      url: '/pages/user/address/edit/edit'
    })
  },
  delete(num) {
    wx.showModal({
      title: '删除地址',
      content: '确认删除地址？',
      confirmText: "确认",
      confirmColor: "#ffaa2b",
      cancelText: "返回",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  checkDefault(e) {
    var address = this.data.address
    for(var item of address) {
      if (e.currentTarget.dataset.id == item.address_id) {
        if (item.is_default == 0) {
          item.is_default = 1
          this.updateAddress(item)
        }
      } else {
        if(item.is_default == 1) {
          item.is_default = 0
          this.updateAddress(item)
        }
      }
      util.upperJSONKey(item)
    }
    this.setData({
      address: address
    })
    console.log(this.data.address)
  },
  updateAddress (address) {
    var data = util.lowerJSONKey(address)
    http.httpPost('/app/user/address/edit',data,{},function(res){
      if(res.code == '000000') {

      }
    })
  }, 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    http.httpPost('/app/user/address/list','',{},function(res){
      if (res.code == '000000') {
        // util.upperJSONKey(res.data)
        util.upperListKey(res.data)
        console.log(res.data)
        that.setData({
          address: res.data
        })
      } else {

      }
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