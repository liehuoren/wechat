// pages/goods/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:{
      product_id: '1',
      product_name: '公牛开关插座86型暗装饰墙壁电源面板三五孔电脑电视 珠光白',
      surplus: '100',
      sell_month: '50',
      price_range: '56.0',
      product_images: [
        { img_url: '/images/goods1.png' },
        { img_url: '/images/goods2.png' },
        { img_url: '/images/goods3.png' },
        { img_url: '/images/goods4.png' },
        { img_url: '/images/goods5.png' },
      ],
      product_params: [
        { param_id: '1', param_name: '' },
        { param_id: '1', param_name: '' }
      ],
      product_specifications: [
        { specification_id: '1', specification_name: '', specification_price: '' },
        { specification_id: '1', specification_name: '', specification_price: '' },
        { specification_id: '1', specification_name: '', specification_price: '' }
      ]
    },
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