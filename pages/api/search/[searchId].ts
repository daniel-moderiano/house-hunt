// Defines an API route /api/search for simple DB queries
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../../config/db';
import { deleteSearch } from '../../../controllers/deleteSearch';
import { getSearch } from '../../../controllers/getSearch';
import { updateSearch } from '../../../controllers/updateSearch';
import { SearchParams } from '../../../types/searchParams';

connectDB();

// Req.body will contain (essentially) a search doc in the correct format for direct upload to db
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const searchId = req.query.searchId as string;

  switch (req.method) {
    case "GET":
      const search = await getSearch(searchId);
      res.status(200);
      res.json(search);
      break;
    case "PUT":
      if (!req.body) {
        res.status(400);
        res.json({ msg: 'No search document' })
      } else {
        const searchDoc = JSON.parse(req.body) as SearchParams;
        const updatedSearch = await updateSearch(searchId, searchDoc);
        res.status(200);
        res.json(updatedSearch);
      }
      break;
    case "DELETE":
      const deletedSearch = await deleteSearch(searchId);
      console.log(deletedSearch);

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
