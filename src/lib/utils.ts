/**
 * 通用工具函数
 */

/**
 * 格式化日期
 * @param date Date 对象或日期字符串
 * @param locale 语言，默认为中文
 */
export function formatDate(date: Date | string, locale = 'zh-CN'): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * 格式化日期（简短格式）
 */
export function formatDateShort(date: Date | string, locale = 'zh-CN'): string {
  const d = new Date(date);
  return d.toLocaleDateString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * 计算阅读时长
 * @param content 文章内容
 * @param wpm 每分钟阅读字数，默认为 200
 */
export function calculateReadingTime(content: string, wpm = 200): number {
  // 移除 front matter
  const text = content.replace(/^---[\s\S]*?---/, '');
  // 移除 markdown 语法
  const cleanText = text
    .replace(/```[\s\S]*?```/g, '') // 代码块
    .replace(/`[^`]*`/g, '') // 行内代码
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // 链接
    .replace(/[#*_~`>]/g, '') // markdown 标记
    .replace(/\s+/g, ' ') // 多个空格合并
    .trim();

  const words = cleanText.length;
  const minutes = Math.ceil(words / wpm);
  return Math.max(1, minutes);
}

/**
 * 生成分类 slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
}

/**
 * 获取字符串首字母
 */
export function getInitials(text: string): string {
  return text
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * 截断字符串
 */
export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

/**
 * 移除 HTML 标签
 */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '');
}

/**
 * 生成随机 ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * 判断是否为相对路径
 */
export function isRelativePath(path: string): boolean {
  return path.startsWith('/') && !path.startsWith('//');
}

/**
 * 规范化 URL
 */
export function normalizeUrl(path: string, base: string): string {
  if (isRelativePath(path)) {
    return `${base.replace(/\/$/, '')}${path}`;
  }
  return path;
}

/**
 * 对象转查询字符串
 */
export function toQueryString(params: Record<string, string | number | boolean>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });
  return searchParams.toString();
}

/**
 * 深拷贝
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * 防抖函数
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * 节流函数
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
