// pages/classify/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    goods: {
      product_list: [
        { product_id: '1', product_image: '/images/goods.png', product_name: '潜水艇洗衣机专用地漏卫生间淋 浴房阳台地面双排漏水器', price_range: '56.0', surplus: '999', sell_month: '999' },
        { product_id: '2', product_image: '/images/goods.png', product_name: '潜水艇洗衣机专用地漏卫生间淋 浴房阳台地面双排漏水器', price_range: '56.0', surplus: '999', sell_month: '999' },
        { product_id: '3', product_image: '/images/goods.png', product_name: '潜水艇洗衣机专用地漏卫生间淋 浴房阳台地面双排漏水器', price_range: '56.0', surplus: '999', sell_month: '999' },
      ],
      page: {
        showCount: 10,
        totalPage: 2,
        totalResult: 18,
        currentPage: 1,
        currentResult: 10
      }
    },
    prompt: {
      hidden: !0
    },
    classify: [
      { name: '全部', id: '1' },
      { name: '灯具', id: '2' },
      { name: '五金', id: '3' },
      { name: '劳保', id: '4' }
    ],
    inputShowed: false,
    inputVal: "",
    value: '全部'
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
      inputVal: e.detail.value
    });
  },
  changeTab(e) {
    this.setData({
      activeIndex: e.currentTarget.dataset.index
    });
  }
})