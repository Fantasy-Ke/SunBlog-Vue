/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import apiHttpClient from "../utils/api-http-client";

// Types
import type { App } from 'vue'
import { AppConsts } from '@/assets/appConst/AppConsts';

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
}


export function registerglobal (app: App) {
  console.log(AppConsts.remoteServiceBaseUrl);
  
  app.provide('$api',apiHttpClient)
}
