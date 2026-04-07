/**
 * SEO 工具函数
 */
import { siteConfig } from '@data/site';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
  author?: string;
  canonical?: string;
}

/**
 * 生成完整的页面标题
 */
export function generateTitle(pageTitle?: string): string {
  if (!pageTitle) {
    return siteConfig.name;
  }
  return `${pageTitle} | ${siteConfig.name}`;
}

/**
 * 生成 meta description
 */
export function generateDescription(description?: string): string {
  return description || siteConfig.description;
}

/**
 * 生成 Open Graph 标签
 */
export function generateOG(props: SEOProps) {
  const { title, description, image, type = 'website' } = props;
  const fullTitle = generateTitle(title);
  const fullDescription = generateDescription(description);
  const ogImage = image || `${siteConfig.url}/og-image.jpg`;

  return {
    title: fullTitle,
    description: fullDescription,
    ogTitle: fullTitle,
    ogDescription: fullDescription,
    ogImage,
    ogType: type,
    twitterCard: 'summary_large_image',
    twitterTitle: fullTitle,
    twitterDescription: fullDescription,
    twitterImage: ogImage,
  };
}

/**
 * 生成结构化数据（JSON-LD）
 */
export function generateJsonLd(props: SEOProps & { url?: string }) {
  const { title, description, image, type = 'website', url, publishedTime } = props;
  const fullTitle = generateTitle(title);

  const baseData = {
    '@context': 'https://schema.org',
    '@type': type === 'article' ? 'Article' : 'WebSite',
    name: fullTitle,
    description: generateDescription(description),
    url: url || siteConfig.url,
  };

  if (type === 'article' && publishedTime) {
    return {
      ...baseData,
      headline: fullTitle,
      datePublished: publishedTime,
      author: {
        '@type': 'Person',
        name: siteConfig.author,
        url: siteConfig.url,
      },
      publisher: {
        '@type': 'Organization',
        name: siteConfig.name,
        logo: {
          '@type': 'ImageObject',
          url: `${siteConfig.url}/logo.png`,
        },
      },
      image: image || `${siteConfig.url}/og-image.jpg`,
    };
  }

  return baseData;
}

/**
 * 生成 sitemap URL 配置
 */
export function getSitemapUrls() {
  return [
    { url: siteConfig.url, lastmod: new Date().toISOString().split('T')[0], priority: '1.0' },
    { url: `${siteConfig.url}/posts`, priority: '0.9' },
    { url: `${siteConfig.url}/projects`, priority: '0.8' },
    { url: `${siteConfig.url}/tools`, priority: '0.7' },
    { url: `${siteConfig.url}/resume`, priority: '0.7' },
    { url: `${siteConfig.url}/about`, priority: '0.7' },
  ];
}
