// pages/user/address/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {
      
    }
  },
  add() {
    wx.navigateTo({
      url: '/pages/user/address/add/add'
    })
  },
  edit(num) {
    wx.navigateTo({
      url: '/pages/user/address/edit/edit'
    })
  },
  delete(num) {
    wx.showModal({
      title: '删除地址',
      content: '确认删除地址？',
      confirmText: "确认",
      confirmColor: "#ffaa2b",
      cancelText: "返回",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
        } else {
          console.log('用户点击辅助操作')
        }
      }
    });
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
  
  }
})