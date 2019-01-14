module.exports = {
    configureWebpack:{
        devServer:{
            proxy: {
                '/api': {
                  //target: 'http://www.maz9f.cn', // 接口的域名
                  target: 'http://192.168.0.110:8080', // 接口的域名
                  // secure: false,  // 如果是https接口，需要配置这个参数
                  changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
                  pathRewrite: {
                    '^/api': ''
                  }
                }
            }
        }
        
    }
}