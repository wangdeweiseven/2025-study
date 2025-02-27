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
    // 指定静态资源目录为'static'
    assetsDir: 'static',
    // 配置Rollup打包选项
    rollupOptions: {
      // 配置输出选项
      output: {
        // 指定静态资源文件的命名规则
        // 文件名格式为'static/[name]-[hash][extname]'
        // 其中[name]是原始文件名，[hash]是文件内容的哈希值，[extname]是文件扩展名
        assetFileNames: 'static/[name]-[hash][extname]',
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
    preprocessorOptions: {
      scss: {
        // 将styles/variables.scss文件中定义的scss变量导入到所有scss文件中（便于复制引用）
        // 使用 @use 规则引入外部样式文件
        // "@/styles/variables" 是相对路径，指向项目中的样式变量文件
        // as * 表示将文件中的所有导出内容引入当前文件，并可以直接使用
        additionalData: `
        @use "@/styles/variables" as *;
      `,
      },
    },
  },
  server: {
    port: 3000,
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
