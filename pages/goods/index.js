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
    buyNumber: 1,
    buyNumMax: 1000,
    buyNumMin: 1,
    hideShopPopup: true,
    selectSpecification:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    let that = this
    if (options) {
      http.httpPost("/app/product/id", { PRODUCT_ID: options.id}, {}, function (res) {
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
        console.log(res.data.product_specifications)
        WxParse.wxParse('article', 'html', res.data.product.product_detail, that, 5);
      })
    }
  },
  selectSpecification(e) {
    var index = e.currentTarget.dataset.index
    var that = this
    console.log(that.data.product_specifications[index])
    this.setData({
      selectSpecification: that.data.product_specifications[index]
    })
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
  addCart() {
    if (this.data.selectSpecification == '') {
      wx.showToast({
        title: '请选择商品规格',
        icon: 'none',
        duration: 2000
      });
    } else if (this.data.buyNumber == '') {
      wx.showToast({
        title: '请选择购买数量',
        icon: 'none',
        duration: 2000
      });
    } else {
      var data = {
        'PRODUCT_ID': this.data.product.product_id,
        'PRODUCT_SPECIFICATION_ID': this.data.selectSpecification.specification_id,
        'AMOUNT': this.data.buyNumber
      }
      http.httpPost('/app/shoppingcart/create',data,{},function(res){
        if(res.code == '000000') {
          wx.showModal({
            title: '购买成功',
            content: '您的商品已加入进货单，请选择继续购物或结算',
            confirmText: "提交订单",
            cancelText: "继续购物",
            success: function (res) {
              console.log(res);
              if (res.confirm) {
                wx.switchTab({
                  url: '/pages/cart/index'
                })
              } else {
                wx.navigateTo({
                  url: '/pages/classify/index'
                })
              }
            }
          })
        }else{
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 2000
          });
        }
      })
    }
  },
  goCart(e) {
    wx.switchTab({
      url: '/pages/cart/index'
    })
  }
})