import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../components/Home';
import About from '../components/About';
import Counter from '../components/Counter';
import ToDoList from '../components/ToDoList';

const router = createBrowserRouter(
  [
    {
      path: '/', // 路由路径
      element: <Layout />, // 路由组件
      children: [
        { index: true, element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'counter', element: <Counter /> },
        { path: 'list', element: <ToDoList /> },
      ],
    },
  ],
  {
    basename: import.meta.env.PROD ? '/2025-study' : '/',
  }
);

export default function Router() {
  return <RouterProvider router={router} />;
}
