// Defines an API route /api/search for simple DB queries
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../config/db';
import { getSearches } from '../../controllers/getSearches';

connectDB();


type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // await connectDB();
  switch (req.method) {
    case "GET":
      getSearches();
      res.json({ name: 'hello' })
      // Get controller
      // Note: This will initially be called directly with getStaticProps on first render, rather than calling this API route. It remains to be seen if this route is needed at all
      break;
    case "POST":
      // Post controller
      break;
    case "PUT":
      // Put controller
      break;
    case "DELETE":
      // Delete controller
      break;
    default:
      break;
  }
  // res.status(200).json({ name: 'John Doe' })
}
