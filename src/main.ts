import { createApp } from 'vue'
import App from './App.vue'
import { store, key } from './store'
import router from "./router";
import service from "/@/utils/https";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { ElNotification,ElMessage } from 'element-plus'

async function start() {
const app = createApp(App)

app.use(store, key)
app.use(router)
app.use(ElementPlus);
// app.mixin(messageComponent);
// app.mixin(SharedComponents);
app.mount('#app');
app.config.globalProperties.$https = service;
app.config.globalProperties.$notify = ElNotification;
app.config.globalProperties.$message = ElMessage;
}
start()