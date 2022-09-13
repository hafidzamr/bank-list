import React from 'react';
import { render, screen } from '@testing-library/react';
import { Pagination } from '@/components/ui';

describe('Pagination Component', () => {
  test('should be render correctly', () => {
    render(
      <Pagination
        data-testid='pagination'
        currentPage={1}
        pageCount={3}
        nextPage={() => {}}
        prevPage={() => {}}
        setCurrentPage={() => {}}
      />,
    );

    const PaginationComponent = screen.getByTestId('pagination');
    expect(PaginationComponent).toBeInTheDocument();
  });
});
