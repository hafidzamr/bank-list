import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useQuery, UseQueryResult } from 'react-query';
import { Table, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import Layout from '@/components/layout';

import { fetcher, currencyFormatter, dateFormatter } from '@/utils';
import { AccountBankProps } from '@/types/AccountBank';

const DetailAccount: React.FC = () => {
  const { query, isReady } = useRouter();
  const [detailAccount, setDetailAccount] = useState<AccountBankProps>();

  const fetchData = async () => {
    try {
      const response = await fetcher.get<AccountBankProps>(`/fakebank/accounts/${query.id}`);
      setDetailAccount(response.data);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const { isFetching }: UseQueryResult<AccountBankProps> = useQuery('detail', fetchData, {
    enabled: isReady,
    refetchOnWindowFocus: false,
  });

  if (isFetching) {
    return <>Loading...</>;
  }

  return detailAccount ? (
    <Layout>
      <TableContainer>
        <Table colorScheme='teal'>
          <TableCaption placement='top' marginBottom='20'>
            Detail Bank Account
          </TableCaption>
          <Tr>
            <Th>ID</Th>
            <Td>#{detailAccount.id}</Td>
          </Tr>
          <Tr>
            <Th>Transaction Date</Th>
            <Td>{dateFormatter(detailAccount.transactionDate, 'dd/MMM/yyyy')}</Td>
          </Tr>
          <Tr>
            <Th>Description</Th>
            <Td>{detailAccount.description}</Td>
          </Tr>
          <Tr>
            <Th>Credit</Th>
            <Td>{currencyFormatter(detailAccount.credit)}</Td>
          </Tr>
          <Tr>
            <Th>Debit</Th>
            <Td>{currencyFormatter(detailAccount.debit)}</Td>
          </Tr>
          <Tr>
            <Th>Category</Th>
            <Td>{detailAccount.category}</Td>
          </Tr>
        </Table>
      </TableContainer>
    </Layout>
  ) : null;
};

export default DetailAccount;
