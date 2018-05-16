// pages/order/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: 0,
    navList: [],
    order: {
      items: [
        { id: 1, active: '已下单', createtime: '2018-3-25 11:30', image_url: '/images/goods.png', title: '公牛开关插座86型暗装饰墙壁电源 面板三五孔电脑墙壁电源插座面板', name: '小张五金的客户', total: '1', total_price: '56', address: '上海市杨浦区昆明路518号北美广场A座1020室'},
        { id: 2, active: '已配送', createtime: '2018-3-25 11:30', image_url: '/images/goods.png', title: '公牛开关插座86型暗装饰墙壁电源 面板三五孔电脑墙壁电源插座面板', name: '小张五金的客户', total: '2', total_price: '112', address: '上海市杨浦区昆明路518号北美广场A座1020室' }
      ],
      page: {
        total: 1
      }
    },
    prompt: {
      hidden: !0,
      icon: '../../../images/iconfont-order-default.png',
      title: '您还没有相关的订单',
      text: '可以去看看有哪些想买的',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.hideTabBar();
    this.setData({
      navList: [
        {
          name: '全部',
          _id: 'all',
        },
        {
          name: '已下单',
          _id: 'submitted',
        },
        {
          name: '已配送',
          _id: 'confirmed',
        },
        {
          name: '已结算',
          _id: 'finished',
        }
      ]
    })
  },
  onTapTag(e) {
    if (e.currentTarget.dataset.index == 3) {
      this.setData({
        activeIndex: e.currentTarget.dataset.index,
        order: {
          items: [
            
          ],
          page: {
            total: 0
          }
        },
      })
    } else if (e.currentTarget.dataset.index == 2) {
      this.setData({
        activeIndex: e.currentTarget.dataset.index,
        order: {
          items: [
            { id: 2, active: '已配送', createtime: '2018-3-25 11:30', image_url: '/images/goods.png', title: '公牛开关插座86型暗装饰墙壁电源 面板三五孔电脑墙壁电源插座面板', name: '小张五金的客户', total: '2', total_price: '112', address: '上海市杨浦区昆明路518号北美广场A座1020室' }
          ],
          page: {
            total: 1
          }
        },
      })
    } else if (e.currentTarget.dataset.index == 1) {
      this.setData({
        activeIndex: e.currentTarget.dataset.index,
        order: {
          items: [
            { id: 2, active: '已下单', createtime: '2018-3-25 11:30', image_url: '/images/goods.png', title: '公牛开关插座86型暗装饰墙壁电源 面板三五孔电脑墙壁电源插座面板', name: '小张五金的客户', total: '2', total_price: '112', address: '上海市杨浦区昆明路518号北美广场A座1020室' }
          ],
          page: {
            total: 1
          }
        },
      })
    } else {
      this.setData({
        activeIndex: e.currentTarget.dataset.index,
        order: {
          items: [
            { id: 2, active: '已配送', createtime: '2018-3-25 11:30', image_url: '/images/goods.png', title: '公牛开关插座86型暗装饰墙壁电源 面板三五孔电脑墙壁电源插座面板', name: '小张五金的客户', total: '2', total_price: '112', address: '上海市杨浦区昆明路518号北美广场A座1020室' },
            { id: 2, active: '已下单', createtime: '2018-3-25 11:30', image_url: '/images/goods.png', title: '公牛开关插座86型暗装饰墙壁电源 面板三五孔电脑墙壁电源插座面板', name: '小张五金的客户', total: '2', total_price: '112', address: '上海市杨浦区昆明路518号北美广场A座1020室' }
          ],
          page: {
            total: 1
          }
        },
      })
    }
    
  }
})