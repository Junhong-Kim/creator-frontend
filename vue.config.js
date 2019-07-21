const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: path.resolve(__dirname, '../backend/static'),
}
