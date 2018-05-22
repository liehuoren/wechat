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
      hidden: true
    }
  },
  
  onLoad: function () {
    
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
    
  },
  goodDetails (e) {
    wx.navigateTo({
      url: '/pages/goods/index',
    })
  },
  onLaunch: function () {
    var that = this
    http.httpPost("/app/home/top", '', {}, function (res) {
      util.upperJSONKey(res.data)
      util.upperListKey(res.data.banner_list)
      console.log(res.data.banner_list)
      that.setData({
        banners: res.data.banner_list,
        companyInfomation: res.data.company_infomation,
        videoUrl: res.data.video_url
      })
    })
  }
  
})
