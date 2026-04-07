/**
 * 分类元数据配置
 * 定义网站的一级分类，可包含名称、描述、图标等
 */
export const categories = [
  {
    slug: 'frontend',
    name: '前端开发',
    description: 'React、Vue、Angular 等前端框架，以及 CSS、TypeScript 等相关技术。',
    icon: '🎨',
    color: '#2563eb',
    order: 1,
  },
  {
    slug: 'backend',
    name: '后端开发',
    description: 'Node.js、Python、Go 等后端语言，以及 API 设计、数据库等。',
    icon: '⚙️',
    color: '#059669',
    order: 2,
  },
  {
    slug: 'devops',
    name: 'DevOps',
    description: 'Docker、Kubernetes、CI/CD、云计算等运维与基础设施相关。',
    icon: '🚀',
    color: '#7c3aed',
    order: 3,
  },
  {
    slug: 'ai',
    name: 'AI 与机器学习',
    description: '人工智能、机器学习、深度学习、大语言模型应用等。',
    icon: '🤖',
    color: '#db2777',
    order: 4,
  },
  {
    slug: 'tools',
    name: '开发工具',
    description: '编辑器、插件、效率工具，以及各类开发辅助软件。',
    icon: '🔧',
    color: '#ea580c',
    order: 5,
  },
  {
    slug: 'career',
    name: '职业发展',
    description: '程序员职业发展、面试经验、技术成长与学习方法论。',
    icon: '📈',
    color: '#0891b2',
    order: 6,
  },
  {
    slug: 'notes',
    name: '随手记',
    description: '日常笔记、问题记录、解决方案等碎片化内容。',
    icon: '📝',
    color: '#64748b',
    order: 7,
  },
] as const;

/**
 * 获取所有分类（按 order 排序）
 */
export function getCategories() {
  return [...categories].sort((a, b) => a.order - b.order);
}

/**
 * 根据 slug 获取分类信息
 */
export function getCategoryBySlug(slug: string) {
  return categories.find((cat) => cat.slug === slug);
}

/**
 * 获取分类名称
 */
export function getCategoryName(slug: string): string {
  const category = getCategoryBySlug(slug);
  return category?.name || slug;
}
