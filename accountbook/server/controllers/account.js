const knexconfig = require('../knex.config.js')
const knex = require('knex')(knexconfig.db)
const common = require('../common/common')
const translate = require('../common/translate')
module.exports = {
    accountList: async (ctx) => {
        const request = ctx.request.body;

        await knex(knexconfig.accountInfo)
            .where({
                open_id: request.openId,
                year: request.year,
                month: request.month
            })
            .select()
            .reduce((memo, row) => {
                let amount = row['amount'] ? Number(row['amount']) : 0;
                if (row['amt_type'] == 1) {//支出
                    row['amtTypeStr'] = '支出';
                    amount = `-${amount}`;
                    row['amount'] = amount;
                    memo.monthIncome += Number(amount);
                } else if (row['amt_type'] == 2) {//收入
                    memo.monthExpend += amount;
                    row['amtTypeStr'] = '收入';
                }
                memo.surplus += Number(amount);
                let ele = translate.translateEle(row);
                console.log(ele);
                let isOk = false;
                for (let i = 0, l = memo.dateList.length; i < l; i++) {
                    let item = memo.dateList[i];
                    if (!isOk && ele['createTime'] == item['createTime']) {
                        if (ele['amtType'] == 1) {//当天支出
                            item['dayIncome'] += Number(ele['amount']);
                        } else if (ele['amtType'] == 2) {
                            item['dayExpend'] = Number(ele['amount']);
                        }
                        item['list'].push(ele);
                        isOk = true;
                        break;
                    }
                }
                if (!isOk) {
                    let unit = {
                        createTime: ele['createTime'],
                        week: ele['week'],
                        month: ele['month'],
                        day: ele['day'],
                        list: []
                    }
                    if (ele['amtType'] == 1) {//当天支出
                        unit['dayIncome'] = Number(ele['amount']);
                        unit['dayExpend'] = 0;
                    } else if (ele['amtType'] == 2) {
                        unit['dayExpend'] = Number(ele['amount']);
                        unit['dayIncome'] = 0;
                    }
                    unit['list'].push(ele);
                    memo.dateList.push(unit);
                }
                return memo;
            }, { surplus: 0, monthIncome: 0, monthExpend: 0, dateList: [] })
            .then(obj => {
                console.log(obj);
                ctx.response.body = obj;
            })
            .catch(e => {
                console.error(e);
            })
        return ctx.response.body
    },
    addAccount: async (ctx) => {//添加账单
        const request = ctx.request.body;
        let account = {
            open_id: request.openId,
            amt_type: request.amtType,
        };
        let accounts = {
            bill_class: request.billClass,
            bill_label: request.billLabel,
            create_time: request.createTime,
            year: common.getYear(request.createTime),
            month: common.getMonth(request.createTime),
            amount: request.amount,
            remark: request.remark
        }
        let accountInfo = Object.assign({}, account, accounts);
        let res = await new Promise((resolve, reject) => {
            knex(knexconfig.accountList)
                .insert(account)
                .catch(function (e) {
                    console.error(e);
                    reject({
                        success: false,
                        message: '添加失败！'
                    })
                })
                .then(function (row) {
                    accountInfo['bill_id'] = row[0];
                    return accountInfo;
                })
                .then(function (row) {
                    console.log('accountInfo');
                    console.log(row);
                    knex(knexconfig.accountInfo)
                        .insert(accountInfo)
                        .then(function (e) {
                            console.log('then');
                            console.log(e);
                            resolve({
                                success: true,
                                message: '添加成功'
                            })
                        })
                })
        })
        ctx.response.body = res;
    },
    editAccount: async (ctx) => {
        const request = ctx.request.body;
        await knex(knexconfig.accountInfo)
            .where({
                open_id: request.openId,
                bill_id: request.billId
            })
            .update({
                bill_class: request.billClass,
                bill_label: request.billLabel,
                amt_type: request.amtType,
                create_time: request.createTime,
                amount: request.amount,
                remark: request.remark,
                month: request.month,
                year: request.year
            })
            .then(obj => {
                console.log(obj);
                ctx.response.body = {
                    success: true,
                    message: '修改成功'
                }
            })
            .catch(e => {
                console.error(e);
                ctx.response.body = {
                    success: false,
                    message: '修改失败'
                }
            })
    },
    deleteAccount: async (ctx) => {
        const request = ctx.request.body;
        await knex(knexconfig.accountInfo)
            .where({
                open_id: request.openId,
                bill_id: request.billId
            })
            .del()
            .then(obj => {
                console.log(obj);
                ctx.response.body = {
                    success: true,
                    message: '删除成功'
                }
            })
            .catch(e => {
                console.log(e);
                ctx.response.body = {
                    success: false,
                    message: '删除失败'
                }
            })
    }
}
