//index.js
//获取应用实例
const app = getApp()
var phoneObj = "";




Page({
  data: {
    banner: [
      "http://hb.zhifabbs.cn/important_img/banner/banner1.jpg",
      "http://hb.zhifabbs.cn/important_img/banner/banner2.jpg",
      "http://hb.zhifabbs.cn/important_img/banner/banner3.jpg",
      "http://hb.zhifabbs.cn/important_img/banner/banner4.jpg"
    ],
    bannerH: 0,
    noticeData: [
      { code: '130****6044', prize: '328元优惠卷' },
      { code: '131****1002', prize: '300元优惠卷' },
      { code: '151****2987', prize: '328元优惠卷' },
      { code: '155****3321', prize: '300元优惠卷' },
      { code: '159****4528', prize: '328元优惠卷' }
    ],
    menu: 0,
   
    dataJ: '0'
  },
  imgLoad: function (e) {
    let viewH = app.autoHeight(e);
    this.setData({
      bannerH: viewH-20
    });
  },
  ageChange(e) {
    this.setData({
      ageOn: e.detail.value
    })
  },
  problemChange(e) {
    this.setData({
      problemOn: e.detail.value
    })
  },
  //分享
  onShareAppMessage: function () {
    return {
      title: '五月程序员植发优惠季',
      desc: 'Star本项目享受植发优惠资格，最高享8折优惠!',
      path: "pages/index/index",
    }
  },
  // 表单处理
  formSubmit: function (e) {
    var _this = this;
    if (e.detail.value.name == "") {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none',
        duration: 2000
      })
      return false
    }
    if (e.detail.value.tel == "") {
      wx.showToast({
        title: '请输入手机号码',
        icon: 'none',
        duration: 2000
      })
      return false
    } else {
      if (!(/^1[345678]\d{9}$/.test(e.detail.value.tel))) {
        wx.showToast({
          title: '手机号输入有误',
          icon: 'none',
          duration: 2000
        })
        return false
      }
    }
    _this.setData({
      dataJ: '1'
    })
    wx.request({
      url: 'https://bd.zhifa999.com/plus/by_wx.php', // 仅为示例，并非真实的接口地址
      method: 'POST',
      dataType: 'json',
      data: {
        type: 'wx1',
        diyid: '19',
        do: '2',
        wx_fields: 'name,text;age,text;problem,text;tel,text;addtime,text',
        wx_fieldshash: '241b9f5971218a7306cc85bde1a89d08',
        input: e.detail.value,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        if (res.data == '200') {
          wx.showToast({
            title: '提交成功',
            icon: 'success',
            duration: 2000
          })
          return true;
        }
        else if (res.data == '300') {
          wx.showToast({
            title: '数据校验不对',
            icon: 'none',
            duration: 2000
          })
          return false;
        }
        else if (res.data == '400') {
          wx.showToast({
            title: '参数错误!',
            icon: 'none',
            duration: 2000
          })
          return false;
        }
        else if (res.data == '500') {
          wx.showToast({
            title: '非法操作!',
            icon: 'none',
            duration: 2000
          })
          return false;
        }
        else if (res.data == '600') {
          wx.showToast({
            title: '自定义表单不存在!',
            icon: 'none',
            duration: 2000
          })
          return false;
        }
      },
      fail(res) {
        wx.showToast({
          title: '网络错误，请稍后再试！',
          icon: 'none',
          duration: 2000
        })
      }
    })

  },
  // 菜单切换
  switchMuen: function (e) {
    this.setData({
      menu: e.target.dataset.current
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


})
