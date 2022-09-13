import React from 'react';
import { render, screen } from '@testing-library/react';
import { Search } from '@/components/ui';

describe('Search Component', () => {
  test('should be render correctly', () => {
    render(<Search data-testid='search' onChange={() => {}} />);

    const SearchnComponent = screen.getByTestId('search');
    expect(SearchnComponent).toBeInTheDocument();
  });
});
