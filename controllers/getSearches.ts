import { SearchParams } from '../types/searchParams';
import Search from '../models/Search'

// In the case of no results, an empty array will be returned
type dbResult = [] | SearchParams[];

export const getSearches = async (): Promise<dbResult> => {
  const searches: dbResult = await Search.find({});
  return searches;
}

