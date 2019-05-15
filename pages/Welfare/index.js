//logs.js
// const util = require('../../utils/util.js')

Page({
  data: {
    list: [
      {
        name: "blue",
        txt: "雍禾简介",
        go:"/pages/subPages/Welfare/introduction/index"
      },
      {
        name: "green",
        txt: "活动福利",
        go: "/pages/subPages/Welfare/project/index"
      },
      {
        name: "yellow",
        txt: "真实案例",
        go: "/pages/subPages/Welfare/case/index"
      },
      {
        name: "purple",
        txt: "预约免费检测",
        go: "/pages/subPages/Welfare/online/index"
      },
    ]
  },
  //分享
  onShareAppMessage: function () {
    return {
      title: '五月程序员植发优惠季',
      desc: 'Star本项目享受植发优惠资格，最高享8折优惠!',
      path: "pages/index/index",
      imageUrl: "http://hb.zhifa08.com/important_img/banner/banner_01.png"
    }
  },
  onLoad: function () {
    this.setData({
      
    })
  },
  goNext:function(event){
    var goSrc = event.currentTarget.dataset.src;
    wx.navigateTo({
      url: goSrc
    })
    
  }
})
