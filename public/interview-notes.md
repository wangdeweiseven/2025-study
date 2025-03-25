# 面试知识点

## 算法题解

### 常见数据结构

#### 数组 vs 链表

**存储方式**

- 数组：连续内存空间，预分配大小
- 链表：节点离散存储，动态扩展

**时间复杂度对比**
| 操作 | 数组 | 链表 |
|----------|------|------|
| 随机访问 | O(1) | O(n) |
| 头部插入 | O(n) | O(1) |
| 尾部追加 | O(1) | O(1) |

**应用场景**

- 数组：需要频繁随机访问（如矩阵运算）
- 链表：频繁增删操作（如 LRU 缓存）

#### 栈 & 队列

```javascript
// 最小栈实现（支持O(1)获取最小值）
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [Infinity];
  }
  push(val) {
    this.stack.push(val);
    this.minStack.push(Math.min(val, this.minStack[this.minStack.length - 1]));
  }
  pop() {
    this.minStack.pop();
    return this.stack.pop();
  }
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}
```

```python
# 用队列实现栈
class MyStack:
    def __init__(self):
        self.queue = collections.deque()

    def push(self, x):
        self.queue.append(x)
        for _ in range(len(self.queue)-1):
            self.queue.append(self.queue.popleft())
```

#### 哈希表

**冲突解决**

- 开放寻址法：线性探测、二次探测
- 链地址法：链表存储冲突元素（Java HashMap）

#### 堆

- 完全二叉树结构，可用数组实现
- 应用场景：TopK 问题（时间复杂度 O(nlogk)）

---

### 典型算法

**快速排序优化**

1. 三数取中法选择 pivot
2. 小数组切换插入排序
3. 三向切分（处理大量重复元素）

**面试高频问题**

- 如何判断链表有环？快慢指针 vs 哈希表
- 二叉树层序遍历的时空复杂度？
- 海量数据求 TopK 为什么用堆不用排序？

### 典型算法

```javascript
// 快速排序示例
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}
```

## 前端核心

### JavaScript

#### 原型链

**实现机制**

1. 每个对象都有 `__proto__` 属性指向构造函数的 prototype
2. 每个构造函数也是函数，其 `__proto__` 指向 Function.prototype
3. Function.prototype 的 `__proto__` 指向 Object.prototype
4. Object.prototype 的 `__proto__` 指向 null (原型链的终点即是 Object.prototype)

```javascript
function Animal(name) {
  this.name = name;
}
Animal.prototype.eat = function () {
  console.log(this.name + " eating");
};

const cat = new Animal("Tom");
console.log(cat.__proto__ === Animal.prototype); // true
```

#### 闭包

**核心特征**

- 函数嵌套结构（函数内部定义函数）
- 内部函数引用了外部函数的变量
- 延长变量生命周期（内部函数在外部函数执行完毕后仍然可以被访问）

**闭包的关键特征：**

- 保持对词法作用域的引用
- 即使外部函数已经执行完毕，闭包仍然可以访问外部函数的变量
- 闭包会阻止垃圾回收机制回收被引用的变量

**闭包的典型应用场景：**

- 数据封装和私有变量
- 回调函数
- 函数柯里化
- 模块模式

**内存泄漏案例**

```javascript
function createHeavy() {
  const bigData = new Array(1000000);
  return () => bigData; // 闭包持有bigData引用
}

// 解决方案：显式释放引用
function safeCreate() {
  const bigData = new Array(1000000);
  return {
    getData: () => bigData,
    clear: () => {
      bigData.length = 0;
    },
  };
}
```

#### 事件循环

**浏览器环境**

```javascript
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
// 输出顺序：1 -> 3 -> 2
```

**Node.js 环境**

```javascript
const fs = require("fs");
fs.readFile(__filename, () => {
  setTimeout(() => console.log("1"), 0);
  setImmediate(() => console.log("2"));
});
// 输出顺序：2 -> 1（在I/O阶段setImmediate优先）
```

### React

#### 生命周期

**类组件 vs 函数组件**

- 挂载阶段：constructor → render → componentDidMount
- 更新阶段：shouldComponentUpdate → render → componentDidUpdate
- 卸载阶段：componentWillUnmount

**Hooks 执行顺序**

```javascript
function App() {
  useEffect(() => {
    // componentDidMount
    console.log("父组件 mounted");
    return () => console.log("父组件 unmount"); // componentWillUnmount
  }, []);

  const [count, setCount] = useState(0); // 状态初始化
  // ...
}
```

#### Hooks 使用

**最佳实践**

1. 用 useMemo 缓存昂贵计算
2. 用 useCallback 避免子组件无效重渲染
3. 自定义 Hook 封装通用逻辑

```javascript
// 自定义Hook实现防抖
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

#### 虚拟 DOM 原理

**Diff 算法优化策略**

1. 同级比较（时间复杂度 O(n^3)→O(n)）
2. key 属性优化列表对比
3. 双缓存技术避免白屏

## 系统设计

### 设计原则

- CAP 定理
- RESTful 设计
- 缓存策略

### 典型系统

- 短链接系统
- 秒杀系统
- 即时通讯系统

## 计算机基础

### 操作系统

- 进程/线程
- 内存管理
- 文件系统

### 网络协议

- TCP/IP 协议栈
- HTTP/2 特性
- WebSocket 原理

---

持续更新中...
