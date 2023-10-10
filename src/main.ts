import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'
import router from "./router";
import service from "/@/utils/https";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

async function start() {
const app = createApp(App)


// app.config.globalProperties.productionTip = false;
app.use(store, key)
app.use(router)
app.use(ElementPlus);
// app.mixin(messageComponent);
// app.mixin(SharedComponents);
app.mount('#app');
app.config.globalProperties.$https = service;
}
start()