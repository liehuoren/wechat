// pages/cart/index.js
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
    carts: {
      items: [
        { id: 1, goods: { name: '潜水艇洗衣机专用地漏卫生间淋 浴房阳台地面双排漏水器', price: '56.0', thumb_url: '/images/goods.png' }, total: 10, amount: 56, totalAmount: 560},
        { id: 2, thumb_url: '/images/goods.png', goods: { name: '潜水艇洗衣机专用地漏卫生间淋 浴房阳台地面双排漏水器', price: '56.0', thumb_url: '/images/goods.png' }, total: 10, amount: 56, totalAmount: 560 }
      ]
    },
    shoppingcart_list: [
      { product_image: '/images/goods1.png', product_id: 1, product_name: '浴房阳台地面双排漏水器', price: '56.0', specification_name: 'G20珍珠白', amount: 15, shoppingcart_id: 1 },
      { product_image: '/images/goods2.png', product_id: 2, product_name: '浴房阳台地面双排漏水器', price: '56.0', specification_name: 'G20珍珠白', amount: 10, shoppingcart_id: 2 },
      { product_image: '/images/goods3.png', product_id: 3, product_name: '浴房阳台地面双排漏水器', price: '56.0', specification_name: 'G20珍珠白', amount: 1, shoppingcart_id: 3 },
    ],
    canEdit: false,
    buyNumber: '',
    buyNumMax: 1000,
    buyNumMin: 1,
    checkedAll: false,
    allPrice: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  goShop () {
    wx.navigateTo({
      url: '/pages/order/list/list'
    })
  },
  numJianTap: function (e) {
    var checkboxItems = this.data.shoppingcart_list, value = e.currentTarget.dataset.id;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if (checkboxItems[i].product_id == value) {
        if (checkboxItems[i].amount > this.data.buyNumMin) {
          checkboxItems[i].amount--;
          this.setData({
            shoppingcart_list: checkboxItems
          })
        }
        break;
      }
    }
  },
  numJiaTap: function (e) {
    console.log(e.currentTarget.dataset.id)
    var checkboxItems = this.data.shoppingcart_list, value = e.currentTarget.dataset.id;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      if (checkboxItems[i].product_id == value) {
        if (checkboxItems[i].amount < this.data.buyNumMax) {
          checkboxItems[i].amount++;
          this.setData({
            shoppingcart_list: checkboxItems
          })
        }
        break;
      }
    }
    
  },
  checkboxChange: function (e) {

    var checkboxItems = this.data.shoppingcart_list, values = e.detail.value;
    for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
      checkboxItems[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (checkboxItems[i].product_id == values[j]) {
          checkboxItems[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      shoppingcart_list: checkboxItems
    });
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
  }

})
