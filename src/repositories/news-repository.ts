import { newsData } from "protocols";
import prisma from "../database";

export function findAllNews() {
  return prisma.news.findMany({
    orderBy: {
      publicationDate: "desc",
    },
  });
}

export function findNewsById(id: number) {
  return prisma.news.findUnique({
    where: { id },
  });
}
export function findNewsByTitle(title: string) {
  const noticia = prisma.news.findUnique({
    where: { title },
  });
  console.log(noticia);
  return noticia;
}
export function findNewsWithFilters(
  page: number,
  order: "asc" | "desc",
  title?: string
) {
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  return prisma.news.findMany({
    where: title
      ? { title: { contains: title, mode: "insensitive" } }
      : undefined,
    orderBy: { publicationDate: order },
    skip,
    take: pageSize,
  });
}

export async function createNews(newsData: newsData) {
  return prisma.news.create({
    data: { ...newsData, publicationDate: new Date(newsData.publicationDate) },
  });
}

export async function updateNews(id: number, newsData: newsData) {
  return prisma.news.update({
    where: { id },
    data: { ...newsData, publicationDate: new Date(newsData.publicationDate) },
  });
}

export async function deleteNews(id: number) {
  return prisma.news.delete({
    where: { id },
  });
}
