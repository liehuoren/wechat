var http = require('/../../utils/http.js')
var util = require('/../../utils/util.js')
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banners: [
      
    ],
    autoplay: true,
    interval: 3000,
    duration: 1000,
    swiperCurrent: 0,
    videoUrl: "",
    companyInfomation: "",
    tabAction: "video",
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
      hidden: true
    }
  },
  
  onLoad: function () {
    var that = this
    http.httpPost("/app/home/top", '', {}, function (res) {
      util.upperJSONKey(res.data)
      util.upperListKey(res.data.banner_list)
      that.setData({
        banners: res.data.banner_list,
        companyInfomation: res.data.company_infomation,
        videoUrl: res.data.video_url
      })
    })
    that.getHotproducts(1, 5)
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  toSearch () {
    wx.navigateTo({
      url: '/pages/search/index'
    })
  },
  tabClick (e) {
    this.setData({
      tabAction: e.currentTarget.dataset.tab
    })
  },
  swiperchange: function (e) {
    //console.log(e.detail.current)
    this.setData({
      swiperCurrent: e.detail.current
    })
  },
  more () {
    if (this.data.goods.page.currentPage < this.data.goods.page.totalPage) {
      var nextPage = this.data.goods.page.currentPage + 1
      this.getHotproducts(nextPage, this.data.goods.page.showCount)
    }
  },
  goodDetails (e) {
    console.log(e)
    wx.navigateTo({
      url: '/pages/goods/index?id=' + e.currentTarget.dataset.id,
    })
  },
  getHotproducts(currentPage, showCount) {
    var that = this
    http.httpPost("/app/home/hotproducts", { currentPage: currentPage, showCount: showCount}, {}, function (res) {
      util.upperJSONKey(res.data)
      util.upperListKey(res.data.hot_project_list)
      var product_list = that.data.goods.product_list.concat(res.data.hot_project_list)
      var page = res.data.page
      var goods = { product_list, page }
      that.setData({
        goods: goods
      })
    })
  },
  onPullDownRefresh: function () {
    var that = this
    http.httpPost("/app/home/top", '', {}, function (res) {
      util.upperJSONKey(res.data)
      util.upperListKey(res.data.banner_list)
      that.setData({
        banners: res.data.banner_list,
        companyInfomation: res.data.company_infomation,
        videoUrl: res.data.video_url
      })
    })
    that.getHotproducts(1, 5)
  }
  
})
