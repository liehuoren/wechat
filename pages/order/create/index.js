// pages/order/create/index.js

var http = require('/../../../utils/http.js')
var util = require('/../../../utils/util.js')
var area = require('/../../../utils/area.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    address: null,
    totalPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'cart',
      success: function (res) {
        let prices = 0;
        for(let item of res.data) {
          prices += item.amount * item.price
        }
        that.setData({
          goods: res.data,
          totalPrice: prices
        })
      }
    })
    
  },
  addAddress() {
    wx.navigateTo({
      url: '/pages/user/address/add/add?select=0',
    })
  },
  selectAddress() {
    wx.navigateTo({
      url: '/pages/user/address/list/list?select=1' ,
    })
  },
  onShow: function (options) {
    var that = this
    http.httpPost('/app/user/address/list', '', {}, function (res) {
      if (res.code == '000000') {
        util.upperListKey(res.data)
        if (res.data != null) {
          for (let item of res.data) {
            if (item.is_default) {
              that.setData({
                address: item
              })
            }
          }
          if (that.data.address == null) {
            that.setData({
              address: res.data[0]
            })
          }
        }
      }
    })
  },
  saveOrder() {
    if (this.data.address != null && this.data.goods.length > 0) {
      var that = this
      var SHOPPINGCART_IDS = ''
      for (let item of this.data.goods) {
        SHOPPINGCART_IDS += item.shoppingcart_id + ','
      }
      var ADDRESS_ID = this.data.address.address_id
      console.log(this.data.address)
      var data = {
        SHOPPINGCART_IDS,
        ADDRESS_ID
      }
      wx.showModal({
        title: '提示',
        content: '确认提交订单',
        confirmText: "确认",
        cancelText: "取消",
        confirmColor: '#ff9f10',
        success: function (res) {
          if (res.confirm) {
            http.httpPost('/app/order/create', data, {}, function (res) {
              if (res.code == '000000') {
                wx.switchTab({
                  url: '/pages/order/list/list'
                })
              } else {
                wx.showToast({
                  title: res.msg,
                  icon: 'none',
                  duration: 2000
                });
              }
            })
          } else {
            console.log('用户点击辅助操作')
          }
        }
      });
      
    }
  }

})