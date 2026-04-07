/**
 * 站点元信息配置
 * 修改此文件中的信息来定制你的个人站点
 */
export const siteConfig = {
  /** 站点名称 */
  name: '我的个人博客',

  /** 站点副标题 / Slogan */
  slogan: '记录思考，沉淀技术，分享成长',

  /** 站点描述（用于 SEO） */
  description: '一个专注于前端开发与技术分享的个人博客，记录学习与实践中的思考与经验。',

  /** 站点域名（部署后修改） */
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

  /** 导航配置 */
  nav: [
    { name: '文章', href: '/posts' },
    { name: '项目', href: '/projects' },
    { name: '工具', href: '/tools' },
    { name: '简历', href: '/resume' },
    { name: '关于', href: '/about' },
  ],
};

/**
 * 网站页脚配置
 */
export const footerConfig = {
  /** 版权年份 */
  copyrightYear: new Date().getFullYear(),

  /** 备案信息（可选） */
  ICP: '',

  /** 显示在页脚的简短描述 */
  shortDescription: '用 Markdown 驱动的内容管理系统',
};
