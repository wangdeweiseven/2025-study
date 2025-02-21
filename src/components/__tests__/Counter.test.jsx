// 引入必要的测试库和组件
import { render, screen, fireEvent } from '@testing-library/react'; // 引入渲染、查询和事件触发函数
import Counter from '../Counter'; // 引入要测试的Counter组件
import { Provider } from 'react-redux'; // 引入React-Redux的Provider组件
import store from '../../store'; // 引入Redux的store
import { describe, test, expect } from 'vitest'; // 引入Vitest的描述和测试函数

// 描述Counter组件的测试用例
describe('Counter Component', () => {
  // 测试用例：检查计数是否可以增加
  test('should increment count', () => {
    // 使用Provider包裹Counter组件，并传入store，然后渲染到测试环境中
    render(
      <Provider store={store}>
        <Counter />
      </Provider>
    );

    // 获取文本为'+'的按钮元素
    const incrementButton = screen.getByText('+');
    // 模拟点击事件
    fireEvent.click(incrementButton);
    // 验证文本为'1'的元素是否在文档中
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
