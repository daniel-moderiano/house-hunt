import './dbSetupTeardown';
import { deleteSearch } from '../controllers/deleteSearch';

const searchId = "4c8a331bda76c559ef000004";

describe('deleteSearch functionality', () => {
  it('returns all search objects in the db', async () => {
    const searches = await deleteSearch(searchId);

    // Originally two search docs in db, should remove one and return the relevant search, which has 3 search locations
    expect(searches?.locations).toHaveLength(3);
  });
})