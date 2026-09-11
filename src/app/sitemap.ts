import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://nuhro-thozhiyoor.vercel.app';

  let posts: any[] = [];
  let metros: any[] = [];
  let newsList: any[] = [];
  let parishes: any[] = [];

  try {
    posts = await prisma.post.findMany({ where: { published: true } });
    metros = await prisma.metropolitan.findMany();
    newsList = await prisma.news.findMany();
    parishes = await prisma.parish.findMany();
  } catch (err) {
    console.error("Sitemap query error:", err);
  }

  const staticUrls = [
    { route: '', priority: 1.0, freq: 'daily' as const },
    { route: '/news', priority: 0.9, freq: 'daily' as const },
    { route: '/metropolitans', priority: 0.9, freq: 'weekly' as const },
    { route: '/parishes', priority: 0.8, freq: 'weekly' as const },
    { route: '/about', priority: 0.8, freq: 'monthly' as const },
    { route: '/archive', priority: 0.8, freq: 'weekly' as const },
    { route: '/timeline', priority: 0.7, freq: 'monthly' as const },
    { route: '/gallery', priority: 0.7, freq: 'monthly' as const },
    { route: '/contact', priority: 0.6, freq: 'monthly' as const },
  ].map(({ route, priority, freq }) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: freq,
    priority,
  }));

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const metroUrls = metros.map((metro) => ({
    url: `${baseUrl}/metropolitans/${metro.slug}`,
    lastModified: metro.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const newsUrls = newsList.map((news) => ({
    url: `${baseUrl}/news/${news.id}`,
    lastModified: news.date || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const parishUrls = parishes.map((p) => ({
    url: `${baseUrl}/parishes/${p.id}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticUrls, ...postUrls, ...metroUrls, ...newsUrls, ...parishUrls];
}
