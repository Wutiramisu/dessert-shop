module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Dessert Shop';
        return args;
      });
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/dessert-shop/' : '/'
};
