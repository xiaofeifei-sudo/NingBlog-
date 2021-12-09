const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function (app) {
    app.use('/proxy', createProxyMiddleware( {
        target: 'http://101.33.245.249:8080',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
            "^/proxy": ""
        }
    }))

    app.use('/st',createProxyMiddleware({
        target: 'http://101.33.245.249:8080',
        secure: false,
        changeOrigin:true,
        pathRewrite: {
            "^/st": ""
        }
    }))
}
