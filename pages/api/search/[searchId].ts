// Defines an API route /api/search for simple DB queries
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../config/db';
import { createSearch } from '../../../controllers/createSearch';
import { deleteSearch } from '../../../controllers/deleteSearch';
import { updateSearch } from '../../../controllers/updateSearch';
import { SearchParams } from '../../../types/searchParams';

connectDB();

// Req.body will contain (essentially) a search doc in the correct format for direct upload to db
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let searchDoc: SearchParams;
  const searchId = req.query.searchId as string;

  switch (req.method) {
    case "POST":
      searchDoc = JSON.parse(req.body.searchDoc);
      const newSearch = await createSearch(searchDoc);
      res.status(200);
      res.json(newSearch);
      break;
    case "PUT":
      searchDoc = JSON.parse(req.body.searchDoc);
      const updatedSearch = await updateSearch(searchId, searchDoc);
      res.status(200);
      res.json(updatedSearch);
      break;
    case "DELETE":
      const deletedSearch = await deleteSearch(searchId);
      res.status(200);
      res.json(deletedSearch);
      break;
    default:
      // Bad request
      res.status(400);
      res.json({ msg: 'error' })
      break;
  }
}