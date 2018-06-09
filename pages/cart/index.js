// pages/cart/index.js
var http = require('/../../utils/http.js')
var util = require('/../../utils/util.js')
var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    prompt: {
      hidden: !0,
      icon: '/images/cart-empty.png',
      title: '购物车空空如也',
      text: '来挑几件好货吧',
      buttons: [
        {
          text: '随便逛',
          bindtap: 'goShop',
        },
      ],
    },
    shoppingcart_list: [
      
    ],
    canEdit: false,
    buyNumber: '',
    buyNumMax: 10000,
    buyNumMin: 1,
    checkedAll: false,
    allPrice: 0,
    page:{
      showCount: 10,
      totalPage: '',
      totalResult: '',
      currentPage: '',
      currentResult: ''
    }
  },

  onShow: function (options) {
    var data = {
      currentPage: 1,
      showCount: 10
    }
    this.getCarts(1, 10)
  },
  goTo () {
    wx.navigateTo({
      url: '/pages/order/list/list'
    })
  },
  numJianTap: function (e) {
    var checkboxItems = this.data.shoppingcart_list, value = e.currentTarget.dataset.id;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if (checkboxItems[i].shoppingcart_id == value) {
        if (checkboxItems[i].amount > this.data.buyNumMin) {
          checkboxItems[i].amount--;
          this.setData({
            shoppingcart_list: checkboxItems
          })
        }
        break;
      }
    }
    this.saveChange()
  },
  numJiaTap: function (e) {
    var checkboxItems = this.data.shoppingcart_list, value = e.currentTarget.dataset.id;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if (checkboxItems[i].shoppingcart_id == value) {
        if (checkboxItems[i].amount < this.data.buyNumMax) {
          checkboxItems[i].amount++;
          this.amountChange(checkboxItems[i].shoppingcart_id, checkboxItems[i].amount)
          this.setData({
            shoppingcart_list: checkboxItems
          })
        }
        break;
      }
    }
    this.saveChange()
    
  },
  checkboxChange: function (e) {
    console.log(e)
    var checkboxItems = this.data.shoppingcart_list, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].shoppingcart_id == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      shoppingcart_list: checkboxItems
    });
    this.saveChange()
  },
  checkAll () {
    if (this.data.checkedAll) {
      var checkboxItems = this.data.shoppingcart_list;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = false;
      }
      this.setData({
        shoppingcart_list: checkboxItems,
        checkedAll: false,
        allPrice: 0
      });
    } else {
      var checkboxItems = this.data.shoppingcart_list;
      var prices = 0;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        checkboxItems[i].checked = true;
        prices += checkboxItems[i].price * checkboxItems[i].amount
      }
      this.setData({
        shoppingcart_list: checkboxItems,
        checkedAll: true,
        allPrice: prices
      });
    }
  },
  delete(e) {
    var that = this
    var index = e.currentTarget.dataset.index
    var SHOPPINGCART_ID = that.data.shoppingcart_list[index].shoppingcart_id
    wx.showModal({
      title: '提示',
      content: '确认删除',
      confirmText: "确认",
      cancelText: "取消",
      confirmColor: '#ff9f10',
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          http.httpPost('/app/shoppingcart/del/id', {
            SHOPPINGCART_ID: SHOPPINGCART_ID},{},function(ress){
              if(ress.code == '000000') {
                that.data.shoppingcart_list.splice(index,1)
                that.setData({
                  shoppingcart_list: that.data.shoppingcart_list
                })
                that.saveChange()
              }
            })
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
  },
  saveChange() {
    if (this.data.shoppingcart_list.length == 0) {
      this.data.prompt.hidden = 0
      this.setData({
        allPrice: 0,
        prompt: this.data.prompt
      })
    } else {
      var checkboxItems = this.data.shoppingcart_list;
      var prices = 0;
      for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
        if (checkboxItems[i].checked) {
          prices += checkboxItems[i].price * checkboxItems[i].amount
        }
      }
      this.data.prompt.hidden = !0
      this.setData({
        allPrice: prices,
        prompt: this.data.prompt
      });
    }
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.page.currentPage < this.data.page.totalPage) {
      var nextPage = this.data.page.currentPage + 1
      this.getCarts(nextPage, this.data.page.showCount)
    }
  },
  getCarts(currentPage, showCount) {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    http.httpPost("/app/shoppingcart/list", { currentPage: currentPage, showCount: showCount }, {}, function (res) {
      if(res.code == '000000') {
        util.upperJSONKey(res.data)
        util.upperListKey(res.data.shoppingcart_list)
        if (currentPage == 1) {
          var shoppingcart_list = res.data.shoppingcart_list
        } else {
          var shoppingcart_list = that.data.shoppingcart_list.concat(res.data.shoppingcart_list)
        }
        
        var page = res.data.page
        that.setData({
          shoppingcart_list: shoppingcart_list,
          page: page
        })
        
      } else if (res.code == 'ex8880000') {
        wx.clearStorage()
        wx.reLaunch({
          url: '/pages/login/login'
        })
      }
      wx.hideLoading()
      that.saveChange()
    })
  },
  amountChange(id, amount) {
    http.httpPost('/app/shoppingcart/edit/id', { SHOPPINGCART_ID: id, AMOUNT: amount},{},function(res){
      
    })
  },
  toOrder() {
    wx.showLoading();
    if (this.data.shoppingcart_list.length == 0) {
      wx.hideLoading();
      return;
    }
    var checkboxItems = this.data.shoppingcart_list;
    var checked = [];
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if (checkboxItems[i].checked) {
        checked.push(checkboxItems[i])
      }
    }
    if (checked.length == 0){
      wx.hideLoading();
      return;
    } 
    wx.setStorage({
      key: "cart",
      data: checked
    })
    
    wx.navigateTo({
      url: '/pages/order/create/index'
    })
    wx.hideLoading();
  }

})
