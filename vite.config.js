import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// 获取环境变量
const mode = process.env.NODE_ENV || "development";
const env = loadEnv(mode, process.cwd())

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: env.VITE_BASE_URL,
})
