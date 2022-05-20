import { SearchParams } from '../types/searchParams';
import Search from '../models/Search'

// In the case of no results, an empty array will be returned
type dbResult = null | SearchParams;

export const createSearch = async (searchDoc: SearchParams): Promise<dbResult> => {
  const newSearch = await Search.create(searchDoc);
  await newSearch.save();

  return newSearch;
}

