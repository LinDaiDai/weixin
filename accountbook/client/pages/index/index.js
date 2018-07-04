//index.js
var qcloud = require('../../vendor/wafer2-client-sdk/index')
var config = require('../../config')
var util = require('../../utils/util.js')
var app = getApp();

Page({
    data: {
        userInfo: {},
        logged: false,
        surplus: 0,
        searchYear: '',
        searchMonth: '',
        createTime: '',
        monthIncome: 0.00,
        monthExpend: 0.00,
        accountList: []
    },
    onLoad: function(options) {
        this.login();
    },
    init() {
        let nowDate = new Date(),
            searchYear = util.getYear(nowDate),
            searchMonth = util.getMonth(nowDate);
        this.setData({
            searchYear,
            searchMonth
        })
        this.getAccountList();
    },
    // 用户登录示例
    login() {
        if (this.data.logged) return

        util.showBusy('正在登录')
        var that = this

        // 调用登录接口
        qcloud.login({
            success(result) {
                if (result) {
                    util.showSuccess('登录成功')
                    that.setData({
                        userInfo: result,
                        logged: true
                    })
                    app.globalData.userInfo = result;
                    that.init();
                } else {
                    // 如果不是首次登录，不会返回用户信息，请求用户信息接口获取
                    qcloud.request({
                        url: config.service.requestUrl,
                        login: true,
                        success(result) {
                            util.showSuccess('登录成功')
                            that.setData({
                                userInfo: result.data.data,
                                logged: true
                            })
                            app.globalData.userInfo = result.data.data;
                            that.init();
                        },

                        fail(error) {
                            util.showError('请求失败', error)
                            console.log('request fail', error)
                        }
                    })
                }
            },

            fail(error) {
                util.showError('登录失败', error)
                console.log('登录失败', error)
            }
        })
    },
    getAccountList() {//获取某年某月的账单列表
        console.log(app.globalData.userInfo);
        if (!app.globalData.userInfo) return;
        let openId = app.globalData.userInfo.openId;
        let param = {
            openId: openId,
            year: this.data.searchYear,
            month: this.data.searchMonth
        }
        let options = {
            url: config.service.accountListUrl,
            method: 'POST',
            data: param,
            success: res => {
                console.log(res);
                if (res && res['data']) {
                    let accountList = res['data']['dateList'];
                    if (accountList.length > 0) {
                        // accountList.forEach(ele => {
                            
                        // })   
                    }
                    let surplus = res['data']['surplus'],
                        monthIncome = res['data']['monthIncome'],
                        monthExpend = res['data']['monthExpend'];
                    this.setData({
                        accountList,
                        surplus,
                        monthIncome,
                        monthExpend
                    })
                }
            },
            fail: error => {
                console.log(error);
            }
        }
        wx.request(options);
    },
    bindDateChange(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value);
        let nowDate = e.detail.value,
            searchYear = util.getYear(nowDate),
            searchMonth = util.getMonth(nowDate);
        this.setData({
            searchYear,
            searchMonth
        })
        this.getAccountList();        
    }
})
