import VirtualList from './virtual-list';

export default function Home() {
  // 生成测试数据（10000条）
  const mockItems = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    content: `Item ${i + 1}`,
  }));

  return (
    <div className="home-container">
      {
        <VirtualList
          items={mockItems}
          itemHeight={50} // 每项高度
          visibleCount={10} // 可见项数量（容器高度 = visibleCount * itemHeight）
        />
      }
    </div>
  );
}
