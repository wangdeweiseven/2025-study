import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import MarkdownWithTOC from './MarkdownRenderer';

export default function Home() {
  const [markdownContent, setMarkdownContent] = useState('');
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    // setLoading(true);
    fetch(
      import.meta.env.PROD
        ? '/2025-study/public/interview-notes.md'
        : '/public/interview-notes.md'
    )
      .then((response) => response.text())
      .then((text) => setMarkdownContent(text))
      .then(() => setLoading(false));
  }, []);

  return (
    <div className="home-container">
      <Spin
        tip="文档正在加载中..."
        size="large"
        spinning={isLoading}
        wrapperClassName="home-container-spin"
      >
        <h1>Markdown</h1>
        <MarkdownWithTOC content={markdownContent} />
      </Spin>
    </div>
  );
}
