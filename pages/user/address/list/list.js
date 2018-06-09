// pages/user/address/list/list.js

var http = require('/../../../../utils/http.js')
var util = require('/../../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [

    ],
    select: false
  },
  add() {
    wx.navigateTo({
      url: '/pages/user/address/add/add?select=' + this.data.select
    })
  },
  edit(e) {
    var index = e.currentTarget.dataset.index
    var address = JSON.stringify(this.data.address[index])
    wx.navigateTo({
      url: '/pages/user/address/edit/edit?address=' + address
    })
  },
  delete(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var ADDRESS_ID = that.data.address[index].address_id
    wx.showModal({
      title: '提示',
      content: '确认删除',
      confirmText: "确认",
      cancelText: "取消",
      confirmColor: '#ff9f10',
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          http.httpPost('/app/user/address/del', {
            ADDRESS_ID: ADDRESS_ID
          }, {}, function (ress) {
            if (ress.code == '000000') {
              that.data.address.splice(index, 1)
              that.setData({
                address: that.data.address
              })
            }
          })
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
  onLoad: function (option) {
    this.setData({
      select: option.select
    })
  },
  onShow: function (options) {
    var that = this
    http.httpPost('/app/user/address/list','',{},function(res){
      if (res.code == '000000') {
        // util.upperJSONKey(res.data)
        util.upperListKey(res.data)
        that.setData({
          address: res.data
        })
      }
    })
    
    
  },
  select(e){
    if(this.data.select == 1) {
      var address = this.data.address
      for (var item of address) {
        if (e.currentTarget.dataset.id == item.address_id) {
          if (item.is_default == 0) {
            item.is_default = 1
            this.updateAddress(item)
            
          }
        }
      }
      wx.navigateBack({})
    }
    
  }
})