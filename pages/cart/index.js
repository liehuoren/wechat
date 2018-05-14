// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prompt: {
      hidden: 0,
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
    canEdit: false
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
  }

})