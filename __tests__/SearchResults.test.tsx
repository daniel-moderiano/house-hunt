import { render, screen } from '@testing-library/react'
import SearchResults from '../components/SearchResults';
import '@testing-library/jest-dom';

describe('Empty search results', () => {
  it('shows no results message when there are no matching listings', () => {
    render(<SearchResults />)

    const msg = screen.getByText('No results');

    expect(msg).toBeInTheDocument()
  });
});