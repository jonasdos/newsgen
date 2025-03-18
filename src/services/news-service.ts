import { newsData } from "protocols";
import * as newsRepository from "../repositories/news-repository";

export async function getAllNews() {
  return newsRepository.findAllNews();
}

export async function getNewsById(newsId: number) {
  const news = await newsRepository.findNewsById(newsId);
  if (!news) {
    throw {
      name: "NotFound",
      message: `News with id ${newsId} not found.`,
    };
  }

  return news;
}

export async function createNews(newsData: newsData) {
  await validateNewsCreation(newsData);
  return newsRepository.createNews(newsData);
}

export async function updateNews(newsId: number, updatedNewsData: newsData) {
  const existingNews = await getNewsById(newsId);
  await validateNewsUpdate(updatedNewsData, existingNews.title);

  return newsRepository.updateNews(newsId, updatedNewsData);
}

export async function removeNews(newsId: number) {
  await getNewsById(newsId);
  return newsRepository.deleteNews(newsId);
}

async function validateNewsCreation(newsData: newsData) {
  await ensureTitleIsUnique(newsData.title);
  validateTextLength(newsData.text);
  validatePublicationDate(newsData.publicationDate);
}

async function validateNewsUpdate(newsData: newsData, existingTitle: string) {
  if (newsData.title !== existingTitle) {
    await ensureTitleIsUnique(newsData.title);
  }
  validateTextLength(newsData.text);
  validatePublicationDate(newsData.publicationDate);
}

async function ensureTitleIsUnique(title: string) {
  const existingNews = await newsRepository.findNewsByTitle(title);
  if (existingNews) {
    throw {
      name: "Conflict",
      message: `News with title "${title}" already exists.`,
    };
  }
}

function validateTextLength(text: string) {
  if (text.length < 500) {
    throw {
      name: "BadRequest",
      message: "The news text must be at least 500 characters long.",
    };
  }
}

function validatePublicationDate(publicationDate: Date) {
  const currentDate = new Date();
  const parsedPublicationDate = new Date(publicationDate);
  if (parsedPublicationDate.getTime() < currentDate.getTime()) {
    throw {
      name: "BadRequest",
      message: "The publication date cannot be in the past.",
    };
  }
}
