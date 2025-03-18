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
  return prisma.news.findUnique({
    where: { title },
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
