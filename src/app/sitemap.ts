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
    '',
    '/about',
    '/metropolitans',
    '/parishes',
    '/news',
    '/archive',
    '/timeline',
    '/gallery',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: post.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const metroUrls = metros.map((metro) => ({
    url: `${baseUrl}/metropolitans/${metro.slug}`,
    lastModified: metro.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const newsUrls = newsList.map((news) => ({
    url: `${baseUrl}/news/${news.id}`,
    lastModified: news.date || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  const parishUrls = parishes.map((p) => ({
    url: `${baseUrl}/parishes/${p.id}`,
    lastModified: p.updatedAt || new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticUrls, ...postUrls, ...metroUrls, ...newsUrls, ...parishUrls];
}
