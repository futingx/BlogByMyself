---
/**
 * RSS 订阅源
 */
import rss from '@astrojs/rss';
import { getAllPosts } from '@lib/content';
import { siteConfig } from '@data/site';

export async function GET(context) {
  const posts = await getAllPosts();

  return rss({
    title: siteConfig.name,
    description: siteConfig.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
      categories: post.data.tags,
    })),
    customData: `<language>zh-cn</language>`,
  });
}
