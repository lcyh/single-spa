import Vue from "vue";
import App from "./App.vue";
import "./App.css";
import router from "./router";
import singleSpaVue from "single-spa-vue";
// 实例：https://zhuanlan.zhihu.com/p/149780712?from_voters_page=true
Vue.config.productionTip = false;
let appOptions = {
  el: "#vue",
  router,
  render: (h) => h(App),
};
const vueLifecycles = singleSpaVue({
  Vue,
  appOptions,
});
console.log("window.singleSpaNavigate", window.singleSpaNavigate);
// 挂载在父应用里
if (window.singleSpaNavigate) {
  __webpack_public_path__ = "http://127.0.0.1:10000/";
}
// 子应用独立运行,判断当前子应用是否是single-spa应用，不是就渲染
if (!window.singleSpaNavigate) {
  console.log("window.singleSpaNavigate--子", window.singleSpaNavigate);
  delete appOptions.el;
  new Vue(appOptions).$mount("#app");
}

export const bootstrap = vueLifecycles.bootstrap;
export const mount = (props) =>
  vueLifecycles.mount(props).then((instance) => {
    // do what you want with the Vue instance
    console.log("子应用页面-props", props);
    console.log("子应用实例-instance", instance);
  });
export const unmount = vueLifecycles.unmount;
