import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import '@testing-library/jest-dom';

const add = (a: number, b: number): number => {
  return a + b;
}


describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByText('Home');

    expect(heading).toBeInTheDocument()
  })
})

describe('Add', () => {
  it('Adds nums', () => {
    expect(add(1, 2)).toBe(3);
  })
})