// pages/user/address/edit/edit.js

var http = require('/../../../../utils/http.js')
var util = require('/../../../../utils/util.js')
var area = require('/../../../../utils/area.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    provinces: [],
    citys: [],
    districts: [],
    selProvince: '请选择',
    selCity: '请选择',
    selDistrict: '请选择',
    address: {},
    area: []
  },

  initArea(level, code) {
    var that = this
    if(level == 1) {
      var pinkArray = []
      http.httpPost('/app/common/area/subcollection', '', {}, function (res) {
        if (res.code == '000000') {
          util.upperListKey(res.data)
          for (let item of res.data) {
            pinkArray.push(item)
          }
          that.setData({
            provinces: pinkArray
          })
        }
      })
    } else if(level == 2) {
      var pinkArray = []
      http.httpPost('/app/common/area/subcollection', { id: code }, {}, function (res) {
        if (res.code == '000000') {
          util.upperListKey(res.data)
          for (let item of res.data) {
            pinkArray.push(item)
          }
          that.setData({
            citys: pinkArray
          })
        }
      })
    } else if (level == 3) {
      var pinkArray = []
      http.httpPost('/app/common/area/subcollection', { id: code }, {}, function (res) {
        if (res.code == '000000') {
          util.upperListKey(res.data)
          for (let item of res.data) {
            pinkArray.push(item)
          }
          that.setData({
            districts: pinkArray
          })
        }
      })
    }
  },
  getArea(code) {
    var that = this
    http.httpPost('/app/common/area/id', { id: code }, {}, function (res) {
      if (res.code == '000000') {
        util.upperJSONKey(res.data)
        if (res.data.level == 1) {
          that.setData({
            selProvince: res.data
          })
        } else if(res.data.level == 2) {
          that.setData({
            selCity: res.data
          })
        } else if (res.data.level == 3) {
          that.setData({
            selDistrict: res.data
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var address = JSON.parse(options.address)
    this.setData({
      address: address,
    })
    console.log(address)
    this.initArea(1, null)
    this.initArea(2, address.provinc_id)
    this.initArea(3, address.city_id)
    this.getArea(address.provinc_id)
    this.getArea(address.city_id)
    this.getArea(address.county_id)
  },
  bindPickerProvinceChange(e) {
    let selProvince = this.data.provinces[e.detail.value]
    this.initArea(2, selProvince.id)
    this.setData({
      selProvince: selProvince,
      selCity: '请选择',
      selDistrict: '请选择'
    })
  },
  bindPickerCityChange(e) {
    let selCity = this.data.citys[e.detail.value]
    this.initArea(3, selCity.id)
    this.setData({
      selCity: selCity,
      selDistrict: '请选择'
    })
  },
  bindPickerChange(e) {
    let selDistrict = this.data.districts[e.detail.value]
    this.setData({
      selDistrict: selDistrict
    })
  },
  submitForm(e) {
    var address = e.detail.value
    var reg = /^((17[0-9])|(14[0-9])|(13[0-9])|(15[0-9])|(18[0-9]))\d{8}$/
    if(!address.take_by) {
      wx.showToast({
        title: '收货人不能为空',
        icon: 'none',
        duration: 2000
      });
      return false
    } else if (!reg.test(address.tel)) {
      wx.showToast({
        title: '联系电话格式不正确',
        icon: 'none',
        duration: 2000
      });
      return false
    } else if (!address.provinc_id || !address.city_id || !address.county_id) {
      wx.showToast({
        title: '请选择所在地区',
        icon: 'none',
        duration: 2000
      });
      return false
    } else if(!address.address) {
      wx.showToast({
        title: '请填写详细地址',
        icon: 'none',
        duration: 2000
      });
      return false
    } else {
      address.is_default = address.is_default ? 1 : 0
      address.address_id = this.data.address.address_id
      util.lowerJSONKey(address)
      http.httpPost('/app/user/address/edit', address, {}, function (res) {
        if (res.code == '000000') {
          wx.showToast({
            title: '更新成功',
            icon: 'success',
            duration: 2000
          });
        } else {
          wx.showToast({
            title: '更新失败',
            icon: 'none',
            duration: 2000
          });
        }
      })
    }
    
  }
})