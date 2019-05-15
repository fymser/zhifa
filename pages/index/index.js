//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    userInfo: {},
    hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo'),
    list: [{
        txt: "【趣味科普】脱发的幕后黑手",
        img: "http://hb.zhifabbs.cn/important_img/index/1.jpg",
        // 对应点赞数
        up: "238",
        // 对应点赞icon样式
        active: "",
        // 是否点过赞
        collected: 0,
      },
      {
        txt: "【趣味科普】无毛之地的自我救赎",
        img: "http://hb.zhifabbs.cn/important_img/index/2.jpg",
        up: "36",
        active: "",
        collected: 0,
      },
      {
        txt: "【趣味科普】植发前的各种疑问，这些你知道吗？",
        img: "http://hb.zhifabbs.cn/important_img/index/3.jpg",
        up: "105",
        active: "",
        collected: 0,
      },
      {
        txt: "【趣味科普】关于植发手术，这些你一定要看！",
        img: "http://hb.zhifabbs.cn/important_img/index/4.jpg",
        up: "84",
        active: "",
        collected: 0,
      },
      {
        txt: "【趣味科普】植发后护理，这些同样重要！",
        img: "http://hb.zhifabbs.cn/important_img/index/5.jpg",
        up: "93",
        active: "",
        collected: 0,
      },
      {
        txt: "【趣味科普】不要因为害怕这些，就忍受了脱发!",
        img: "http://hb.zhifabbs.cn/important_img/index/6.jpg",
        up: "346",
        active: "",
        collected: 0,
      },
      {
        txt: "【趣味科普】产后脱发几近崩溃，还有法子吗?",
        img: "http://hb.zhifabbs.cn/important_img/index/7.jpg",
        up: "49",
        active: "",
        collected: 0,
      },
      {
        txt: "【趣味科普】治脱发也有保险，你敢买吗？",
        img: "http://hb.zhifabbs.cn/important_img/index/8.jpg",
        up: "37",
        active: "",
        collected: 0,
      },
    ],
    bannerimg: [{
      imgSrc: "http://hb.zhifa08.com/important_img/banner/banner_01.png",
    }, ]
  },
  // 更改点赞状态
  onCollectionTap: function(event) {
    // 获取当前点击下标
    var index = event.currentTarget.dataset.index;
    // data中获取列表
    var message = this.data.list;
    for (let i in message) { //遍历列表数据
      if (i == index) { //根据下标找到目标
        var collectStatus = false
        if (message[i].collected == 0) { //如果是没点赞+1
          collectStatus = true
          message[i].collected = parseInt(message[i].collected) + 1
          message[i].up = parseInt(message[i].up) + 1
          message[i].active = "icon_active"
        } else {
          collectStatus = false
          message[i].collected = parseInt(message[i].collected) - 1
          message[i].up = parseInt(message[i].up) - 1
          message[i].active = ""
        }
        wx.showToast({
          title: collectStatus ? '点赞成功' : '取消点赞',
        })
      }
    }
    this.setData({
      list: message
    })
  },
  //分享
  onShareAppMessage: function () {
    return {
      title: '五月程序员植发优惠季',
      desc: 'Star本项目享受植发优惠资格，最高享8折优惠!',
      path: "pages/index/index",
      imageUrl:"http://hb.zhifa08.com/important_img/banner/banner_01.png"
    }
  },
  // 页面跳转
  goDetails: function(event) {
    // 获取当前点击下标
    var index = event.currentTarget.dataset.index + 1;
    wx.navigateTo({
      url: '../subPages/index/00' + index + "/index"　 //跳转对应详情页 首页对应板块分别对应001-008页面
    })
  },
  // banner跳转活动页面
  goProject:function(){
    wx.navigateTo({
      url: "/pages/subPages/Welfare/project/index"　
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      // url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
})