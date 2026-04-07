---
title: 用 Astro 搭建可部署的个人博客模板
description: 介绍如何使用 Astro、Tailwind CSS 和 Markdown 搭建一个高性能、SEO 友好、可部署上线的个人博客网站。
date: 2026-04-06
updated: 2026-04-06
draft: false
featured: true
category: frontend
tags:
  - astro
  - markdown
  - blog
  - seo
  - tailwind
cover: /images/posts/build-blog-with-astro/cover.jpg
readingTime: 8
---

## 为什么选择 Astro

在选择博客框架时，我考虑了以下因素：

1. **性能优先**：静态生成的页面加载更快
2. **Markdown 支持**：希望内容用 Markdown 管理
3. **SEO 友好**：需要被搜索引擎收录
4. **维护成本低**：不想频繁更新依赖

[Astro](https://astro.build) 是一个非常适合内容型网站的框架，它具备：

- 默认静态输出，性能优秀
- 对 Markdown/MDX 支持完善
- 支持从 Vue、React 等框架渐进式迁移
- 开发体验好，文档完善

## 技术栈选择

### 核心框架
- **Astro** - 静态网站生成器
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式方案

### 内容管理
- **Markdown + Front Matter** - 内容存储
- **Astro Content Collections** - 内容类型定义

### 功能扩展
- **@astrojs/sitemap** - 自动生成站点地图
- **@astrojs/rss** - RSS 订阅
- **Giscus** - 评论系统（基于 GitHub Discussions）

## 项目结构

```
my-blog/
├── src/
│   ├── components/     # 组件
│   ├── content/        # Markdown 内容
│   ├── layouts/       # 布局模板
│   ├── lib/           # 工具函数
│   ├── pages/         # 路由页面
│   └── styles/        # 全局样式
├── public/            # 静态资源
└── 配置文件
```

## 快速开始

### 1. 创建项目

```bash
npm create astro@latest my-blog
```

### 2. 安装依赖

```bash
npm install @astrojs/tailwind tailwindcss @tailwindcss/typography
```

### 3. 添加内容

在 `src/content/posts/` 目录下创建 Markdown 文件：

```markdown
---
title: 我的第一篇文章
date: 2026-04-06
category: frontend
tags:
  - 教程
---

## 正文内容
```

### 4. 启动开发

```bash
npm run dev
```

## SEO 配置建议

博客模板必须做好 SEO：

1. **设置站点元信息**：在 `src/data/site.ts` 中配置
2. **生成 sitemap**：Astro 已内置支持
3. **添加 RSS 订阅**：方便读者订阅
4. **优化 meta 标签**：每个页面有唯一的 title 和 description

## 部署上线

推荐使用 **Vercel** 部署：

1. 将代码推送到 GitHub
2. 在 Vercel 导入项目
3. 自动部署完成

## 总结

使用 Astro 搭建博客的优势：

- **简单**：学习曲线低，上手快
- **快速**：静态输出，性能优秀
- **灵活**：支持 React/Vue 组件
- **持久**：维护成本低，不过时

如果你也在考虑搭建个人博客，强烈推荐尝试 Astro。
