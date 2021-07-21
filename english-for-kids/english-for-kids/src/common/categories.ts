import { CategoryType } from './types';

let internalCategories: CategoryType[] = null;

export function categories(): CategoryType[] {
  return internalCategories;
}

export function updateCategories(newCategories: CategoryType[]): void {
  internalCategories = newCategories;
}
