import { CategoryType, WordType } from './types';

const url = 'https://young-refuge-48512.herokuapp.com';
const reqHeaders = { 'Content-Type': 'application/json' };
/* LOGIN */
export async function login(
  username: string,
  password: string,
): Promise<string> {
  const body = JSON.stringify({ login: username, password });
  const resp = await fetch(`${url}/login`, {
    method: 'post',
    body,
    headers: reqHeaders,
  });
  if (resp.status === 403) {
    return null;
  }
  return (await resp.json()).accessToken;
}
/* CATEGORIES */
export async function getCategories(
  skip: number,
  limit: number,
): Promise<CategoryType[]> {
  const resp = await fetch(`${url}/categories/?skip=${skip}&limit=${limit}`, {
    method: 'GET',
    headers: reqHeaders,
  });
  if (resp.status === 200) {
    return (await resp.json()) as Promise<CategoryType[]>;
  }
  return null;
}

export async function deleteCategory(
  id: string,
  accessToken: string,
): Promise<void> {
  await fetch(`${url}/categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
}

export async function createCategory(
  name: string,
  accessToken: string,
): Promise<{ name: string; id: string }> {
  const resp = await fetch(`${url}/categories`, {
    method: 'POST',
    body: JSON.stringify({ name }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (resp.status === 200) {
    return (await resp.json()) as Promise<{ name: string; id: string }>;
  }

  return null;
}

export async function changeCategoryName(
  name: string,
  id: string,
  accessToken: string,
): Promise<void> {
  await fetch(`${url}/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ name }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
}
/* WORDS */
export async function getWords(
  id: string,
  skip: number,
  limit: number,
): Promise<WordType[]> {
  const resp = await fetch(`${url}/words/${id}/?skip=${skip}&limit=${limit}`, {
    method: 'GET',
    headers: reqHeaders,
  });
  if (resp.status === 200) {
    return (await resp.json()) as Promise<WordType[]>;
  }

  return [];
}

export async function createWord(
  categoryId: string,
  english: string,
  russian: string,
  audioSrc: string,
  imageSrc: string,
  accessToken: string,
): Promise<void> {
  await fetch(`${url}/words`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      english,
      russian,
      audioSrc,
      imageSrc,
      id: categoryId,
    }),
  });
}

export async function deleteWord(
  wordId: string,
  categoryId: string,
  accessToken: string,
): Promise<void> {
  await fetch(`${url}/words`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ wordId, categoryId }),
  });
}

export async function updateWord(
  word: WordType,
  categoryId: string,
  accessToken: string,
): Promise<void> {
  await fetch(`${url}/words`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ word, categoryId }),
  });
}
