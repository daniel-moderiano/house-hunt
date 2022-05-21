/*
 * @jest-environment node 
*/

import './dbSetupTeardown';
import { updateSearch } from '../controllers/updateSearch';
import { getSearches } from '../controllers/getSearches';

const newSearch = {
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

const searchToUpdate = "4c8a331bda76c559ef000005"

describe('updateSearch functionality', () => {
  it('updateSearch correctly updates new/modified fields', async () => {
    const updatedSearch = await updateSearch(searchToUpdate, newSearch);

    // Moving from 3 locations to 2 locations
    expect(updatedSearch?.locations).toHaveLength(2);
  });
})