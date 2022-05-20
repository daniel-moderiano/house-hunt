// Defines an API route /api/search for simple DB queries
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../config/db';
import { getSearches } from '../../controllers/getSearches';

connectDB();

// Req.body will contain (essentially) a search doc in the correct format for direct upload to db
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(await getSearches());
  // Note: This will initially be called directly with getStaticProps on first render, rather than calling this API route. It remains to be seen if this route is needed at all
}
