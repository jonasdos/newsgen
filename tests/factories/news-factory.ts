import { faker } from "@faker-js/faker";
import prisma from "../../src/database";
import { newsData } from "protocols";

export function generateRandomNews(firstHand = false): newsData {
  return {
    author: faker.person.fullName(),
    firstHand,
    text: faker.lorem.paragraphs(5),
    publicationDate: faker.date.future(),
    title: faker.lorem.words(7),
  };
}
export function generateNewsForTitleTest(firstHand = false): newsData {
  return {
    author: faker.person.fullName(),
    firstHand,
    text: faker.lorem.paragraphs(5),
    publicationDate: faker.date.future(),
    title: "Titulo específico para teste",
  };
}
export async function persistTitleTestNews(firstHand = false) {
  return await prisma.news.create({
    data: generateNewsForTitleTest(firstHand),
  });
}

export async function persistNewRandomNews(firstHand = false) {
  return await prisma.news.create({
    data: generateRandomNews(firstHand),
  });
}

export async function persistNewRandomNewsInThePast(firstHand = false) {
  const eventData = generateRandomNews(firstHand);
  eventData.publicationDate = faker.date.past();

  return await prisma.news.create({
    data: eventData,
  });
}
