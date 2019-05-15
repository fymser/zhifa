// pages/subPages/Welfare/project/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //图片宽高自适应
    images: {},
    imgList: [{
      imgSrc: "http://hb.zhifa08.com/important_img/Welfare/rules_01.png"
    },
    {
      imgSrc: "http://hb.zhifa08.com/important_img/Welfare/rules_02.png"
    }
    ]

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

  imageLoad: function (e) {
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    var viewWidth = 750, //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 750 / ratio; //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        windowHeight: app.globalData.windowHeight,
        screenHeight: app.globalData.screenHeight
      })
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