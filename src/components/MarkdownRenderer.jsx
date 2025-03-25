/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

// 提取table组件,避免React 在每次渲染时都看到一个新组件类型，从而销毁整个子树的 DOM 节点和状态
const renderTableCom = ({ node, ...props }) => (
  <div style={{ overflowX: 'auto' }}>
    <table
      style={{
        borderCollapse: 'collapse',
        width: '100%',
        margin: '16px 0',
      }}
      {...props}
    />
  </div>
);
const renderThCom = ({ node, ...props }) => (
  <th
    style={{
      border: '1px solid #ddd',
      padding: '8px',
      backgroundColor: '#f5f5f5',
    }}
    {...props}
  />
);
const renderTdCom = ({ node, ...props }) => (
  <td
    style={{
      border: '1px solid #ddd',
      padding: '8px',
    }}
    {...props}
  />
);

// 生成目录的函数
const generateTOC = (content) => {
  // 使用正则表达式匹配所有以 ## 开头的标题行
  // ^##+ 表示匹配以两个或更多 # 开头的行
  // .+ 表示匹配标题内容
  // gm 表示全局匹配和多行匹配
  const headings = content.match(/^##+ .+/gm) || [];
  // 将匹配到的标题行转换为目录项
  return headings.map((heading) => ({
    // 获取标题的层级（通过计算 # 的数量）
    level: heading.match(/##+/)[0].length,
    // 去除标题前的 # 和空格，获取纯文本标题
    title: heading.replace(/##+ /, ''),
    id: heading.replace(/##+ /, '').toLowerCase().replace(/\s+/g, '-'), // 生成锚点 ID
  }));
};

// eslint-disable-next-line react/prop-types
const MarkdownWithTOC = ({ content }) => {
  const [toc, setToc] = useState([]);
  useEffect(() => {
    setToc(generateTOC(content));
  }, [content]);

  return (
    <div style={{ display: 'flex' }}>
      {/* 目录侧边栏 */}
      <aside style={{ width: '200px', marginRight: '20px' }}>
        <h3>目录</h3>
        <ul>
          {toc.map((item, index) => (
            <li
              key={item.id || index}
              style={{ marginLeft: `${(item.level - 2) * 15}px` }}
            >
              <a href={`#${item.id}`}>{item.title}</a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Markdown 内容 */}
      <article style={{ flex: 'auto' }}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            table: renderTableCom,
            th: renderThCom,
            td: renderTdCom,
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
};

export default MarkdownWithTOC;
