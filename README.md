# 个人博客网站模板

一个基于 **Astro + Tailwind CSS + TypeScript** 的 Markdown 驱动型个人博客网站模板，专为技术人员设计，支持文章、项目、简历、关于页面与完整的 SEO 功能。

> 如果你是新手，也完全不用担心。本文档会手把手带你从零开始，直到网站上线。

---

## 目录

1. [特性](#1-特性)
2. [技术栈详解](#2-技术栈详解)
3. [技术架构](#3-技术架构)
4. [核心实现原理](#4-核心实现原理)
5. [关键代码解读](#5-关键代码解读)
6. [文件结构详解](#6-文件结构详解)
7. [快速开始](#7-快速开始)
8. [项目结构](#8-项目结构)
9. [内容管理](#9-内容管理)
10. [配置说明](#10-配置说明)
11. [功能使用指南](#11-功能使用指南)
12. [部署上线](#12-部署上线)
13. [常见问题](#13-常见问题)
14. [开发指南](#14-开发指南)
15. [更新日志](#15-更新日志)

---

## 1. 特性

| 特性 | 说明 |
|------|------|
| **Markdown 驱动** | 所有内容（文章、项目、工具、简历、关于）都通过 Markdown 文件管理，发布简单，无需后台 |
| **7 大模块** | 完整支持文章、标签、分类、实用工具、项目经验、个人简历、关于自己 |
| **SEO 友好** | 自动生成 sitemap.xml、robots.txt、RSS 订阅，支持 Open Graph 和 Twitter Card |
| **深色模式** | 支持浅色/深色模式切换，自动跟随系统，也可手动切换 |
| **响应式设计** | 完美适配手机、平板、桌面端，采用 Tailwind CSS 移动优先设计 |
| **高性能** | 静态输出，首屏加载快，零 JavaScript 默认输出 |
| **代码高亮** | 内置 Shiki 代码高亮，支持多种主题 |
| **易于部署** | 支持 Vercel、Netlify、Cloudflare Pages 一键部署 |
| **类型安全** | 全 TypeScript 支持，Content Collections 提供类型检查 |

---

## 2. 技术栈详解

### 2.1 核心技术栈

| 技术 | 版本 | 用途 | 官网 |
|------|------|------|------|
| **Astro** | ^4.16.0 | 静态网站生成器，核心框架 | https://astro.build |
| **TypeScript** | ^5.6.3 | 类型安全的 JavaScript 超集 | https://www.typescriptlang.org |
| **Tailwind CSS** | ^3.4.14 | 原子化 CSS 样式框架 | https://tailwindcss.com |
| **Node.js** | >=18.17.1 | JavaScript 运行时 | https://nodejs.org |

### 2.2 核心依赖

```json
{
  "dependencies": {
    "astro": "^4.16.0",           // 核心框架
    "@astrojs/tailwind": "^5.1.0", // Tailwind 集成
    "@astrojs/sitemap": "^3.2.0",  // Sitemap 生成
    "@astrojs/rss": "^4.0.7",       // RSS 订阅
    "tailwindcss": "^3.4.14",       // CSS 框架
    "@tailwindcss/typography": "^0.5.15", // 文章排版
    "sharp": "^0.33.5"             // 图片处理
  }
}
```

### 2.3 为什么选择这个技术栈？

#### 为什么选择 Astro？

| 维度 | Astro | Next.js | Nuxt | Hugo |
|------|-------|---------|------|------|
| 学习曲线 | 低 | 中 | 中 | 高（Go 语言） |
| 性能（首屏） | 最优 | 优 | 优 | 最优 |
| Markdown 支持 | 原生强大 | 需要配置 | 需要配置 | 原生强大 |
| 组件灵活度 | 支持多框架 | React only | Vue only | 不支持 |
| 维护成本 | 低 | 中 | 中 | 低 |

**Astro 的核心理念**：
- **Island Architecture**：页面默认零 JS，需要时再加载
- **Content Collections**：类型安全的 Markdown 内容管理
- **静态输出**：构建时生成纯 HTML，性能极佳

#### 为什么选择 Tailwind CSS？

- **原子化 CSS**：不需要写大量自定义 CSS 类
- **响应式**：内置断点系统，适配所有设备
- **深色模式**：原生支持 `dark:` 变体
- **类型安全**：支持 CSS 类型检查

#### 为什么选择 TypeScript？

- **类型安全**：编译时就能发现类型错误
- **智能提示**：编辑器提供更好的代码补全
- **重构友好**：重命名变量/函数更安全
- **文档作用**：类型本身就是最好的文档

---

## 3. 技术架构

### 3.1 系统架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                         用户浏览器                              │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        CDN / 静态资源                           │
│  (Vercel / Netlify / Cloudflare Pages)                         │
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                    静态 HTML 页面                               │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐             │
│  │  首页   │ │ 文章页  │ │ 项目页  │ │ 其他页  │             │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 构建时架构

```
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  Markdown    │───▶│   Astro      │───▶│    dist/     │
│  内容文件    │    │  Build       │    │  静态页面    │
└──────────────┘    └──────────────┘    └──────────────┘
       │                   │                    │
       ▼                   ▼                    ▼
┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│ Front Matter │    │   内容聚合    │    │   sitemap    │
│   Schema    │    │   函数库      │    │   RSS        │
└──────────────┘    └──────────────┘    └──────────────┘
```

### 3.3 核心模块关系

```
┌─────────────────────────────────────────────────────────────────┐
│                        src/pages/                               │
│                    （页面路由层）                               │
└─────────────────────────────┬───────────────────────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│   layouts/      │ │  components/   │ │    lib/        │
│   布局层        │ │   组件层        │ │   工具层        │
└────────┬────────┘ └────────┬────────┘ └────────┬────────┘
         │                   │                   │
         ▼                   ▼                   ▼
┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
│  BaseLayout     │ │ PostCard        │ │ content.ts      │
│  PostLayout     │ │ ProjectCard     │ │ seo.ts          │
│                 │ │ Header/Footer   │ │ taxonomy.ts     │
└─────────────────┘ └─────────────────┘ └────────┬────────┘
                                                │
                           ┌────────────────────┴────────────────────┐
                           ▼                                         ▼
                    ┌──────────────────┐                    ┌──────────────────┐
                    │   content/       │                    │     data/        │
                    │  内容集合层       │                    │    配置层        │
                    └──────────────────┘                    └──────────────────┘
                           │
     ┌─────────┬─────────┼─────────┬─────────┐
     ▼         ▼         ▼         ▼         ▼
┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐
│ posts/ │ │projects│ │ tools/ │ │ about/ │ │resume/ │
└────────┘ └────────┘ └────────┘ └────────┘ └────────┘
```

### 3.4 数据流向

#### 内容读取流程

```typescript
// 1. 定义内容集合 (src/content/config.ts)
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    // ...
  }),
});

// 2. 读取内容 (src/lib/content.ts)
import { getCollection } from 'astro:content';

export async function getAllPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

// 3. 页面中使用 (src/pages/posts/index.astro)
const posts = await getAllPosts();
```

#### 页面渲染流程

```
用户请求 /posts/xxx
        │
        ▼
Astro 匹配路由 → posts/[slug].astro
        │
        ▼
getStaticPaths() 获取所有文章 slug
        │
        ▼
getCollection('posts') 读取内容
        │
        ▼
render() 渲染 Markdown 为 HTML
        │
        ▼
PostLayout 包裹并添加 SEO
        │
        ▼
返回完整 HTML
```

---

## 4. 核心实现原理

### 4.1 Content Collections 工作原理

Astro 的 Content Collections 是本项目的核心，它提供了：

1. **类型安全的 Schema 定义**
2. **自动 Markdown 解析**
3. **构建时内容验证**

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',  // 标记为 Markdown 内容
  schema: z.object({
    title: z.string(),        // 字符串类型
    date: z.coerce.date(),    // 自动转换日期格式
    tags: z.array(z.string()), // 字符串数组
    draft: z.boolean().default(false), // 带默认值的布尔
  }),
});

export const collections = { posts };
```

**构建时发生什么**：
```
1. Astro 扫描 src/content/ 目录
2. 解析每个 Markdown 文件的 Front Matter
3. 根据 schema 验证数据类型
4. 生成类型定义文件 .astro/types.d.ts
5. 存储在集合中供页面查询
```

### 4.2 路由系统原理

Astro 使用**基于文件系统的路由**：

| 文件路径 | 生成的 URL |
|----------|------------|
| `pages/index.astro` | `/` |
| `pages/posts/index.astro` | `/posts` |
| `pages/posts/[slug].astro` | `/posts/xxx` |
| `pages/[tag].astro` | `/tag-name` |

**动态路由 [slug] 的工作方式**：

```astro
---
// src/pages/posts/[slug].astro
export async function getStaticPaths() {
  // 返回所有可能的 slug
  const posts = await getCollection('posts');
  return posts.map((post) => ({
    params: { slug: post.slug },  // URL 参数
    props: { post },              // 传递给页面的数据
  }));
}

const { post } = Astro.props;  // 获取当前文章
---
<article>{post.data.title}</article>
```

### 4.3 组件系统原理

Astro 组件是**.astro 文件**，它的特点：

- **模板优先**：HTML 为主，JS 在 `---` 代码块中
- **编译时处理**：组件在构建时转换为静态 HTML
- **默认零 JS**：除非使用 `client:*` 指令

```astro
---
// --- 之间的代码只在构建时执行一次
const title = "我的博客";
const posts = await getAllPosts();
---

<!-- 模板部分：编译为 HTML -->
<h1>{title}</h1>
<ul>
  {posts.map(post => (
    <li>{post.data.title}</li>
  ))}
</ul>

<script>
// 这部分代码会保留在客户端
console.log("仅在浏览器执行");
</script>
```

### 4.4 深色模式实现原理

本项目的深色模式通过以下方式实现：

#### 1. CSS 变量（src/styles/global.css）

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1e293b;
}

.dark {
  --color-bg: #0f172a;
  --color-text: #f1f5f9;
}
```

#### 2. Tailwind 配置（tailwind.config.mjs）

```javascript
export default {
  darkMode: 'class',  // 通过 class 切换深色模式
  // ...
};
```

#### 3. 主题切换脚本（src/components/common/ThemeToggle.astro）

```javascript
function getTheme() {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function applyTheme(theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  localStorage.setItem('theme', theme);
}
```

### 4.5 SEO 实现原理

#### 1. 元标签（src/components/seo/SEO.astro）

```astro
<!-- 生成标准 Meta 标签 -->
<meta name="description" content={description} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:image" content={image} />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
```

#### 2. Sitemap 自动生成

通过 `@astrojs/sitemap` 集成自动生成：

```javascript
// astro.config.mjs
export default defineConfig({
  integrations: [sitemap()],
});
```

构建后自动生成 `sitemap-index.xml` 和 `sitemap-0.xml`。

#### 3. RSS 订阅（src/pages/rss.xml.js）

```javascript
import rss from '@astrojs/rss';

export async function GET(context) {
  const posts = await getAllPosts();
  return rss({
    title: siteConfig.name,
    items: posts.map((post) => ({
      title: post.data.title,
      link: `/posts/${post.slug}/`,
    })),
  });
}
```

---

## 5. 关键代码解读

### 5.1 内容聚合函数（src/lib/content.ts）

这是项目的核心工具库，负责从 Content Collections 中获取和聚合数据：

```typescript
import { getCollection } from 'astro:content';

/** 获取所有已发布的文章（按日期倒序） */
export async function getAllPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** 获取文章的所有标签（带计数） */
export async function getAllTags() {
  const posts = await getAllPosts();
  const tagCount = new Map<string, number>();

  posts.forEach((post) => {
    post.data.tags?.forEach((tag) => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}
```

### 5.2 分类法工具（src/lib/taxonomy.ts）

处理标签和分类的聚合逻辑：

```typescript
/** 转换标签为 slug 格式 */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

/** 生成标签云样式（基于频率） */
export function getTagCloudStyle(tag: TagInfo, maxCount: number) {
  const ratio = maxCount > 1 ? (tag.count - 1) / (maxCount - 1) : 0;
  const fontSize = minSize + (maxSize - minSize) * ratio;
  return { fontSize: `${fontSize}px`, opacity: 0.6 + ratio * 0.4 };
}
```

### 5.3 基础布局（src/layouts/BaseLayout.astro）

所有页面的基础布局，包含 SEO、Header、Footer：

```astro
---
import SEO from '@components/seo/SEO.astro';
import Header from '@components/common/Header.astro';
import Footer from '@components/common/Footer.astro';
import '@styles/global.css';

interface Props {
  title?: string;
  description?: string;
  // ...
}
---

<html lang="zh-CN">
  <head>
    <SEO title={title} description={description} />
  </head>
  <body class="min-h-screen flex flex-col">
    <Header />
    <main class="flex-1">
      <slot />  {/* 页面内容插槽 */}
    </main>
    <Footer />
  </body>
</html>
```

### 5.4 文章详情页（src/pages/posts/[slug].astro）

展示单篇文章的页面：

```astro
---
import { getCollection, render } from 'astro:content';
import PostLayout from '@layouts/PostLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((post, index) => ({
    params: { slug: post.slug },
    props: { post, prevPost, nextPost },
  }));
}

const { post, prevPost, nextPost } = Astro.props;
const { Content, headings } = await render(post);
---

<PostLayout post={post} headings={headings}>
  <Content />
</PostLayout>
```

---

## 6. 文件结构详解

### 6.1 配置文件说明

| 文件 | 说明 | 重要程度 |
|------|------|----------|
| `package.json` | 项目依赖和脚本配置 | ⭐⭐⭐⭐⭐ |
| `astro.config.mjs` | Astro 构建配置 | ⭐⭐⭐⭐⭐ |
| `tailwind.config.mjs` | Tailwind CSS 配置 | ⭐⭐⭐⭐ |
| `tsconfig.json` | TypeScript 配置 | ⭐⭐⭐ |
| `.gitignore` | Git 忽略文件 | ⭐⭐ |

### 6.2 源代码目录结构

```
src/
├── components/           # UI 组件（可复用）
│   ├── common/          # 通用组件
│   │   ├── Header.astro  # 导航头
│   │   ├── Footer.astro # 页脚
│   │   ├── ThemeToggle.astro  # 主题切换
│   │   └── Pagination.astro   # 分页组件
│   ├── post/            # 文章相关
│   │   ├── PostCard.astro     # 文章卡片
│   │   ├── PostMeta.astro     # 文章元信息
│   │   └── TableOfContents.astro  # 目录
│   ├── project/         # 项目相关
│   │   └── ProjectCard.astro
│   ├── tool/            # 工具相关
│   │   └── ToolCard.astro
│   └── seo/             # SEO 相关
│       └── SEO.astro
│
├── content/             # 【核心】Markdown 内容
│   ├── config.ts        # 内容集合定义
│   ├── posts/           # 文章
│   ├── projects/        # 项目
│   ├── tools/           # 工具
│   ├── about/           # 关于页
│   └── resume/          # 简历
│
├── data/                # 配置文件
│   ├── site.ts          # 站点元信息
│   ├── navigation.ts    # 导航配置
│   └── categories.ts    # 分类配置
│
├── layouts/             # 布局模板
│   ├── BaseLayout.astro    # 基础布局
│   └── PostLayout.astro    # 文章布局
│
├── lib/                 # 工具函数
│   ├── content.ts       # 内容聚合
│   ├── seo.ts           # SEO 工具
│   ├── taxonomy.ts       # 分类法工具
│   └── utils.ts         # 通用工具
│
├── pages/               # 【核心】页面路由
│   ├── index.astro      # 首页
│   ├── posts/           # 文章模块
│   ├── projects/        # 项目模块
│   ├── tools/           # 工具模块
│   ├── tags/            # 标签模块
│   ├── categories/      # 分类模块
│   ├── search.astro     # 搜索页
│   ├── resume.astro     # 简历页
│   ├── about.astro      # 关于页
│   ├── 404.astro        # 404 页
│   └── rss.xml.js       # RSS 订阅
│
└── styles/              # 样式文件
    └── global.css       # 全局样式
```

---

## 7. 快速开始

### 2.1 环境要求

在开始之前，请确保你的电脑上已安装以下环境：

- **Node.js**：推荐 v20 LTS 或更高版本，最低支持 v18.17.1
- **npm**：v9.0.0 或更高版本（Node.js 自带）
- **代码编辑器**：推荐 VS Code，并安装以下插件：
  - Astro（官方插件，提供语法高亮和类型提示）
  - Tailwind CSS IntelliSense（Tailwind 代码补全）
  - Markdown All in One（Markdown 预览和格式化）

> 如何检查 Node.js 版本？
> ```bash
> node -v
> npm -v
> ```

### 2.2 安装步骤

#### 步骤 1：克隆或下载项目

如果你已经下载了项目压缩包，解压到本地即可。如果是从 GitHub 克隆：

```bash
git clone https://github.com/yourname/your-blog.git
cd your-blog
```

#### 步骤 2：安装依赖

```bash
npm install
```

> 首次安装可能需要 1-3 分钟，耐心等待即可。

#### 步骤 3：启动开发服务器

```bash
npm run dev
```

看到类似下面的输出就说明启动成功了：

```
 astro  v4.16.0 ready in 773 ms

┃ Local    http://localhost:4321/
┃ Network  use --host to expose
```

现在打开浏览器访问 **http://localhost:4321** 就可以看到网站了。

#### 步骤 4：停止开发服务器

在终端按 `Ctrl + C` 即可停止。

### 2.3 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（开发时使用） |
| `npm run build` | 构建静态网站（部署前使用） |
| `npm run preview` | 预览构建后的网站 |
| `npm run astro -- --help` | 查看 Astro 可用命令 |

### 2.4 目录结构概览

```
your-blog/
├── src/                          # 源代码目录（你的所有工作都在这里）
│   ├── components/               # 可复用的组件
│   │   ├── common/              # 通用组件（Header、Footer 等）
│   │   ├── post/                # 文章相关组件
│   │   ├── project/             # 项目相关组件
│   │   ├── tool/                # 工具相关组件
│   │   └── seo/                 # SEO 组件
│   ├── content/                 # 【重点】Markdown 内容目录
│   │   ├── posts/               # 文章
│   │   ├── projects/            # 项目经验
│   │   ├── tools/               # 实用工具
│   │   ├── about/               # 关于页面
│   │   └── resume/              # 简历页面
│   ├── data/                    # 【重点】配置文件
│   │   ├── site.ts              # 站点信息配置
│   │   ├── navigation.ts        # 导航配置
│   │   └── categories.ts       # 分类配置
│   ├── layouts/                 # 布局模板
│   ├── lib/                     # 工具函数库
│   ├── pages/                   # 路由页面
│   └── styles/                  # 全局样式
├── public/                      # 静态资源目录
│   ├── images/                  # 图片资源
│   ├── favicon.svg              # 网站图标
│   └── robots.txt               # 爬虫规则
├── package.json                # 项目依赖配置
├── astro.config.mjs             # Astro 配置
├── tailwind.config.mjs           # Tailwind CSS 配置
├── tsconfig.json                # TypeScript 配置
└── README.md                    # 项目说明文档（你正在看的）
```

---

## 8. 项目结构

### 8.1 核心目录说明

#### `src/content/` - 内容目录（最重要）

这是你日常使用最多的目录，所有内容都放在这里。每个子目录对应一种内容类型：

| 目录 | 用途 | URL 路由 |
|------|------|----------|
| `src/content/posts/` | 技术文章 | `/posts/` |
| `src/content/projects/` | 项目经验 | `/projects/` |
| `src/content/tools/` | 实用工具 | `/tools/` |
| `src/content/about/` | 关于页面 | `/about/` |
| `src/content/resume/` | 个人简历 | `/resume/` |

#### `src/data/` - 配置目录

存放网站的配置文件：

| 文件 | 用途 |
|------|------|
| `site.ts` | 站点名称、作者、描述、社交链接等 |
| `navigation.ts` | 导航菜单配置 |
| `categories.ts` | 分类元数据（名称、图标、描述） |

#### `src/pages/` - 页面路由

Astro 的路由是基于文件系统的，每个 `.astro` 文件对应一个页面：

| 文件 | 路由 | 说明 |
|------|------|------|
| `index.astro` | `/` | 首页 |
| `posts/index.astro` | `/posts` | 文章列表 |
| `posts/[slug].astro` | `/posts/xxx` | 文章详情 |
| `projects/index.astro` | `/projects` | 项目列表 |
| `projects/[slug].astro` | `/projects/xxx` | 项目详情 |
| `tools/index.astro` | `/tools` | 工具列表 |
| `resume.astro` | `/resume` | 简历页 |
| `about.astro` | `/about` | 关于页 |
| `tags/index.astro` | `/tags` | 标签云 |
| `tags/[tag].astro` | `/tags/xxx` | 标签详情 |
| `categories/index.astro` | `/categories` | 分类列表 |
| `categories/[category].astro` | `/categories/xxx` | 分类详情 |
| `search.astro` | `/search` | 搜索页 |
| `404.astro` | `/404` | 404 页面 |

#### `src/components/` - 组件目录

可复用的 UI 组件：

| 目录 | 包含组件 |
|------|----------|
| `common/` | Header（导航头）、Footer（页脚）、ThemeToggle（主题切换）、Pagination（分页） |
| `post/` | PostCard（文章卡片）、PostMeta（文章元信息）、TableOfContents（目录） |
| `project/` | ProjectCard（项目卡片） |
| `tool/` | ToolCard（工具卡片） |
| `seo/` | SEO（搜索引擎优化组件） |

#### `public/` - 静态资源目录

不需要经过构建处理的静态文件：

| 目录/文件 | 用途 |
|-----------|------|
| `images/` | 图片资源 |
| `favicon.svg` | 网站图标 |
| `robots.txt` | 爬虫规则 |

---

## 9. 内容管理

这是博客模板的核心部分。所有内容都通过 **Markdown 文件 + Front Matter** 进行管理。

### 4.1 什么是 Front Matter？

Front Matter 是 Markdown 文件头部的一段 YAML 格式元数据，用 `---` 包裹。它用于定义文章的标题、日期、分类、标签等信息。

```markdown
---
title: 文章标题
date: 2026-04-06
category: frontend
tags:
  - typescript
  - 教程
---

## 正文内容
```

### 4.2 添加文章

#### 步骤 1：创建 Markdown 文件

在 `src/content/posts/` 目录下创建一个新文件，文件名建议使用日期格式：

```
src/content/posts/2026-04-06-my-first-post.md
```

#### 步骤 2：编写 Front Matter

完整的内容模板如下：

```markdown
---
title: 文章标题（必填）
description: 文章简介，用于列表展示和 SEO（必填）
date: 2026-04-06（必填，发布日期）
updated: 2026-04-07（可选，最后更新日期）
draft: false（可选，true 为草稿，不会发布）
featured: true（可选，true 为精选文章）
category: frontend（必填，一级分类）
tags:（可选，标签列表）
  - typescript
  - 教程
  - react
cover: /images/posts/my-first-post/cover.jpg（可选，封面图）
readingTime: 5（可选，阅读时长 分钟）
seoTitle: 自定义 SEO 标题（可选）
seoDescription: 自定义 SEO 描述（可选）
---

## 正文内容

在这里写你的文章内容，可以使用 Markdown 语法。

### 二级标题

正文段落...

```代码```

- 列表项 1
- 列表项 2

> 引用内容
```

#### 步骤 3：查看效果

保存文件后，刷新浏览器 http://localhost:4321/posts 就可以看到新文章了。

### 4.3 添加项目经验

在 `src/content/projects/` 目录下创建文件：

```markdown
---
title: 项目名称（必填）
description: 项目简介（必填）
date: 2026-04-06（必填）
role: 全栈开发工程师（可选，你的角色）
company: 公司名（可选，所属公司）
status: completed（必填：planning | in-progress | completed | archived）
featured: true（可选，是否精选）
techStack:（必填，技术栈列表）
  - React
  - TypeScript
  - Node.js
  - PostgreSQL
cover: /images/projects/my-project/cover.jpg（可选，封面图）
demoUrl: https://demo.example.com（可选，在线演示地址）
repoUrl: https://github.com/xxx/xxx（可选，GitHub 仓库地址）
tags:（可选，标签）
  - react
  - fullstack
---

## 项目背景

介绍这个项目是为了解决什么问题而创建的。

## 技术方案

使用了哪些技术，为什么选择这些技术。

## 项目难点

遇到了哪些技术挑战，如何解决的。

## 项目成果

取得了什么成果，有什么数据可以量化。
```

### 4.4 添加工具推荐

在 `src/content/tools/` 目录下创建文件：

```markdown
---
title: 工具名称（必填）
description: 工具简介（必填）
type: dev-tool（必填：dev-tool | productivity | ai-tool | browser-extension | other）
tags:（可选）
  - 效率
  - macos
url: https://tool.example.com（可选，工具官网）
pricing: free（必填：free | freemium | paid）
featured: true（可选，是否推荐）
---

## 工具介绍

这个工具是做什么的，有什么特点。

## 使用场景

哪些场景下使用这个工具效果最好。

## 替代方案

有哪些类似的工具可以选择。
```

### 4.5 编辑关于页面

编辑 `src/content/about/index.md`：

```markdown
---
title: 关于我
subtitle: 副标题，如：全栈开发工程师 | 技术写作者
avatar: /images/about/avatar.jpg（可选，头像图片）
location: 上海（可选，所在城市）
email: hello@example.com（可选，邮箱）
socials:（可选，社交链接）
  github: https://github.com/yourname
  twitter: https://x.com/yourname
  linkedin: https://linkedin.com/in/yourname
skills:（可选，技能标签）
  - 前端开发
  - TypeScript
  - React
  - Node.js
---

## 你好

在这里用 Markdown 写你的个人介绍。

## 我在做什么

你的工作方向、兴趣爱好等。

## 联系我

如何联系你。
```

### 4.6 编辑简历

编辑 `src/content/resume/index.md`：

```markdown
---
name: 张三（必填）
title: 全栈开发工程师（必填）
location: 上海（可选）
email: hello@example.com（可选）
phone: "13800000000"（可选）
website: https://your-site.com（可选）
github: https://github.com/yourname（可选）
linkedin: https://linkedin.com/in/yourname（可选）
yearsOfExperience: 5（可选，工作年限）
skills:（可选，技能列表）
  - TypeScript
  - React
  - Node.js
  - PostgreSQL
---

# 个人简介

一段关于你自己的简介。

# 技术能力

## 前端技术

- React / Vue / Angular
- TypeScript
- Tailwind CSS

## 后端技术

- Node.js
- Python
- PostgreSQL

# 工作经历

## 公司名称 | 职位 | 时间

在这里描述你的工作经历...

# 项目经历

## 项目名称

描述项目情况...

# 教育经历

## 学校名称 | 专业 | 时间
```

---

## 10. 配置说明

### 5.1 站点配置（site.ts）

编辑 `src/data/site.ts` 来配置网站基本信息：

```typescript
export const siteConfig = {
  /** 网站名称 */
  name: '我的个人博客',

  /** 网站副标题 / Slogan */
  slogan: '记录思考，沉淀技术，分享成长',

  /** 网站描述（用于 SEO） */
  description: '一个专注于前端开发与技术分享的个人博客，记录学习与实践中的思考与经验。',

  /** 网站域名（部署后修改为你的实际域名） */
  url: 'https://your-site.com',

  /** 作者名称 */
  author: 'Your Name',

  /** 作者邮箱 */
  email: 'hello@example.com',

  /** 作者简介 */
  bio: '专注于前端与全栈开发的工程师，热衷于技术写作与开源贡献。',

  /** 默认语言 */
  language: 'zh-CN',

  /** 社交链接 */
  socials: {
    github: 'https://github.com/yourname',
    twitter: 'https://x.com/yourname',
    linkedin: 'https://linkedin.com/in/yourname',
    rss: '/rss.xml',
  },

  /** 导航配置（顶部菜单） */
  nav: [
    { name: '文章', href: '/posts' },
    { name: '项目', href: '/projects' },
    { name: '工具', href: '/tools' },
    { name: '简历', href: '/resume' },
    { name: '关于', href: '/about' },
  ],
};
```

### 5.2 分类配置（categories.ts）

编辑 `src/data/categories.ts` 来定义网站的分类：

```typescript
export const categories = [
  {
    slug: 'frontend',           // 分类标识（英文）
    name: '前端开发',            // 分类显示名称（中文）
    description: 'React、Vue、Angular 等前端框架，以及 CSS、TypeScript 等相关技术。',
    icon: '🎨',                 // 分类图标
    color: '#2563eb',           // 分类主题色
    order: 1,                   // 排序（数字越小越靠前）
  },
  {
    slug: 'backend',
    name: '后端开发',
    description: 'Node.js、Python、Go 等后端语言，以及 API 设计、数据库等。',
    icon: '⚙️',
    color: '#059669',
    order: 2,
  },
  // 添加更多分类...
] as const;
```

> **提示**：分类的 `slug` 必须与文章 Front Matter 中的 `category` 字段一致才能正确匹配。

### 5.3 导航配置（navigation.ts）

编辑 `src/data/navigation.ts` 来配置导航菜单：

```typescript
export const navigation = [
  {
    label: '首页',
    href: '/',
    icon: 'home',
  },
  {
    label: '文章',
    href: '/posts',
    icon: 'document',
  },
  // 添加更多导航项...
];
```

### 5.4 Astro 配置（astro.config.mjs）

编辑 `astro.config.mjs` 来配置 Astro：

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // 【重要】部署后修改为你的实际域名
  site: 'https://your-site.com',

  integrations: [
    tailwind(),      // Tailwind CSS 集成
    sitemap(),       // 自动生成 sitemap
  ],

  // Markdown 配置
  markdown: {
    shikiConfig: {
      theme: 'github-dark',  // 代码高亮主题
      wrap: true,            // 代码太长时自动换行
    },
  },
});
```

### 5.5 Tailwind 配置（tailwind.config.mjs）

编辑 `tailwind.config.mjs` 来自定义主题：

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  // 扫描的文件范围
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],

  // 启用深色模式（class 方式）
  darkMode: 'class',

  // 自定义主题色
  theme: {
    extend: {
      colors: {
        // 主色调（蓝色）
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          // ... 中间色阶
          600: '#2563eb',
          700: '#1d4ed8',
          // ...
        },
      },
    },
  },

  plugins: [
    require('@tailwindcss/typography'),  // 文章排版插件
  ],
};
```

---

## 11. 功能使用指南

### 6.1 如何发布新文章

1. 在 `src/content/posts/` 目录创建新的 `.md` 文件
2. 填写 Front Matter（参考上面的模板）
3. 撰写正文内容
4. 保存文件
5. 刷新浏览器查看效果

> **提示**：文章会自动按照日期倒序排列，最新的文章显示在最前面。

### 6.2 如何使用标签

在文章的 Front Matter 中使用 `tags` 字段：

```markdown
tags:
  - typescript
  - 教程
  - react
```

- 标签会自动聚合到标签页 `/tags`
- 点击标签可以查看所有使用该标签的文章
- 标签支持中文或英文，建议统一使用英文

### 6.3 如何使用分类

在文章的 Front Matter 中使用 `category` 字段：

```markdown
category: frontend
```

- 分类会在首页和分类页展示
- 建议一个文章只使用一个分类，标签可以使用多个

### 6.4 如何设置精选内容

在 Front Matter 中设置 `featured: true`：

```markdown
featured: true
```

- 精选的文章会显示在首页
- 精选的项目会显示在项目列表顶部

### 6.5 如何隐藏草稿文章

在 Front Matter 中设置 `draft: true`：

```markdown
draft: true
```

- 草稿文章不会发布，只在本地开发时可见
- 正式发布时改为 `draft: false` 或删除该字段

### 6.6 如何使用深色模式

网站支持三种模式：

1. **自动模式**：跟随系统设置（默认）
2. **手动切换**：点击导航栏中的太阳/月亮图标切换
3. **记住选择**：切换后会自动记住你的偏好

深色模式的样式定义在 `src/styles/global.css` 中，使用 Tailwind 的 `dark:` 变体实现。

### 6.7 如何使用搜索

访问 `/search` 页面：

- 输入关键词进行搜索
- 支持按类型筛选（文章/项目/工具）
- 搜索会匹配标题、描述、标签

### 6.8 如何使用 RSS 订阅

访问 `/rss.xml` 可以获取 RSS 订阅源：

- 在阅读器中添加 `https://your-site.com/rss.xml` 即可订阅
- 会自动推送所有已发布的文章

---

## 12. 部署上线

### 7.1 部署平台推荐

| 平台 | 推荐指数 | 说明 |
|------|----------|------|
| **Vercel** | ⭐⭐⭐⭐⭐ | 最推荐，免费额度够用，GitHub 自动部署 |
| **Netlify** | ⭐⭐⭐⭐ | 也很不错，功能类似 |
| **Cloudflare Pages** | ⭐⭐⭐⭐ | 性能好，免费额度大 |
| **GitHub Pages** | ⭐⭐⭐ | 可用但功能稍弱 |

下面以 **Vercel** 为例详细说明部署步骤。

### 7.2 Vercel 部署步骤（详细图文）

#### 步骤 1：准备代码

确保你的代码已经推送到 GitHub 仓库。如果没有：

```bash
# 初始化 git（如果还没有）
git init

# 添加所有文件
git add .
git commit -m "initial commit"

# 在 GitHub 创建仓库后，添加远程地址
git remote add origin https://github.com/yourname/your-blog.git

# 推送代码
git push -u origin main
```

#### 步骤 2：注册 Vercel 账号

1. 打开 https://vercel.com
2. 使用 GitHub 账号登录（推荐）
3. 授权 Vercel 访问你的 GitHub 仓库

#### 步骤 3：导入项目

1. 点击 "New Project" 按钮
2. 在列表中找到你的博客仓库
3. 点击 "Import" 按钮

#### 步骤 4：配置部署

1. 项目名称可以修改，也可以保持默认
2. 框架选择 "Astro"（通常会自动识别）
3. 构建命令保持 `npm run build`
4. 输出目录保持 `dist`
5. 点击 "Deploy" 按钮

#### 步骤 5：等待部署

部署过程通常需要 1-3 分钟。完成后你会看到一个绿色的 "Ready" 提示，并获得一个类似 `your-blog.vercel.app` 的网址。

#### 步骤 6：绑定自定义域名（可选）

1. 在 Vercel 项目设置中找到 "Domains"
2. 输入你购买的自定义域名
3. 按照提示配置 DNS 记录
4. 等待生效（通常几分钟到 24 小时）

### 7.3 部署后要修改的配置

部署完成后，记得修改以下配置：

1. **`src/data/site.ts` 中的 `url`**：
   ```typescript
   url: 'https://your-domain.com',  // 改成你的实际域名
   ```

2. **`astro.config.mjs` 中的 `site`**：
   ```javascript
   site: 'https://your-domain.com',  // 改成你的实际域名
   ```

这些配置会影响：
- SEO 的 canonical URL
- sitemap.xml 的 URL
- RSS 订阅的 URL
- Open Graph 的 URL

### 7.4 自动部署

当你修改代码并推送到 GitHub 后，Vercel 会自动重新部署：

```bash
# 修改代码后
git add .
git commit -m "update content"
git push
```

几分钟后，网站就会自动更新。

---

## 13. 常见问题

### 8.1 环境问题

#### Q: 提示 `node: command not found`

**A**: Node.js 没有安装或没有配置环境变量。请从 https://nodejs.org 下载安装 Node.js LTS 版本。

#### Q: 提示 `npm: command not found`

**A**: 这是 Node.js 的问题。请确保已正确安装 Node.js，安装后 npm 会自动可用。

#### Q: 安装依赖很慢/失败

**A**: 可以尝试使用国内的 npm 镜像：
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

### 8.2 开发问题

#### Q: 页面显示 "Cannot find module"

**A**: 可能是依赖没有安装完整。尝试：
```bash
rm -rf node_modules
npm install
```

#### Q: 修改了代码但页面没有更新

**A**: 确保开发服务器正在运行（`npm run dev`）。如果问题仍然存在，尝试重启：
```bash
# 按 Ctrl+C 停止
npm run dev
```

#### Q: TypeScript 报错

**A**: 检查 tsconfig.json 配置。本项目使用的配置排除了 rss.xml.js 文件，这是正常的。

### 8.3 内容问题

#### Q: 文章不显示

**A**: 检查以下几点：
1. Front Matter 格式是否正确（注意冒号后的空格）
2. `draft` 字段是否为 `false`
3. 文件是否在正确的目录（`src/content/posts/`）

#### Q: 标签/分类不显示

**A**: 标签和分类是从文章 Front Matter 自动提取的。确保文章中有正确的 `tags` 和 `category` 字段。

#### Q: 图片不显示

**A**: 图片必须放在 `public/` 目录下，路径使用绝对路径：
```markdown
![图片描述](/images/posts/my-post/cover.jpg)
```

### 8.4 样式问题

#### Q: 深色模式不生效

**A**: 检查浏览器是否支持深色模式检测。在设置中手动切换主题试一下。

#### Q: 样式乱了

**A**: 清除浏览器缓存后刷新。或者检查是否有自定义的 CSS 冲突。

### 8.5 部署问题

#### Q: 部署后页面 404

**A**: 检查 `astro.config.mjs` 中的 `site` 配置是否正确。同时确认构建命令和输出目录是否正确。

#### Q: 图片加载失败

**A**: 确保图片路径是绝对路径（以 `/` 开头），并且图片确实存在于 `public/` 目录。

#### Q: 搜索引擎不收录

**A**: 确保：
1. `robot.txt` 没有禁止爬虫
2. 提交 sitemap 到搜索引擎（https://search.google.com/search-console）
3. 配置了正确的 canonical URL

### 8.6 其他问题

#### Q: 如何添加评论区？

**A**: 推荐使用 Giscus，它是基于 GitHub Discussions 的免费评论系统。需要在 GitHub 仓库中开启 Discussions，然后在文章页面嵌入 Giscus 组件。

#### Q: 如何修改主题色？

**A**: 编辑 `tailwind.config.mjs` 中的 `colors.primary`，可以改成任意你喜欢的颜色。

#### Q: 如何添加统计功能？

**A**: 可以接入 Google Analytics、Umami、Plausible 等分析工具。通常在 `BaseLayout.astro` 的 `<head>` 中添加追踪代码。

---

## 14. 开发指南

### 9.1 添加新页面

在 `src/pages/` 目录下创建 `.astro` 文件即可自动生成路由。

示例：创建 `src/pages/contact.astro`：

```astro
---
import BaseLayout from '@layouts/BaseLayout.astro';
---

<BaseLayout title="联系我">
  <div class="container-custom py-12">
    <h1>联系我</h1>
    <p>你可以发送邮件到 hello@example.com</p>
  </div>
</BaseLayout>
```

访问 `/contact` 即可看到新页面。

### 9.2 添加新组件

在 `src/components/` 目录下创建 `.astro` 文件。

示例：创建 `src/components/common/Alert.astro`：

```astro
---
interface Props {
  type?: 'info' | 'warning' | 'error';
  message: string;
}

const { type = 'info', message } = Astro.props;
---

<div class={`alert alert-${type}`}>
  {message}
</div>
```

在页面中使用：

```astro
---
import Alert from '@components/common/Alert.astro';
---

<Alert type="warning" message="这是一个警告！" />
```

### 9.3 修改布局

布局文件在 `src/layouts/` 目录下：

- `BaseLayout.astro` - 基础布局，所有页面都基于它
- `PostLayout.astro` - 文章详情页专用布局

修改布局后，所有使用该布局的页面都会自动更新。

### 9.4 代码规范建议

1. **文件命名**：使用 kebab-case（短横线命名），如 `my-component.astro`
2. **组件命名**：使用 PascalCase，如 `PostCard.astro`
3. **变量命名**：使用 camelCase（驼峰命名）
4. **CSS 类名**：使用 Tailwind CSS 的类名，保持一致性
5. **注释**：复杂的逻辑添加适当的注释

### 9.5 推荐的开发流程

1. **修改内容** → 在 `src/content/` 目录下添加/修改 Markdown 文件
2. **预览效果** → 运行 `npm run dev` 查看效果
3. **构建测试** → 运行 `npm run build && npm run preview` 确保构建正常
4. **提交代码** → 使用 Git 提交并推送到远程仓库
5. **自动部署** → Vercel 会自动部署更新

---

## 15. 更新日志

### v1.0.0 (2026-04-06)

- 初始版本发布
- 支持 7 大模块（文章、标签、分类、工具、项目、简历、关于）
- 支持深色模式
- 支持响应式布局
- 支持 SEO 优化
- 支持 RSS 订阅
- 支持 sitemap 自动生成
- 支持 Vercel、Netlify 部署

---

## 许可证

MIT License - 欢迎使用、修改和分享！

如果你觉得这个项目对你有帮助，欢迎 Star ⭐️

---

## 致谢

- [Astro](https://astro.build) - 优秀的静态网站框架
- [Tailwind CSS](https://tailwindcss.com) - 美观的 CSS 框架
- [TypeScript](https://www.typescriptlang.org) - 类型安全的 JavaScript
