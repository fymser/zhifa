// pages/subPages/Welfare/case/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //图片宽高自适应
    images: {},
    imgList: [{
      imgSrc: "http://hb.zhifa08.com/important_img/Welfare/check3/check_01.jpg",
      getPhoneF: ""

    }, {
      imgSrc: "http://hb.zhifa08.com/important_img/Welfare/check3/check_02.jpg",
      getPhoneF: ""

    }, {
      imgSrc: "http://hb.zhifa08.com/important_img/Welfare/check3/check_03.jpg",
      getPhoneF: ""

    }, {
      imgSrc: "http://hb.zhifa08.com/important_img/Welfare/check3/check_04.jpg",
      getPhoneF: ""

    }, {
      imgSrc: "http://hb.zhifa08.com/important_img/Welfare/check3/check_05.jpg",
      getPhoneF: ""

    }, {
      imgSrc: "http://hb.zhifa08.com/important_img/Welfare/check3/check_06.jpg",
      getPhoneF: ""

    }, {
      imgSrc: "http://hb.zhifa08.com/important_img/Welfare/check3/check_07.jpg",
      getPhoneF: ""

    }, {
      imgSrc: "http://hb.zhifa08.com/important_img/Welfare/check3/check_08.jpg",
      getPhoneF: ""

    }, {
      imgSrc: "http://hb.zhifa08.com/important_img/Welfare/check3/check_09.jpg",
      getPhoneF: ""

    }, {
      imgSrc: "http://hb.zhifa08.com/important_img/Welfare/check3/check_10.jpg",
      getPhoneF: ""

    }, ]

  },
  imageLoad: function(e) {
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
  //通过绑定手机号登录

  getPhoneNumber: function (e) {

    console.log(e);
    var ivObj = e.detail.iv
    var telObj = e.detail.encryptedData
    var codeObj = "";
    var that = this;

    //提示信息
    wx.showToast({ title: "提交中...", icon: 'success', duration: 800, })
    //执行Login
    wx.login({
      success: res => {
        console.log('code转换', res.code);
        //用code传给服务器调换session_key
        wx.request({

          url: 'https://bd.zhifa999.com/demo/getPhone.php', //接口请求地址，存放微信手机号解密文件的地址
          data: {
            appid: "wxcfe31278ee7e4b9c", //小程序appid，登录微信公众号后台查看
            secret: "ee41cfc5e0ca06ca4a770db936d526b6", //小程序secret，登录微信公众号后台可查看
            code: res.code,
            encryptedData: telObj,
            iv: ivObj
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          //成功返回数据
          success: function (res) {
            console.log(res);
            phoneObj = res.data.phoneNumber;
            //存储数据并准备发送给下一页使用
            wx.setStorage({
              key: "phoneObj",
              data: res.data.phoneNumber,
            })

            var phonenum = wx.getStorageSync('phoneObj');
            //console.log(phoneObj);
            if (phonenum != '') {

              //2秒后执行               
              setTimeout(function () {

                //手机号发送至后台
                wx.request({
                  //服务器地址,修改成织梦自定义表单模板地址
                  url: 'https://bd.zhifa999.com/plus/by_wx.php',
                  //数据 
                  data: {
                    //myphonenum是获取到的手机号 do，diyid，dede_fields，dede_fieldshash都是织梦生成自定义表单默认的参数，不可缺少，需要作为参数一起提交，实际的参数值需要在自定义完表单后查看生成的表单模板
                    input: phonenum,
                    diyid: '18',
                    do: '2',
                    type: 'wx1',
                    wx_fields: 'myphonenum,text;addtime,text',
                    wx_fieldshash: '7d2e6a5d216487fc9910167634b6938a'
                  },
                  //表头协议
                  header: {
                    'content-type': 'application/json' // 默认值
                  },
                  //提交方式
                  method: "POST",
                  dataType: 'json',
                  success: function (res) {
                    console.log(res);

                  }
                })
              }, 2800)

              //弹出提示
              wx.showModal({
                title: '恭喜：' + phonenum, content: '您成功领取了优惠券',
                success: function (res) {
                  if (res.confirm) { console.log('确定') }
                  else if (res.cancel) { console.log('取消') }
                }
              })


            } else {
              wx.showModal({
                title: '链接超时',
                showCancel: false,
                content: '请重点击新领取',
              })

            }

          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})