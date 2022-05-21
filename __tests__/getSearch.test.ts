/*
 * @jest-environment node 
*/

import './dbSetupTeardown';
import { getSearch } from '../controllers/getSearch';

// This search is for a single location 'wynn vale'
const searchId = "4c8a331bda76c559ef000005";

describe('getSearch functionality', () => {
  it('returns correct search object in the db', async () => {
    const search = await getSearch(searchId);
    expect(search?.locations).toHaveLength(1);
  });
})