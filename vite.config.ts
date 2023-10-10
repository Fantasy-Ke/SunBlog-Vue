import { ConfigEnv, ProxyOptions, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { loadEnv } from '/@/utils/vite'
import { resolve } from 'path'


const pathResolve = (dir: string): any => {
  return resolve(__dirname, '.', dir)
}

const viteConfig = ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_PORT, VITE_OPEN, VITE_BASE_PATH, VITE_OUT_DIR, VITE_PROXY_URL } = loadEnv(mode)

  const alias: Record<string, string> = {
      '/@': pathResolve('./src/'),
      assets: pathResolve('./src/assets'),
     // 'vue-i18n': isProd(mode) ? 'vue-i18n/dist/vue-i18n.cjs.prod.js' : 'vue-i18n/dist/vue-i18n.cjs.js',
  }

  let proxy: Record<string, string | ProxyOptions> = {}
  if (VITE_PROXY_URL) {
      proxy = {
          '/': {
              target: VITE_PROXY_URL,
              changeOrigin: true,
          },
      }
  }

  return {
      plugins: [vue()],
      root: process.cwd(),
      resolve: { alias },
      base: VITE_BASE_PATH,
      server: {
          host: '0.0.0.0',
          port: VITE_PORT,
          open: VITE_OPEN,
          proxy: proxy,
      },
      build: {
          cssCodeSplit: false,
          sourcemap: false,
          outDir: VITE_OUT_DIR,
          emptyOutDir: true,
          chunkSizeWarningLimit: 1500,
          rollupOptions: {
              output: {
                  manualChunks: {
                      // 分包配置，配置完成自动按需加载
                      vue: ['vue', 'vue-router',  'element-plus'],
                  },
              },
          },
      },
  }
}

export default viteConfig
