/* eslint-disable no-nested-ternary */
import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Box } from '@chakra-ui/react';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import { useTable, useSortBy, usePagination, useGlobalFilter, useFilters } from 'react-table';

import { Pagination } from '@/components/ui';
import { DataTableProps } from './types';

const DataTable: React.FC<DataTableProps> = ({ data, columns }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable({ columns, data, initialState: { pageIndex: 0, pageSize: 10 } }, useGlobalFilter, useFilters, useSortBy, usePagination);

  return (
    <>
      <Table {...getTableProps()} variant='striped' colorScheme='teal'>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <chakra.span pl='4'>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label='sorted descending' />
                      ) : (
                        <TriangleUpIcon aria-label='sorted ascending' />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page?.map((row) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>

      {pageCount > 1 && (
        <Box marginY='10' display='flex' justifyContent='center'>
          <Pagination
            prevPage={previousPage}
            nextPage={nextPage}
            currentPage={pageIndex + 1}
            pageCount={pageCount}
            setCurrentPage={gotoPage}
          />
        </Box>
      )}
    </>
  );
};

export default DataTable;
