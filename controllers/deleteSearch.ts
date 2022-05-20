import { SearchParams } from '../types/searchParams';
import Search from '../models/Search'

// In the case of no results, an empty array will be returned
type dbResult = null | SearchParams;

export const deleteSearch = async (searchId: string): Promise<dbResult> => {
  const search: dbResult = await Search.findById(searchId);
  return search;
}

