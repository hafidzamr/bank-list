import { Button, Icon, BoxProps, forwardRef } from '@chakra-ui/react';
import { MdMoreHoriz } from 'react-icons/md';
import { PaginationContainer, MorePaginationIconContainer } from './Pagination.styled';

interface PaginationProps extends BoxProps {
  currentPage: number;
  pageCount: number;
  prevPage: () => void;
  nextPage: () => void;
  setCurrentPage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = forwardRef<PaginationProps, 'div'>(
  ({ currentPage, pageCount, setCurrentPage, prevPage, nextPage, ...rest }, ref) => {
    const getPageRange = (page: number, count: number) => {
      if (count < 4) {
        return [];
      }
      const pageRange = [1, 2, 3];
      if (page > 1 && page !== count) {
        pageRange.length = 0;
        pageRange.push(page - 1);
        pageRange.push(page);
        pageRange.push(page + 1);
      } else if (page === count) {
        pageRange.length = 0;
        pageRange.push(page - 2);
        pageRange.push(page - 1);
        pageRange.push(page);
      }
      return pageRange;
    };

    const renderPageButtons = () => {
      const result = [];
      for (let i = 1; i < pageCount + 1; i += 1) {
        result.push(
          <Button key={i} className={currentPage === i ? 'pageCard active' : 'pageCard'} onClick={() => setCurrentPage(i)}>
            {i}
          </Button>,
        );
      }
      return result;
    };
    return (
      <PaginationContainer ref={ref} {...rest}>
        <Button
          className='pageCard'
          onClick={() => {
            if (currentPage > 1) prevPage();
          }}
          disabled={currentPage <= 1}
        >
          {'<'}
        </Button>

        {pageCount < 4 && renderPageButtons()}

        {currentPage >= pageCount - 2 && pageCount > 3 && (
          <>
            <Button className={currentPage === 1 ? 'pageCard active' : 'pageCard'} onClick={() => setCurrentPage(0)}>
              1
            </Button>
            <MorePaginationIconContainer>
              <Icon as={MdMoreHoriz} size='24px' />
            </MorePaginationIconContainer>
          </>
        )}

        {getPageRange(currentPage, pageCount).map((page: number) => (
          <Button key={page} className={page === currentPage ? 'pageCard active' : 'pageCard'} onClick={() => setCurrentPage(page - 1)}>
            {page}
          </Button>
        ))}

        {currentPage < pageCount - 2 && pageCount > 3 && (
          <>
            <MorePaginationIconContainer>
              <Icon as={MdMoreHoriz} size='24px' />
            </MorePaginationIconContainer>
            <Button className={pageCount === currentPage ? 'pageCard active' : 'pageCard'} onClick={() => setCurrentPage(pageCount - 1)}>
              {pageCount}
            </Button>
          </>
        )}
        <Button
          className='pageCard'
          onClick={() => {
            if (currentPage < pageCount) nextPage();
          }}
          disabled={currentPage === pageCount}
        >
          {'>'}
        </Button>
      </PaginationContainer>
    );
  },
);

export default Pagination;
