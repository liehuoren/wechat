// pages/classify/index.js

var http = require('/../../utils/http.js')
var util = require('/../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    goods: {
      product_list: [
        
      ],
      page: {
        showCount: 10,
        totalPage: '',
        totalResult: '',
        currentPage: 1,
        currentResult: 10
      }
    },
    prompt: {
      hidden: !0
    },
    inputShowed: false,
    inputVal: "",
    value: '全部',
    pro_type: [],
    ping_type: [],
    selectPro: '-1',
    selectPing: '-1',
    deviceHeight: '500'

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getProType()
    this.getPingType()
    this.getProducts(1, 10)
  },
  showInput: function () {
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  },
  changeTab(e) {
    this.setData({
      selectPro: e.currentTarget.dataset.index
    });
    this.getProducts(1, 10)
  },
  getProType() {
    var that = this
    http.httpPost('/app/common/dic/subcollection', { code: 'PRO_TYPE'},{},function(res){
      if(res.code == '000000') {
        util.upperListKey(res.data)
        that.setData({
          pro_type: res.data
        })
      }
    })
  },
  getPingType() {
    var that = this
    http.httpPost('/app/common/dic/subcollection', { code: 'PING_TYPE' }, {}, function (res) {
      if (res.code == '000000') {
        util.upperListKey(res.data)
        that.setData({
          ping_type: res.data
        })
      }
    })
  },
  selectPing() {
    var that = this
    var itemList = ['全部']
    for(var i=0;i< this.data.ping_type.length;i++){
      itemList.push(this.data.ping_type[i].name)
    }
    wx.showActionSheet({
      itemList: itemList,
      success: function (res) {
        if (!res.cancel) {
          that.setData({
            selectPing: res.tapIndex - 1
          })
          that.getProducts(1, 10)
        }
      }
    });
  },
  getProducts(currentPage, showCount) {
    var that = this
    var data = {
      currentPage: currentPage, 
      showCount: showCount
    }
    if (this.data.selectPro != '-1' && this.data.selectPro != -1) {
      data.BRAND_ID = this.data.pro_type[this.data.selectPro].bianma
    }
    if (this.data.selectPing != '-1' && this.data.selectPing != -1) {
      data.PRODUCT_TYPE_ID = this.data.ping_type[this.data.selectPing].bianma
    }
    http.httpPost("/app/product/list", data, {}, function (res) {
      if(res.code == '000000') {
        util.upperJSONKey(res.data)
        util.upperListKey(res.data.project_list)
        if (currentPage == 1) {
          var product_list = res.data.project_list
        } else {
          var product_list = that.data.goods.product_list.concat(res.data.project_list)
        }
        var deviceHeight = product_list.length * 132
        var page = res.data.page
        var goods = { product_list, page }
        that.setData({
          goods: goods,
          deviceHeight: deviceHeight
        })
      }
    })
  },
  getMoreGoods() {
    if (this.data.goods.page.currentPage < this.data.goods.page.totalPage) {
      var nextPage = this.data.goods.page.currentPage + 1
      this.getProducts(nextPage, this.data.goods.page.showCount)
    }
  },
  goodDetails(e) {
    wx.navigateTo({
      url: '/pages/goods/index?id=' + e.currentTarget.dataset.id,
    })
  },
})