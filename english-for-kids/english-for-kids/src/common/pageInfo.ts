import { PageInfo } from './types';

export default function getPage(): PageInfo {
  const url = window.location.hash.slice(2).toLowerCase() || '/';
  const urlParts = url.split('/');
  const page = urlParts[0];
  const subPage = urlParts.length > 1 ? urlParts[1] : '';
  return { page, subPage };
}
