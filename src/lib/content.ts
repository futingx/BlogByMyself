/**
 * 内容集合工具库
 * 提供统一的文章、项目、工具等内容查询和聚合函数
 */
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/**
 * ================================
 * 文章相关
 * ================================
 */

/** 获取所有已发布的文章（按日期倒序） */
export async function getAllPosts() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** 获取精选文章 */
export async function getFeaturedPosts(limit = 5) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.featured).slice(0, limit);
}

/** 获取最新文章 */
export async function getRecentPosts(limit = 10) {
  const posts = await getAllPosts();
  return posts.slice(0, limit);
}

/** 根据 slug 获取单篇文章 */
export async function getPostBySlug(slug: string) {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.find((post) => post.slug === slug);
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

  // 按出现次数排序
  return Array.from(tagCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}

/** 获取文章的所有分类（带计数） */
export async function getAllCategories() {
  const posts = await getAllPosts();
  const categoryCount = new Map<string, number>();

  posts.forEach((post) => {
    const category = post.data.category;
    categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
  });

  return Array.from(categoryCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([category, count]) => ({ category, count }));
}

/** 获取指定标签下的所有文章 */
export async function getPostsByTag(tag: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.tags?.includes(tag));
}

/** 获取指定分类下的所有文章 */
export async function getPostsByCategory(category: string) {
  const posts = await getAllPosts();
  return posts.filter((post) => post.data.category === category);
}

/** 获取相关文章（基于标签） */
export async function getRelatedPosts(currentSlug: string, tags: string[], limit = 5) {
  const posts = await getAllPosts();
  return posts
    .filter((post) => {
      if (post.slug === currentSlug) return false;
      return post.data.tags?.some((tag) => tags.includes(tag));
    })
    .slice(0, limit);
}

/**
 * ================================
 * 项目相关
 * ================================
 */

/** 获取所有已发布的项目 */
export async function getAllProjects() {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

/** 获取精选项目 */
export async function getFeaturedProjects(limit = 6) {
  const projects = await getAllProjects();
  return projects.filter((project) => project.data.featured).slice(0, limit);
}

/** 获取所有项目标签（带计数） */
export async function getProjectTags() {
  const projects = await getAllProjects();
  const tagCount = new Map<string, number>();

  projects.forEach((project) => {
    project.data.techStack?.forEach((tag) => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
    project.data.tags?.forEach((tag) => {
      tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
    });
  });

  return Array.from(tagCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));
}

/**
 * ================================
 * 工具相关
 * ================================
 */

/** 获取所有工具 */
export async function getAllTools() {
  const tools = await getCollection('tools');
  return tools.sort((a, b) => a.data.title.localeCompare(b.data.title));
}

/** 获取精选工具 */
export async function getFeaturedTools(limit = 10) {
  const tools = await getAllTools();
  return tools.filter((tool) => tool.data.featured).slice(0, limit);
}

/** 按类型获取工具 */
export async function getToolsByType(type: string) {
  const tools = await getAllTools();
  return tools.filter((tool) => tool.data.type === type);
}

/**
 * ================================
 * 关于页面相关
 * ================================
 */

/** 获取关于页面内容 */
export async function getAboutPage() {
  const about = await getCollection('about');
  return about[0];
}

/**
 * ================================
 * 简历相关
 * ================================
 */

/** 获取简历内容 */
export async function getResumePage() {
  const resume = await getCollection('resume');
  return resume[0];
}

/**
 * ================================
 * 类型导出
 * ================================
 */

export type Post = CollectionEntry<'posts'>;
export type Project = CollectionEntry<'projects'>;
export type Tool = CollectionEntry<'tools'>;
export type About = CollectionEntry<'about'>;
export type Resume = CollectionEntry<'resume'>;
