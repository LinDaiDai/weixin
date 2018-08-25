const common = require('./common')
module.exports = {
    translateEle(row) {
        let week = common.getDateWeekday(row.create_time),
            day = common.getDay(row.create_time);
        let ele = {
            billId: row.bill_id,
            billClass: row.bill_class,
            billLabel: row.bill_label,
            amount: row.amount,
            amtType: row.amt_type,
            amtTypeStr: row.amtTypeStr,
            week: week,
            day: day,
            createTime: row.create_time,
            month: row.month,
            year: row.year,
            remark: row.remark
        }
        return ele;
    }
}