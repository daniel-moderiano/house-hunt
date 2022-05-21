import mongoose from "mongoose";
import { initialiseMongoServer, stopMongoServer, clearMongoServer } from "./db";
import Search from '../models/Search';

// Standard database setup and teardown. Do not clear between each test, as state is often required to persist between tests
beforeAll(() => initialiseMongoServer());
afterAll(async () => {    // shut down in between test suites
  await clearMongoServer();
  await stopMongoServer();
});

const searchMultipleLocationsId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000004");
const searchSingleLocationId = new mongoose.Types.ObjectId("4c8a331bda76c559ef000005");

// Set up array of searches to be saved to db
const searches = [
  {
    "_id": searchMultipleLocationsId,
    "listingType": "Sale",
    "locations": [
      {
        "state": "SA",
        "suburb": "Para Vista",
      },
      {
        "state": "SA",
        "suburb": "Modbury",
      },
      {
        "state": "SA",
        "suburb": "Clearview",
      }
    ]
  },
  {
    "_id": searchSingleLocationId,
    "listingType": "Sale",
    "locations": [
      {
        "state": "SA",
        "suburb": "Wynn Vale",
      }
    ]
  }
];

// IIFE to populate databse with initial data. Use insertMany to reduce overall db calls
(async () => {
  try {
    await Search.insertMany(searches);
  } catch (error) {
    console.log(error);
  }
})();