// pages/goods/index.js

var http = require('/../../utils/http.js')
var util = require('/../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:{
      
    },
    product_images: [

    ],
    product_params: [
      
    ],
    product_specifications: [
      
    ],
    autoplay: true,
    interval: 3000,
    duration: 1000,
    swiperCurrent: 0,
    tabAction: 'details',
    buyNumber: '',
    buyNumMax: 1000,
    buyNumMin: 1,
    hideShopPopup: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this
    if (options) {
      http.httpPost("/app/product/id", {PRODUCT_ID: options.id}, {}, function (res) {
        util.upperJSONKey(res.data)
        util.upperJSONKey(res.data.product)
        util.upperListKey(res.data.product_images)
        util.upperListKey(res.data.product_params)
        util.upperListKey(res.data.product_specifications)
        console.log(res.data)
        
        that.setData({
          product: res.data.product,
          product_images: res.data.product_images,
          product_params: res.data.product_params,
          product_specifications: res.data.product_specifications
        })
        WxParse.wxParse('article', 'html', res.data.product.product_detail, that, 5);
      })
    }
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
  
  },
  tabClick(e) {
    this.setData({
      tabAction: e.currentTarget.dataset.tab
    })
  },
  numJianTap: function () {
    if (this.data.buyNumber > this.data.buyNumMin) {
      var currentNum = this.data.buyNumber;
      currentNum--;
      this.setData({
        buyNumber: currentNum
      })
    }
  },
  numJiaTap: function () {
    if (this.data.buyNumber < this.data.buyNumMax) {
      var currentNum = this.data.buyNumber;
      currentNum++;
      this.setData({
        buyNumber: currentNum
      })
    }
  },
  tobuy: function () {
    this.setData({
      shopType: "tobuy"
    });
    this.bindGuiGeTap();
  },
  /**
   * 规格选择弹出框
   */
  bindGuiGeTap: function () {
    this.setData({
      hideShopPopup: false
    })
  },
  /**
   * 规格选择弹出框隐藏
   */
  closePopupTap: function () {
    this.setData({
      hideShopPopup: true
    })
  },
})