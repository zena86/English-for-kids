import { Request } from 'express';

export default interface RequestType extends Request {
  query: { skip: string; limit: string };
}
export interface WordType {
  english: string;
  russian: string;
  imageSrc: string;
  audioSrc: string;
  wordId: string;
}

export interface CategoryType {
  name: string;
  words: WordType[];
  _id: string;
}
