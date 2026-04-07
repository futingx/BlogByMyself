/**
 * 分类法工具库
 * 用于标签、分类的聚合与关联
 */
import { getAllPosts, getAllProjects } from './content';

/**
 * 标签统计信息
 */
export interface TagInfo {
  tag: string;
  count: number;
  slug: string;
}

/**
 * 分类统计信息
 */
export interface CategoryInfo {
  category: string;
  count: number;
  slug: string;
  name?: string;
  description?: string;
}

/**
 * 转换标签为 slug 格式
 */
export function tagToSlug(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '');
}

/**
 * 从文章中聚合所有标签
 */
export async function aggregateTags() {
  const posts = await getAllPosts();
  const tagMap = new Map<string, number>();

  posts.forEach((post) => {
    post.data.tags?.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });

  const tags: TagInfo[] = Array.from(tagMap.entries())
    .map(([tag, count]) => ({
      tag,
      count,
      slug: tagToSlug(tag),
    }))
    .sort((a, b) => b.count - a.count);

  return tags;
}

/**
 * 从文章中聚合所有分类
 */
export async function aggregateCategories() {
  const posts = await getAllPosts();
  const categoryMap = new Map<string, number>();

  posts.forEach((post) => {
    const category = post.data.category;
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
  });

  const categories: CategoryInfo[] = Array.from(categoryMap.entries())
    .map(([category, count]) => ({
      category,
      count,
      slug: category,
    }))
    .sort((a, b) => b.count - a.count);

  return categories;
}

/**
 * 获取文章的标签云数据
 */
export async function getTagCloud(minCount = 1) {
  const tags = await aggregateTags();
  return tags.filter((tag) => tag.count >= minCount);
}

/**
 * 生成标签云样式（基于频率）
 */
export function getTagCloudStyle(tag: TagInfo, maxCount: number, minSize = 12, maxSize = 32) {
  const ratio = maxCount > 1 ? (tag.count - 1) / (maxCount - 1) : 0;
  const fontSize = minSize + (maxSize - minSize) * ratio;

  return {
    fontSize: `${fontSize}px`,
    opacity: 0.6 + ratio * 0.4,
  };
}

/**
 * 获取项目按技术栈聚合的数据
 */
export async function aggregateTechStack() {
  const projects = await getAllProjects();
  const techMap = new Map<string, number>();

  projects.forEach((project) => {
    project.data.techStack?.forEach((tech) => {
      techMap.set(tech, (techMap.get(tech) || 0) + 1);
    });
  });

  return Array.from(techMap.entries())
    .map(([tech, count]) => ({ tech, count }))
    .sort((a, b) => b.count - a.count);
}
