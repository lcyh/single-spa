module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-selector-namespace": {
      // 给所有css添加统一前缀，然后父应用添加命名空间
      namespace: function(css) {
        // element-ui的样式不需要添加命名空间
        if (css.includes("element-variables.scss")) return "";
        return `.app-vue-child`;
      },
    },
  },
};
