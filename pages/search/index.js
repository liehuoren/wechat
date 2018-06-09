// pages/search/index.js
var http = require('/../../utils/http.js')
var util = require('/../../utils/util.js')

Page({

  data: {
    inputShowed: true,
    inputVal: "",
    goods: {
      product_list: [

      ],
      page: {
        showCount: '',
        totalPage: '',
        totalResult: '',
        currentPage: '',
        currentResult: ''
      }
    },
    prompt: {
      hidden: !0,
      icon: '/images/cart-empty.png',
      title: '暂无相关商品',
      buttons: [
        {
          text: '随便逛'
        },
      ],
    },
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
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
      inputVal: e.detail.value.replace(/\s+/g, '')
    });
  },
  search() {
    if (this.data.inputVal == '') {
      wx.showToast({
        title: '请输入关键词',
        icon: 'none',
        duration: 2000
      })
    }
    var that = this
    var data = {
      currentPage: 1,
      showCount: 20,
      KEYWORDS: this.data.inputVal
    }
    wx.showLoading({
      title: '加载中',
    })
    http.httpPost("/app/product/list", data, {}, function (res) {
      wx.hideLoading()
      util.upperJSONKey(res.data)
      let prompt = that.data.prompt
      
      if (res.data.project_list.length != 0) {
        prompt.hidden = !0
        util.upperListKey(res.data.project_list)
        var product_list = res.data.project_list
        var page = res.data.page
      } else {
        prompt.hidden = 0
        var product_list = []
        var page = {}
      }
      that.setData({
        goods: { product_list, page},
        prompt: prompt
      })
    })
  },
  goTo() {
    wx.navigateTo({
      url: '/pages/order/list/list'
    })
  },
  onPullDownRefresh: function () {
    var that = this
    if (this.data.goods.page.currentPage < this.data.goods.page.totalPage)
    var data = {
      currentPage: this.data.goods.page.currentPage++,
      showCount: 20,
      KEYWORDS: this.data.inputVal
    }
    wx.showLoading({
      title: '加载中',
    })
    http.httpPost("/app/product/list", data, {}, function (res) {
      wx.hideLoading()
      util.upperJSONKey(res.data)
      var product_list = that.data.goods.product_list.concat(res.data.project_list)
      var page = res.data.page

      that.setData({
        goods: { product_list, page }
      })
    })
  }
})