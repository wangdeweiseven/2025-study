import {
  createHashRouter,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import About from '../components/About';
import Counter from '../components/Counter';
import ToDoList from '../components/ToDoList';

// Vite 会自动注入以下变量：
// import.meta.env.MODE:          {string} 当前模式（development/production）
// import.meta.env.BASE_URL:      {string} 部署的基础路径
// import.meta.env.PROD:          {boolean} 是否生产环境
// import.meta.env.DEV:           {boolean} 是否开发环境
// import.meta.env.SSR:           {boolean} 是否服务端渲染
const ENV = import.meta.env;

const routerConfig = [
  {
    element: <Layout />, // 路由组件
    children: [
      { index: true, path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'counter', element: <Counter /> },
      { path: 'list', element: <ToDoList /> },
      { path: '*', element: <div>404</div> },
    ],
  },
];

// const routerParams = {
// 定义一个名为 `basename` 的变量  **主要是针对当前项目不在服务器根目录的情况**
// 使用三元运算符判断当前环境是否为生产环境 (import.meta.env.PROD)
// 如果是生产环境，则 `basename` 的值为 '/2025-study'
// 如果不是生产环境，则 `basename` 的值为 '/'
// basename: ENV.PROD ? '/2025-study' : '/',
// };

const router = ENV.PROD
  ? createHashRouter(routerConfig)
  : createBrowserRouter(routerConfig);

export default function Router() {
  return <RouterProvider router={router} />;
}
