import { SearchParams } from '../types/searchParams';
import Search from '../models/Search'

// In the case of no results, an empty array will be returned
type dbResult = null | SearchParams;

export const updateSearch = async (searchId: string, newSearch: SearchParams): Promise<dbResult> => {
  // Set 'new' to true to ensure the updated doc is returned
  const updatedSearch = await Search.findByIdAndUpdate(searchId, newSearch, { new: true });

  return updatedSearch;
}

