// pages/order/list/list.js
var http = require('/../../../utils/http.js')
var util = require('/../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    navList: [],
    order: {
      order_list: [
        
      ],
      page: {

      }
    },
    prompt: {
      hidden: !0,
      icon: '../../../images/cart-empty.png',
      title: '您还没有相关的订单',
      text: '可以去看看有哪些想买的',
    },
    navList: [
      {
        name: '全部',
        _id: 'all',
      },
      {
        name: '已下单',
        _id: 'submitted',
      },
      {
        name: '已配送',
        _id: 'confirmed',
      },
      {
        name: '已结算',
        _id: 'finished',
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.hideTabBar();
    this.getOrderList(1, 10)
  },
  onTapTag(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index,
    })
    this.getOrderList(1, 10)
  },
  getOrderList(currentPage,showCount) {
    var that = this
    var data = {
      currentPage: currentPage,
      showCount: showCount
    }
    if (this.data.activeIndex) {
      data.ORDER_STATUS = this.data.activeIndex
    }
    http.httpPost("/app/order/list", data, {}, function (res) {
      if (res.code == '000000') {
        util.upperJSONKey(res.data)
        
        
        if (res.data == null) {
          var order_list = []
          var page = that.data.order.page
        } else {
          util.upperListKey(res.data.order_list)
          for (let i = 0; i < res.data.order_list.length; i++) {
            util.upperListKey(res.data.order_list[i].detail_list)
          }
          if (currentPage == 1) {
            var order_list = res.data.order_list
          } else {
            var order_list = that.data.order.order_list.concat(res.data.order_list)
          }
          var page = res.data.page
        }
        
        
        
        var order = { order_list, page }
        
        that.setData({
          order: order
        })
        
      }
    })
  },
  orderDetail(e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/order/detail/detail'
    })
  }
})