/** @jsxImportSource react */

import MarkdownWithTOC from './MarkdownRenderer';
// eslint-disable-next-line import/no-unresolved
import markdownContent from '../assets/interview-notes.md?raw';
// ?raw 后缀
// 1. 这是 Vite 的特殊查询参数;
// 2. 表示以原始字符串的形式导入文件内容，而不是作为模块处理;
// 3. 适合用于导入纯文本文件，如 Markdown、JSON 等

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <MarkdownWithTOC content={markdownContent} />
    </div>
  );
}
