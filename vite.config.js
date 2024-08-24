import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'node:path'

/** @return {import('vite').UserConfig} */
export default ({ mode }) => {
  /**
   * @type {{
   *   VITE_DEV_PORT: string,
   *   VITE_PREV_PORT: string
   * }}
   */
  const env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    root: '.',
    publicDir: './static',
    resolve: {},
    optimizeDeps: { entries: [] },
    build: {
      outDir: resolve(__dirname, `./dist`),
      cssMinify: true,
      minify: true
    },
    server: {
      host: true,
      port: +env.VITE_DEV_PORT,
      clearScreen: true
    },
    preview: {
      host: true,
      port: +env.VITE_PREV_PORT
    }
  })
}
