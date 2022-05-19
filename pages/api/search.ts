// Defines an API route /api/search for simple DB queries
import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDB } from '../../config/db';

connectDB();

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
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
