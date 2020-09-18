import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI, { Loading, Message } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import {
  registerApplication,
  start,
  getMountedApps,
  navigateToUrl,
} from "single-spa";
Vue.config.productionTip = false;
Vue.use(ElementUI);

async function loadScript(url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}
// Config with more expressive API
const registerApplications = () =>
  registerApplication({
    name: "app-vue-child",
    app: async () => {
      await loadScript("http://127.0.0.1:10000/js/chunk-vendors.js");
      await loadScript("http://127.0.0.1:10000/js/app.js");
      console.log("window.singleVue", window.singleVue);
      return window.singleVue;
    },
    activeWhen: "/vue",
    customProps: {
      some: "value---",
      props: { data: { list: [], id: "121" } },
    },
  });
// start();

(async () => {
  const loading = Loading.service({ fullscreen: true, text: "正在初始化中" });
  try {
    // await getConfig(); // 获取配置中心的配置参数
    // await login(); // 处理登录逻辑
    await registerApplications(); // 注册子系统
    start();
    navigateToUrl("/vue"); // 直接跳转到子应用
    // 切换子系统的时候给body加上对应子系统的 class namespace
    window.addEventListener("single-spa:app-change", () => {
      console.log("父应用-getMountedApps", getMountedApps());
      const app = getMountedApps().pop();
      console.log("getMountedApps()", getMountedApps());
      const isApp = /^app-vue-\w+$/.test(app);
      console.log("isApp", isApp);
      if (isApp) document.body.className = app;
    });
  } catch (err) {
    Message.error(err.message);
  }
  loading.close();
})();

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
