import './dbSetupTeardown';
import { createSearch } from '../controllers/createSearch';
import { getSearches } from '../controllers/getSearches';

const search = {
  "listingType": "Sale",
  "locations": [
    {
      "state": "SA",
      "suburb": "Broadview",
      "includeSurroundingSuburbs": false
    },
    {
      "state": "SA",
      "suburb": "Northfield",
      "includeSurroundingSuburbs": false
    },
  ]
};

describe('createSearch functionality', () => {
  it('creates searchDoc successfully from JS object', async () => {
    const addedSearch = await createSearch(search);
    expect(addedSearch?.locations).toHaveLength(2);
  });

  it('adds search to DB', async () => {
    const allSearches = await getSearches();

    // Began with 2 docs in db before insert, should now be 3
    expect(allSearches).toHaveLength(3);
  });
})