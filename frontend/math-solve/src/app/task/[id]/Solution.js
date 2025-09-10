"use client"
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

export default function Solution({ text }) {
  if (!text) return <div>Решение не предоставлено.</div>;

  return (
    <div className="max-w-full break-words text-left">
      <ReactMarkdown
        remarkPlugins={[remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          p: ({ node, ...props }) => <div {...props} />, // заменяем все p на div
        }}
      >
        {text}
      </ReactMarkdown>

    </div>
  );
}
