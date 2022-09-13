import React, { useState, useEffect, useRef } from 'react';
import { useQuery, UseQueryResult } from 'react-query';
import type { NextPage } from 'next';
import NextLink from 'next/link';
import { Column } from 'react-table';
import { Box, Link, Input, Text } from '@chakra-ui/react';
import { ViewIcon, SmallCloseIcon } from '@chakra-ui/icons';
import Flatpickr from 'react-flatpickr';

import { Table, Search } from '@/components/ui';
import Layout from '@/components/layout';
import { fetcher, currencyFormatter, dateFormatter } from '@/utils';
import { AccountBankProps } from '@/types/AccountBank';
import styles from '@/styles/Home.module.css';

const Home: NextPage = () => {
  const [accountList, setAccountList] = useState<AccountBankProps[]>([]);
  const [search, setSearch] = useState<string>('');

  const dateRef = useRef<Flatpickr>(null);

  const fetchData = async () => {
    try {
      const response = await fetcher.get<AccountBankProps[]>('/fakebank/accounts');
      setAccountList(response.data);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const { data: dataResponse, isFetching }: UseQueryResult<AccountBankProps[]> = useQuery('accounts', fetchData, {
    refetchOnWindowFocus: false,
  });

  const postData = React.useMemo(() => !isFetching && accountList?.map((item) => ({ ...item, detail: item })), [accountList]);
  const columns: Column<AccountBankProps>[] = React.useMemo(
    () => [
      {
        Header: 'Id',
        accessor: 'id',
      },
      {
        Header: 'Date Transaction',
        accessor: 'transactionDate',
        Cell: ({ value }) => <Box>{dateFormatter(value, 'dd/MMM/yyyy')}</Box>,
      },
      {
        Header: 'Description',
        accessor: 'description',
      },
      {
        Header: 'Debit',
        accessor: 'debit',
        Cell: ({ value }) => <Box>{currencyFormatter(value)}</Box>,
      },
      {
        Header: 'Detail',
        accessor: 'detail',
        Cell: ({ value }: any) => (
          <NextLink href={`/account/${value.id}`}>
            <Link cursor='pointer' _hover={{ textDecoration: 'none' }}>
              <ViewIcon width='14' />
            </Link>
          </NextLink>
        ),
      },
    ],
    [],
  );

  const handleFilterByDate = (date: Date[]) => {
    const [startDate, endDate] = date;
    if (startDate && endDate) {
      // Manipulate min and max time
      const minTime = new Date(startDate);
      const maxTime = new Date(endDate);
      minTime.setHours(0, 0, 0);
      maxTime.setHours(23, 59);

      const newData = accountList?.filter((item) => {
        const itemDate = new Date(item.transactionDate);

        return itemDate >= minTime && itemDate <= maxTime;
      });

      setAccountList(newData);
    }
  };

  const handleClearDate = () => {
    dateRef.current?.flatpickr.clear();
    if (dataResponse) {
      setAccountList(dataResponse);
    }
  };

  useEffect(() => {
    if (search) {
      const newData = accountList?.filter((item) => item.description.toLowerCase().includes(search.toLowerCase()));
      setAccountList(newData);
    } else if (dataResponse) {
      setAccountList(dataResponse);
    }
  }, [search]);

  if (isFetching) {
    return <>Loading...</>;
  }
  return (
    <Layout data-testid='gretting' marginTop='10'>
      <Box marginBottom={10}>
        <Text as='label' fontWeight='medium' htmlFor='search'>
          Search
        </Text>
        <Search id='search' onChange={(e) => setSearch(e.target.value)} placeholder='Search by description' />
        <Box rounded='md' marginTop='5'>
          <Text as='label' fontWeight='medium' htmlFor='date'>
            Filter by Date
          </Text>
          <Flatpickr
            id='date'
            ref={dateRef}
            options={{
              mode: 'range',
              dateFormat: 'd M, Y',
              wrap: true,
              time_24hr: true,
            }}
            onChange={handleFilterByDate}
          >
            <Input background='#fff' type='text' placeholder='Date' data-input />
            {dateRef.current?.flatpickr.input.value && (
              <SmallCloseIcon onClick={handleClearDate} _hover={{ cursor: 'pointer' }} className={styles['clear-date']} />
            )}
          </Flatpickr>
        </Box>
      </Box>
      {postData && <Table data={postData} columns={columns} onFilterDate={(date: Date[]) => handleFilterByDate(date)} showDate />}
    </Layout>
  );
};

export default Home;
