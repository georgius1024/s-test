module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/s-test/' : '/',
  transpileDependencies: ['vuetify'],
  lintOnSave: true,
  devServer: {
    overlay: {
      warnings: false,
      errors: true
    }
  }
}
