import React from 'react';
import { Box, InputGroup, InputLeftElement, Input, BoxProps, forwardRef } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

interface SearchProps extends BoxProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Search: React.FC<SearchProps> = forwardRef<SearchProps, 'div'>(({ onChange, placeholder = 'Search', ...rest }, ref) => (
  <Box ref={ref} {...rest}>
    <InputGroup>
      <InputLeftElement pointerEvents='none'>
        <SearchIcon color='gray.300' />
      </InputLeftElement>
      <Input type='text' placeholder={placeholder} onChange={onChange} />
    </InputGroup>
  </Box>
));

export default Search;
