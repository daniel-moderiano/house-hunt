/*
 * @jest-environment node 
*/

import './dbSetupTeardown';
import { getSearches } from '../controllers/getSearches';

describe('getSearches functionality', () => {
  it('returns all search objects in the db', async () => {
    const searches = await getSearches();
    expect(searches).toHaveLength(2);
  });
})