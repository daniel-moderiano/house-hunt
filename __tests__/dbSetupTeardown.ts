import { initialiseMongoServer, stopMongoServer, clearMongoServer } from "./db";
import Search from '../models/Search';

// Standard database setup and teardown. Do not clear between each test, as state is often required to persist between tests
beforeAll(() => initialiseMongoServer());
afterAll(async () => {    // shut down in between test suites
  await clearMongoServer();
  await stopMongoServer();
});

// Set up array of searches to be saved to db
const searches = [
  {
    "_id": {
      "$oid": "628706667983b31686e99ea5"
    },
    "listingType": "Sale",
    "locations": [
      {
        "state": "SA",
        "suburb": "Para Vista",
        "includeSurroundingSuburbs": false
      },
      {
        "state": "SA",
        "suburb": "Modbury",
        "includeSurroundingSuburbs": false
      },
      {
        "state": "SA",
        "suburb": "Clearview",
        "includeSurroundingSuburbs": false
      }
    ]
  },
  {
    "_id": {
      "$oid": "628706667983b31686e99ea6"
    },
    "listingType": "Sale",
    "locations": [
      {
        "state": "SA",
        "suburb": "Wynn Vale",
        "includeSurroundingSuburbs": false
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
