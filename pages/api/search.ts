// Defines an API route /api/search for simple DB queries
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../config/db';
import { createSearch } from '../../controllers/createSearch';
import { getSearches } from '../../controllers/getSearches';
import { SearchParams } from '../../types/searchParams';

connectDB();

// Req.body will contain (essentially) a search doc in the correct format for direct upload to db
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      // Note: This will initially be called directly with getStaticProps on first render, rather than calling this API route. It remains to be seen if this route is needed at all
      res.status(200).json(await getSearches())
      break;
    case "POST":
      if (!req.body) {
        res.status(400);
        res.json({ msg: 'No search document' })
      } else {
        // const searchDoc = JSON.parse(req.body) as SearchParams;
        const newSearch = await createSearch(req.body);
        res.status(200).json(newSearch);
      }
      break;
    default:
      // Bad request
      res.status(400);
      res.json({ msg: 'error' })
      break;
  }

}
