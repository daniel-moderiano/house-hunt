import mongoose from 'mongoose';
import { SearchParams } from '../types/searchParams';
import { searchSchema } from '../models/Search'

const Search = mongoose.model('Search', searchSchema);

type dbResult = [] | SearchParams[];

export const getSearches = async () => {
  const searches = await Search.find({});
  console.log(searches);

  return searches;
}

