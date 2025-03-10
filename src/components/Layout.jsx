import { Outlet, Link } from 'react-router-dom';
// 修复：如果 Layout.module.scss 文件存在问题，这里先假定是正确导入，确保文件存在且格式正确

export default function Layout() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/counter">counter</Link>
        <Link to="/list">todoList</Link>
      </nav>
      {/* 使用 <Outlet /> 组件来渲染匹配当前路由的子路由组件
            <Outlet /> 是 React Router 中的一个组件，用于在父路由组件中渲染子路由组件
            当路由匹配到当前父路由时，<Outlet /> 会渲染对应的子路由组件 */}
      <Outlet />
    </div>
  );
}
