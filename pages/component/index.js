// pages/component/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    message: {
      isup: "点赞",
      // 对应点赞icon样式
      active: "",
      // 是否点过赞
      collected: 0,
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击报名 去留联页
    goMine: function(e) {
      wx.navigateTo({
        url: '/pages/subPages/Welfare/online/index',
      })
    },
    // 点赞
    onCollectionTap: function(event) {
      var idColl = event.currentTarget.dataset.collected
      var collectStatus = false
      var _message = this.data.message;
      if (idColl == 0) {
        collectStatus = true
        _message.isup = "已点赞",
          _message.active = "icon_active",
          _message.collected = 1
      } else if (idColl == 1) {
        collectStatus = false
        _message.isup = "点赞",
          _message.active = "",
          _message.collected = 0
      }
      this.setData({
        message: _message
      })
      wx.showToast({
        title: collectStatus ? '点赞成功' : '取消点赞',
      })
    },

  },
  //分享
  onShareAppMessage: function (res) {
    console.log(res)
    return {
      title: '五月程序员植发优惠季',
      desc: 'Star本项目享受植发优惠资格，最高享8折优惠!',
      path: "/pages/index/index",
      imageUrl: "http://hb.zhifa08.com/important_img/banner/banner_01.png",
    }
  },
})