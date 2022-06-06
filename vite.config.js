import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { terser } from 'rollup-plugin-terser'
import compressPlugin from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    terser()
    // compressPlugin({
    //   algorithm: 'gzip', //brotliCompress gzip
    //   deleteOriginFile: true
    // })
  ],
  outDir: './build',
  base: '/'
})
