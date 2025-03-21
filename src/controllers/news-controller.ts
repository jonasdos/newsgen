import { Request, Response } from "express";
import httpStatus from "http-status";
import * as service from "./../services/news-service";
import { newsData } from "protocols";

export async function getNews(req: Request, res: Response) {
  const page = parseInt(req.query.page as string) || 1; // Página padrão é 1
  const order =
    req.query.order === "desc" || req.query.order === "asc"
      ? req.query.order
      : "desc";
  const title = (req.query.title as string) || undefined;

  try {
    const news = await service.getFilteredNews(page, order, title);
    return res.status(httpStatus.OK).send(news);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function getNewsById(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");
  }

  const news = await service.getNewsById(id);
  return res.send(news);
}

export async function createNews(req: Request, res: Response) {
  const newsData = req.body as newsData;
  const createdNews = await service.createNews(newsData);

  return res.status(httpStatus.CREATED).send(createdNews);
}

export async function alterNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");
  }

  const newsData = req.body as newsData;
  const alteredNews = await service.updateNews(id, newsData);

  return res.send(alteredNews);
}

export async function deleteNews(req: Request, res: Response) {
  const id = parseInt(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(httpStatus.BAD_REQUEST).send("Id is not valid.");
  }

  await service.removeNews(id);
  return res.sendStatus(httpStatus.NO_CONTENT);
}
