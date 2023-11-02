import App from "./App.vue";

// Composables
import { createApp } from "vue";

// Plugins
import { registerPlugins, registerglobal } from "@/plugins";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import "animate.css";
import "./assets/css/index.css";
import "./assets/css/iconfont.css";
import "./assets/css/markdown.css";
import "highlight.js/styles/atom-one-dark.css";
import "vue-toastification/dist/index.css";
import "vue3-cute-component/dist/style.css";
import InfiniteLoading from "vue-infinite-loading";
import Toast, { PluginOptions } from "vue-toastification";
import { AppPreBootstrap } from "./AppPreBootstrap";

async function start() {
  const app = createApp(App);
  registerPlugins(app);
  const options: PluginOptions = {
    // You can set your default options here
  };
  app.use(InfiniteLoading).use(Toast, options);
  app.use(ElementPlus);
  // app.mixin(messageComponent);
  // app.mixin(SharedComponents);
  app.mount("#app");
  registerglobal(app);
  app.provide("$message", Toast);
}

AppPreBootstrap.run(() => {
  start().then(() => {});
});
