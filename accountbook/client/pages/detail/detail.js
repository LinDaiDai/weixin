var listInfo = require('../../utils/listInfo.js');
var utils = require('../../utils/util');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    substance: {}, 
    iconfontList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let idx = Number(options.idx);
    let obj = listInfo.incomeList[idx];
    console.log(new Date());
    let nowDate = utils.dateToStr(new Date(), 'yyyy-MM-dd');
    let week = utils.getDateWeekday(nowDate);
    let substance = {
      iconfontClass: obj.class,
      label: obj.label,
      type: '支出',
      amount: 300,
      date: nowDate,
      week: week,
      remark: '我是备注'
    }
    console.log(nowDate);
    console.log(substance);
    this.setData({
      substance
    })
  },
  bindKeyInput(e) {
    let substance = this.data.substance;
    substance.amount = e.detail.value;
    this.setData({
      substance
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    let substance = this.data.substance;
    substance.date = e.detail.value;
    substance.week = utils.getDateWeekday(substance.date);
    this.setData({
      substance
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