var listInfo = require('../../utils/listInfo.js');
var utils = require('../../utils/util');
var config = require('../../config')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    substance: {},
    routeType: '',//跳转类型
    iconfontList: [],
    amtTypeList: ['支出', '收入'],
    amtTypeIndex: 0//0支出 1收入
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let routes = getCurrentPages();//[e, e];
    let beforeRoute = routes[0]['route'];//获取跳转过来的路径
    let routeType = beforeRoute === 'pages/account/account' ? '添加' : '确定';
    console.log(beforeRoute);
    let amtType,
        idx,
        obj = {},
        substance = {};
    if (routeType == '添加') {
      amtType = Number(options.amtType);
      idx = Number(options.idx);
      var nowDate = utils.dateToStr(new Date(), 'yyyy-MM-dd');
      var week = utils.getDateWeekday(nowDate);

      if (amtType == 1) {
        obj = listInfo.incomeList[idx];
      } else {
        obj = listInfo.expendList[idx];
      }

      substance = {
        billClass: obj.class,
        billLabel: obj.label,
        amtType: amtType,
        amtTypeStr: amtType == 1 ? '支出' : '收入',
        amount: '',
        createTime: nowDate,
        week: week,
        remark: ''
      }
    } else {
      substance = JSON.parse(options.ele);
      substance.amount = substance.amount ? Math.abs(substance.amount) : 0;
      amtType = substance.amtType;
    }
    console.log(substance);
    let amtTypeIndex = amtType - 1;
    this.setData({
      substance,
      routeType,
      amtTypeIndex
    })
  },
  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    let index = Number(e.detail.value);
    let substance = this.data.substance;
    let amtTypeIndex = index;
    substance.amtType = index + 1;
    substance.amtTypeStr = this.data.amtTypeList[index];
    console.log(substance);
    this.setData({
      substance,
      amtTypeIndex
    })
  },
  bindKeyInput(e) {
    let substance = this.data.substance;
    substance.amount = e.detail.value;
    this.setData({
      substance
    })
  },
  bindRemark(e) {
    let substance = this.data.substance;
    substance.remark = e.detail.value;
    this.setData({
      substance
    })
  },
  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value);
    let substance = this.data.substance;
    substance.createTime = e.detail.value;
    substance.week = utils.getDateWeekday(substance.createTime);
    substance.year = utils.getYear(substance.createTime);
    substance.month = utils.getMonth(substance.createTime);
    console.log(substance);
    this.setData({
      substance
    })
  },
  clickThis() {//添加/编辑账单
    let substance = this.data.substance;
    console.log(app.globalData.userInfo);
    let openId = app.globalData.userInfo.openId;
    let param = Object.assign({}, substance, { openId: openId });
    let url = "";
    let routeType = this.data.routeType;

    if (routeType ==='添加') {
      url = config.service.addAccountUrl;
    } else {
      url = config.service.editAccountUrl;      
    }
    
    let options = {
      url: url,
      method: 'POST',
      data: param,
      success(result) {
        if (result['data']['success']) {
          let msg = result['data']['message'];
          utils.showSuccess(msg);
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000);
        }
      },
      fail(error) {
        util.showModel('请求失败', error);
      }
    }
    wx.request(options)
  },
  deleteThis() {//删除账单
    console.log(this.data.substance);
    utils.grow({
      title: '提示',
      content: '确定要删除此项吗？',
      success: () => {
        this.sureDelete();
      }
    })
  },
  sureDelete() {
    let param = {
      'billId': this.data.substance['billId'],
      'openId': app.globalData.userInfo.openId
    }
    let options = {
      url: config.service.deleteAccountUrl,
      method: 'POST',
      data: param,
      success(result) {
        if (result['data']['success']) {
          utils.showSuccess('删除成功！');
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            })
          }, 1000);
        } else {
          utils.showError('删除失败！', result['data']['message']);
        }
      },
      fail(error) {
        util.showError('删除失败！', error);
      }
    }
    wx.request(options)
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