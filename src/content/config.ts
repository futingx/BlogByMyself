import { defineCollection, z } from 'astro:content';

/**
 * 文章集合配置
 */
const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    readingTime: z.number().optional(),
  }),
});

/**
 * 项目经验集合配置
 */
const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    role: z.string().optional(),
    company: z.string().optional(),
    status: z.enum(['planning', 'in-progress', 'completed', 'archived']).default('completed'),
    featured: z.boolean().default(false),
    techStack: z.array(z.string()).default([]),
    cover: z.string().optional(),
    demoUrl: z.string().url().optional(),
    repoUrl: z.string().url().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

/**
 * 实用工具集合配置
 */
const tools = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    type: z.enum(['dev-tool', 'productivity', 'ai-tool', 'browser-extension', 'other']).default('dev-tool'),
    tags: z.array(z.string()).default([]),
    url: z.string().url().optional(),
    pricing: z.enum(['free', 'freemium', 'paid']).default('free'),
    featured: z.boolean().default(false),
  }),
});

/**
 * 关于页面集合（单页）
 */
const about = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    avatar: z.string().optional(),
    location: z.string().optional(),
    email: z.string().email().optional(),
    socials: z.record(z.string()).optional(),
    skills: z.array(z.string()).optional(),
  }).strict(),
});

/**
 * 简历集合（单页）
 */
const resume = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    title: z.string(),
    location: z.string().optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    website: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    yearsOfExperience: z.number().optional(),
    skills: z.array(z.string()).optional(),
  }).strict(),
});

/**
 * 导出所有集合
 */
export const collections = {
  posts,
  projects,
  tools,
  about,
  resume,
};
