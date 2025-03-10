import { defineConfig } from 'vite';
// eslint-disable-next-line
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  // 设置基础路径，根据环境变量NODE_ENV的值来决定
  // 如果是生产环境（production），则基础路径为'/2025-study/'，否则为根路径'/'
  base: process.env.NODE_ENV === 'production' ? '/2025-study/' : '/',
  // 配置构建选项
  build: {
    // 强制CSS代码分离
    cssCodeSplit: true,
    // 指定静态资源目录为'static'
    assetsDir: 'static',
    emptyOutDir: true,
    // 配置Rollup打包选项
    rollupOptions: {
      // 配置输出选项
      output: {
        // 指定静态资源文件的命名规则
        // 文件名格式为'static/[name]-[hash][extname]'
        // 其中[name]是原始文件名，[hash]是文件内容的哈希值，[extname]是文件扩展名
        // 指定静态资源文件的命名规则
        assetFileNames: (assetInfo) => {
          if (assetInfo.fileName?.endsWith('.css')) {
            return 'static/css/[name]-[hash][extname]';
          }
          return 'static/[name]-[hash][extname]';
        },
      },
    },
  },
  plugins: [
    react({
      // 指定使用经典的JSX运行时
      // 'classic' 表示使用传统的JSX转换方式，而不是新的自动导入 JSX 运行时的方式
      // 这通常用于需要兼容旧版代码或特定构建配置的项目
      // jsxRuntime:'classic'
    }),
    // 使用 svgr() 函数，该函数通常用于将 SVG 文件转换为 React 组件
    svgr(),
  ],
  resolve: {
    alias: {
      '@': '/src', // 必须显式声明别名
    },
  },
  css: {
    // 定义预处理器选项对象
    preprocessorOptions: {
      // 配置SCSS预处理器
      scss: {
        // 添加额外的数据到SCSS文件中
        additionalData: `
          @use "@/styles/scss/variables" as *;
        `,
      },
    },
  },
  // 定义服务器配置对象
  server: {
    // 设置服务器监听的端口号为3000
    // 配置代理服务器
    port: 3000,
    sourcemap: true, // 使用 inline sourcemap
    proxy: {
      // 当请求路径以'/api'开头时，使用代理
      '/api': {
        // 代理目标地址为http://localhost:3001
        target: 'http://localhost:3001',
        // 设置changeOrigin为true，以解决跨域问题
        changeOrigin: true,
        // 重写请求路径，去掉'/api'前缀
        rewrite: (pat) => pat.replace(/^\/api/, ''),
      },
    },
  },
  preview: {
    port: 4173,
    strictPort: true,
  },
  // 定义一个名为 "test" 的配置对象，用于配置测试环境的相关设置
  test: {
    // 设置全局变量为 true，表示在测试环境中可以使用全局变量
    globals: true,
    // 设置测试环境为 'jsdom'，模拟浏览器环境，以便在非浏览器环境中运行测试
    environment: 'jsdom',
    // 指定测试前的设置文件为 './src/setupTests.js'，该文件将在测试运行前被加载
    setupFiles: './src/setupTests.js',
  },
});
