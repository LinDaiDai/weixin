var listInfo = require('../../utils/listInfo.js');
var utils = require('../../utils/util');
var config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    substance: {},
    routeType: '',//跳转类型
    iconfontList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let routes = getCurrentPages();//[e, e];
    let beforeRoute = routes[0]['route'];
    let routeType = beforeRoute === 'pages/account/account' ? '添加' : '删除'; 
    let amtType = Number(options.amtType);
    let idx = Number(options.idx);
    let obj = {};
    if (amtType == 1) {
      obj = listInfo.incomeList[idx];
    } else {
      obj = listInfo.expendList[idx];
    }
    let nowDate = utils.dateToStr(new Date(), 'yyyy-MM-dd');
    let week = utils.getDateWeekday(nowDate);
    let substance = {
      iconfontClass: obj.class,
      label: obj.label,
      type: amtType,
      typeStr: amtType == 1 ? '支出' : '收入',
      amount: 300,
      date: nowDate,
      week: week,
      remark: '我是备注'
    }
    console.log(substance);
    this.setData({
      substance,
      routeType
    })
  },
  bindKeyInput(e) {
    let substance = this.data.substance;
    substance.amount = e.detail.value;
    this.setData({
      substance
    })
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    let substance = this.data.substance;
    substance.date = e.detail.value;
    substance.week = utils.getDateWeekday(substance.date);
    this.setData({
      substance
    })
  },
  clickThis() {
    if (this.data.routeType=='添加') {
      var options = {
        url: config.service.demoUrl,
        login: true,
        success(result) {
          utils.showSuccess('添加成功');
          console.log('request success', result)
        },
        fail(error) {
          util.showModel('请求失败', error);
          console.log('request fail', error);
        }
      }
      wx.request(options)
    } else {
      utils.grow({
        title: '提示',
        content: '确定要删除此项吗？',
        success: () => {
          this.sureDelete();
        }
      })
    }
  },
  sureDelete() {
    console.log(this.data.substance);
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