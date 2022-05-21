import { render, screen } from '@testing-library/react';
import SearchesList from '../components/SearchesList';
import '@testing-library/jest-dom';
import { SearchParams } from '../types/searchParams';

const searchList: SearchParams[] = [
  {
    _id: "628706667983b31686e99ea5",
    listingType: "Sale",
    locations: [{ state: "SA", suburb: "Wynn Vale", includeSurroundingSuburbs: false }],
    minLandArea: 300,
    maxLandArea: 500,
    minBedrooms: 2,
    minBathrooms: 2,
    minCarspaces: 1,
    maxPrice: 800000,
    id: "628706667983b31686e99ea5"
  },
  {
    _id: "628706667983b31686e99ea6",
    listingType: "Sale",
    locations: [{ state: "SA", suburb: "Para Vista", includeSurroundingSuburbs: false }],
    id: "628706667983b31686e99ea6"
  }
];

describe('Search list rendering', () => {
  it('shows correct number of search results', () => {
    render(<SearchesList searches={searchList} />)

    const searches = screen.getAllByRole('article');

    expect(searches).toHaveLength(2);
  });

  it('shows correct additional search params', () => {
    render(<SearchesList searches={searchList} />)

    const price = screen.getByText('Up to $800000');
    const beds = screen.getByText('2+ bedrooms');
    const bath = screen.getByText('2+ bathrooms');
    const cars = screen.getByText('1+ car spaces');
    const land = screen.getByText('300 - 500m2');

    expect(price).toBeInTheDocument();
    expect(beds).toBeInTheDocument();
    expect(bath).toBeInTheDocument();
    expect(cars).toBeInTheDocument();
    expect(land).toBeInTheDocument();
  });
});
