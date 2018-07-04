const CONF = {
    port: '5757',
    rootPathname: '',

    // 微信小程序 App ID
    appId: 'wx9c0c1b49cda09e72',

    // 微信小程序 App Secret
    appSecret: '8433525e257f8e7d98357f17e541281f',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'lindaidai',
        pass: '123456',
        char: 'utf8mb4',
        multipleStatements: true
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },
    tunnelServerUrl: '',
    tunnelSignatureKey: '',
    serverHost: 'localhost',
    qcloudAppId: '1256114407',
    qcloudSecretId: 'AKIDQoJwqi6e5b33xDSHb6bWrW4W60rEk2ml',
    qcloudSecretKey: 'nlIrv7KTREA0pmCrYDRuNjTVxJjyBRYU',
    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
