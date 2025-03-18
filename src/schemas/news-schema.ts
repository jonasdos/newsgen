import joi from "joi";
import { newsData } from "protocols";

export const newsSchema = joi.object<newsData>({
  title: joi.string().required(),
  text: joi.string().required(),
  author: joi.string().required(),
  firstHand: joi.boolean().optional(),
  publicationDate: joi.date().required(),
});
