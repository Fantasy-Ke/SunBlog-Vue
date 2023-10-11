import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins, registerglobal } from "@/plugins";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import "animate.css";
import "./assets/css/index.css";
import "./assets/css/iconfont.css";
import "./assets/css/markdown.css";
import "highlight.js/styles/atom-one-dark.css";
import "vue-toastification/dist/index.css";
import "vue3-cute-component/dist/style.css";
import InfiniteLoading from "vue-infinite-loading";
import Toast, { PluginOptions } from "vue-toastification";
import formatDateTime from "@/plugins/formatDateTime";
import { AppConsts } from "./assets/appConst/AppConsts";
import axios from "axios";


 /**
   * 初始化前端基本配置
   * @param callback
   */
  function getApplicationConfig() {
  let envName = '';
  if (import.meta.env.MODE !== "development") {
    envName = 'prod';
  } else {
    envName = 'dev';
  }

  const url = '../public/assets/appconfig.' + envName + '.json';
  axios
    .get(url)
    .then((response: any) => {
      const result = response.data;
      AppConsts.appBaseUrl = window.location.protocol + '//' + window.location.host;
      AppConsts.remoteServiceBaseUrl = result.remoteServiceBaseUrl;
    })
    .catch((err) => {
      alert(`初始化配置信息出错,错误信息:\n\n${err.message}`);
    });
}


async function start() {
  const app = createApp(App)
  registerPlugins(app);
  getApplicationConfig()
  const options: PluginOptions = {
    // You can set your default options here
  };
  app.use(InfiniteLoading).use(Toast, options).use(formatDateTime)
  app.use(ElementPlus);
  // app.mixin(messageComponent);
  // app.mixin(SharedComponents);
  app.mount('#app');
  registerglobal(app)
  app.provide('$message',Toast)
  }
  start()
