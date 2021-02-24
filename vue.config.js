module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/dessert-shop/' : '/',
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Dessert Shop';
        return args;
      });
  }
};
