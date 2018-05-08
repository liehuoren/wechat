var http = require('/../../utils/http.js')
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    banners: [
      {
        link_title: "专精品质，至诚服务",
        img_url: "/images/goods.png"
      },
      {
        link_title: "专精品质，至诚服务",
        img_url: "/images/goods.png"
      },
      {
        link_title: "专精品质，至诚服务",
        img_url: "/images/goods.png"
      },
    ],
    videoUrl: "",
    companyInfomation: ""
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
  }
  
})
