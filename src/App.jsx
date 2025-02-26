import Router from './router';
import styles from './App.module.scss';

export default function App() {
  // 从环境变量中获取API的URL
  // 使用import.meta.env访问Vite配置的环境变量
  // VITE_API_URL是在Vite项目中定义的一个环境变量，用于存储API的URL
  // 例如，如果你在开发模式下运行项目，Vite会加载.env.development文件；
  // 如果你在生产模式下运行项目，Vite会加载.env.production文件。
  // 如果你想要在所有模式下都使用相同的环境变量，
  // 你可以在.env文件中定义这些变量，因为.env文件在所有模式下都会被加载。
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello Vite + React!</h1>
      <Router />
    </div>
  );
}
