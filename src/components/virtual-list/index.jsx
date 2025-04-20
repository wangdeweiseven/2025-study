/* eslint-disable */
import { useState, useRef, useMemo, useCallback } from 'react';

/**
 * itemHeight: 每一项的高度
 * items: 数据列表
 * visibleCount: 可见项的数量
 */
const VirtualList = ({ itemHeight = 50, items = [], visibleCount = 10 }) => {
  const containerRef = useRef(null); // 引用滚动容器 DOM，用于获取滚动信息
  const [scrollTop, setScrollTop] = useState(0); // 记录滚动条的位置，用于计算可见区域
  // 计算列表总高度：计算占位元素的高度，用于计算滚动条的位置
  const totalHeight = useMemo(
    () => items.length * itemHeight,
    [items, itemHeight]
  );

  // 计算可见区域的起始索引
  //  Math.floor向下取整， scrollTop： 滚动容器当前滚动的垂直距离
  // 算出当前应该从第几个列表项开始显示，如滚动条向下滚动150px,每项50px,表示应该从第3个项开始渲染（数组索引从0开始）
  const startIndex = Math.floor(scrollTop / itemHeight);
  //计算结束索引，多渲染一行作为缓冲区（防止快速滚动时出现空白）
  const endIndex = Math.min(startIndex + visibleCount + 1, items.length);
  //数据切片，只截取当前可见区域对应的数据片段
  const visibleItems = useMemo(
    () => items.slice(startIndex, endIndex),
    [items, startIndex, endIndex]
  );

  // 处理滚动事件，更新滚动条位置
  // 当滚动发生时，获取容器的 scrollTop值并更新状态
  // useCallback 在此处的作用是避免每次渲染都创建新的回调函数
  const handleScroll = useCallback((e) => {
    setScrollTop(e.target.scrollTop);
  }, []);

  // 可见区域的内容要向上偏移 startIndex * itemHeight,确保当前可见项出现在容器的正确位置
  const offsetY = startIndex * itemHeight;

  return (
    <div
      ref={containerRef}
      style={{
        height: `${visibleCount * itemHeight}px`,
        overflowY: 'auto',
        border: '1px solid #ddd',
        padding: '10px',
      }}
      onScroll={handleScroll}
    >
      {/** 撑开滚动区域的占位元素*/}
      <div style={{ height: `${totalHeight}px` }}>
        {/** 可见区域的实际内容*/}
        <div
          style={{
            transform: `translateY(${offsetY}px)`,
            // 当列表滚动时，内容区域会频繁进行 translateY 变换
            // 使用 will-change 可以让浏览器预先优化，使滚动更流畅
            willChange: 'transform', // 优化性能，使用硬件加速
          }}
        >
          {visibleItems.map((item, index) => (
            <div
              key={item.id || startIndex + index}
              style={{
                height: `${itemHeight}px`,
                padding: '8px',
                borderBottom: '1px solid #eee',
              }}
            >
              {item.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;
