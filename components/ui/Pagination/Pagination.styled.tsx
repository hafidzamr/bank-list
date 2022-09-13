import styled from '@emotion/styled';
import { Box } from '@chakra-ui/react';

export const PaginationContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .pageCard {
    height: 36px;
    padding: 0 15px;
    background: transparent;
    border: 1px solid #b7bcce;
    box-sizing: border-box;
    border-radius: 4px;
    margin: 0 6px;
    color: #b9bdcf;
    cursor: pointer;

    &:not([disabled]):hover {
      border: 1px solid #38b2ac;
      color: #38b2ac;
    }
  }

  .pageCard.active {
    background: #38b2ac;
    border: 1px solid #b2f5ea;
    color: #fff;
  }
`;

export const MorePaginationIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  width: 36px;
`;
