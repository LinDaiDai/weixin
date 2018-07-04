/**
 * 腾讯云微信小程序解决方案
 * Demo 数据库初始化脚本
 * @author Jason
 */
const fs = require('fs')
const path = require('path')
const knexconfig = require('../knex.config.js')
const { mysql: config } = require('../config')

console.log('\n======================================')
console.log('开始初始化数据库...')
console.log(config);
// console.log(mysql);
// 初始化 SQL 文件路径
const INIT_DB_FILE = path.join(__dirname, './cAuth.sql')

// const DB = require('knex')(knexconfig.db)
const DB = require('knex')(knexconfig.db)

console.log(`准备读取 SQL 文件：${INIT_DB_FILE}`)

// 读取 .sql 文件内容
const content = fs.readFileSync(INIT_DB_FILE, 'utf8')

console.log('开始执行 SQL 文件...')

// 执行 .sql 文件内容
DB.raw(content).then(res => {
    console.log('数据库初始化成功！')
    process.exit(0)
}, err => {
    throw new Error(err)
})

DB.schema.hasTable('accountList').then(function(exists) {
  if (!exists) {
      console.log('accountList');
      return DB.schema.createTable('accountList', function(t) {
      t.increments('bill_id').primary();
      t.string('open_id', 100).comment('用户id');
      t.string('amt_type').comment('类型');
    });
  }
});
DB.schema.hasTable('accountInfo').then(function (exists) {
    if (!exists) {
        console.log('accountInfo');
        return DB.schema.createTable('accountInfo', function (t) {
            t.increments('bill_id').comment('账单id');
            t.string('open_id', 100).comment('用户id');
            t.string('bill_class', 100).comment('图标');
            t.string('bill_labe', 100).comment('方式');
            t.string('amt_type', 100).comment('类型');
            t.dateTime('creat_time', 100).comment('创建时间');
            t.string('amount').comment('金额');
            t.string('remark').comment('备注');
        });
    }
});
DB.schema.hasTable('demo1').then(function (exists) {
    if (!exists) {
        console.log('demo1');
        return DB.schema.createTable('demo1', function (t) {
            t.increments('bill_id').comment('账单id');
            t.string('open_id', 100).comment('用户id');
            t.string('bill_class', 100).comment('图标');
            t.string('bill_labe', 100).comment('方式');
            t.string('amt_type', 100).comment('类型');
            t.dateTime('creat_time', 100).comment('创建时间');
            t.string('amount').comment('金额');
            t.string('remark').comment('备注');
        });
    }
});