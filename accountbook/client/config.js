/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
// var host = 'http://localhost:5757';//本地
var host = 'https://glp29a9f.qcloud.la';//开发环境

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,

        //获取demo接口
        demoUrl: `${host}/weapp/demo`,
        
        //获取账单列表
        accountListUrl: `${host}/weapp/accountList`,

        //添加账单接口
        addAccountUrl: `${host}/weapp/addAccount`,

        //编辑账单接口
        editAccountUrl: `${host}/weapp/editAccount`,

        //删除账单接口
        deleteAccountUrl: `${host}/weapp/deleteAccount`
    }
};

module.exports = config;
