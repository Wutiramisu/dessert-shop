module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Dessert Shop';
        return args;
      });
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
           @import "@/assets/scss/mediaQuery.scss";
        `
      }
    }
  },

  publicPath: process.env.NODE_ENV === 'production' ? '/dessert-shop/' : '/'
};
