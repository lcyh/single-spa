module.exports = {
  //   publicPath: "http://127.0.0.1:10000",
  lintOnSave: false,
  configureWebpack: {
    output: {
      library: "singleVue",
      libraryTarget: "umd",
    },
  },
  devServer: {
    port: 10000,
    open: true,
  },
};
