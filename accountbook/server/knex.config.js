const { mysql: config } = require('./config')

const DB = {
    db: {
        client: 'mysql', //指明数据库类型，还可以是mysql，sqlite3等等
        connection: {
            host: config.host,
            port: config.port,
            user: config.user,
            password: config.pass,
            database: config.db,
            charset: config.char,
            multipleStatements: true
        }
    },
    accountList: 'accountList',
    accountInfo: 'accountInfo',
}
module.exports = DB
