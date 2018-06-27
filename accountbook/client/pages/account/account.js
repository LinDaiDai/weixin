var listInfo = require('../../utils/listInfo.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    _num: 1,
    nowIndex: -1,
    iconfontList: []
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      iconfontList: listInfo.incomeList
    })
  },
  headClick: function (e) {
    console.log(e);
    let _num = e.target.dataset.num;
    let iconfontList = _num == 1 ? listInfo.incomeList : listInfo.expendList;
    
    this.setData({
      _num,
      iconfontList,
      nowIndex: -1
    })
  },
  typeClick: function (e) {
    console.log(e);
    let nowIndex = e.currentTarget.dataset.index;
    let amtType = this.data._num;
    this.setData({
      nowIndex
    })
    wx.navigateTo({
      url: `../detail/detail?idx=${nowIndex}&amtType=${amtType}`,
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