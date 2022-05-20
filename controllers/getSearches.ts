import { SearchParams } from '../types/searchParams';
import Search from '../models/Search'

type dbResult = [] | SearchParams[];

export const getSearches = async (): Promise<dbResult> => {
  const searches: dbResult = await Search.find({});
  return searches;
}

