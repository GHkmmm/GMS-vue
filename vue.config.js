module.exports= {
  configureWebpack: {
      resolve: {
          alias: {
              'assets': '@/assets',
              'components': '@/components',
              'network': '@/network',
              'views': '@/views',
              'network': '@/network',
              'utils': '@/utils'
          }
      }
  },
  devServer:{
    proxy:{
      '/api':{
        target:'http://localhost:8080/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  } 
}