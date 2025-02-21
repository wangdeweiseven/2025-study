以下是从零开始 **完全手动** 创建 React 项目并使用 Vite 打包的详细步骤：

---

### 1. 初始化项目
```bash
mkdir my-react-app
cd my-react-app
npm init -y
```

### 2. 安装核心依赖
```bash
npm install react react-dom
npm install vite @vitejs/plugin-react --save-dev
```

### 3. 创建基础文件结构
```
├── node_modules/
├── public/
│   └── vite.svg       # (可选) 示例图标
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css      # (可选)
├── index.html
├── package.json
└── vite.config.js
```

### 4. 配置文件内容

#### (1) `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Vite + React</title>
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

#### (2) `src/main.jsx`
```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
```

#### (3) `src/App.jsx`
```jsx
export default function App() {
  return (
    <div>
      <h1>Hello Vite + React!</h1>
    </div>
  )
}
```

### 5. 配置 Vite (`vite.config.js`)
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 3000
  }
})
```

### 6. 配置 package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### 7. 启动项目
```bash
npm run dev
```

---

### 手动扩展配置 (按需添加)

#### 1. 添加 CSS 支持
```bash
npm install sass --save-dev
```
创建 `src/index.scss`：
```scss
#root {
  max-width: 1280px;
  margin: 0 auto;
}
```

#### 2. 配置 JSX 支持
Vite 默认支持 JSX，但需要确保：
```javascript
// vite.config.js
plugins: [
  react({
    jsxRuntime: 'classic' // 可选经典模式
  })
]
```

#### 3. 环境变量
创建 `.env` 文件：
```bash
VITE_API_URL=https://api.example.com
```
使用变量：
```jsx
const apiUrl = import.meta.env.VITE_API_URL
```

#### 4. SVG 处理
```bash
npm install vite-plugin-svgr --save-dev
```
配置：
```javascript
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [svgr(), react()]
})
```

---

### 关键差异说明 (相比脚手架)
1. **无预设模板**：需要手动创建所有文件
2. **显式依赖管理**：需手动安装 `@vitejs/plugin-react`
3. **完整控制权**：所有配置均为显式声明
4. **无默认样式**：需要自行添加 CSS 初始化
5. **需手动配置 JSX**：虽然 Vite 支持 JSX，但需要显式配置 React 插件

---

### 完整项目演进流程
1. 基础渲染：完成上述基础配置
2. 添加路由：
```bash
npm install react-router-dom
```
3. 状态管理：
```bash
npm install @reduxjs/toolkit react-redux
```
4. 代码规范：
```bash
npm install eslint prettier eslint-config-prettier --save-dev
```
5. 测试环境：
```bash
npm install vitest @testing-library/react @testing-library/jest-dom --save-dev
```

---

通过这种方式，您可以完全掌控项目的每个配置细节，特别适合需要深度定制的项目或学习底层工作原理。建议首次使用时对照官方文档 (Vite 官方文档: https://vitejs.dev/) 进行验证。