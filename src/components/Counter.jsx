import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../store/counterSlice';

// 导出一个名为Counter的默认函数组件
export default function Counter() {
  // 使用useSelector钩子从Redux状态树中获取counter模块的count值
  const count = useSelector((state) => state.counter.count);
  // 使用useDispatch钩子获取dispatch函数，用于分发Redux动作
  const dispatch = useDispatch();

  return (
    <div>
      <button type="button" onClick={() => dispatch(decrement())}>
        -
      </button>
      <span>{count}</span>
      <button type="button" onClick={() => dispatch(increment())}>
        +
      </button>
      <button type="button" onClick={() => dispatch(incrementByAmount(5))}>
        +5
      </button>
    </div>
  );
}
