var http = require('/../../utils/http.js')
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banners: [
      {
        link_title: "专精品质，至诚服务",
        img_url: "/images/index-bar.png"
      },
      {
        link_title: "专精品质，至诚服务",
        img_url: "/images/index-bar.png"
      },
      {
        link_title: "专精品质，至诚服务",
        img_url: "/images/index-bar.png"
      },
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
      hidden: !0
    }
  },
  
  onLoad: function () {
    http.httpGet("/app/home/top",{},function(res){
      console.log(res)
    })
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
    
  }
  
})
