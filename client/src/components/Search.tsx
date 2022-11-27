import React, { useState } from 'react';
import { Box, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';

const Search = ({ setSearch, searchValue, setSearchValue, sidebar }: any) => {
  const [error, setError] = useState<boolean>(false);

  const handleSearch = () => {
    if (!searchValue) {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 15000);
    } else {
      setSearch(searchValue);
      setError(false);
      sidebar.onClose();
    }
  };

  return (
    <>
      <Box
        w='full'
        py={3}
        bg='white'
        _dark={{
          bg: 'gray.700',
        }}
        mb='0.9rem'
        px={{ base: 4, md: 3, xl: 4 }}
        shadow='sm'
        rounded='md'
        className='sidebarCard'
      >
        <Box
          as='form'
          onSubmit={(e: { preventDefault: () => void }) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <InputGroup size='sm' position='relative'>
            <Input
              _dark={{
                borderColor: error ? 'red.400' : 'gray.600',
                _placeholder: { color: 'gray.300' },
              }}
              type='text'
              _hover={{
                borderColor: error ? 'red.300' : 'gray.200',
              }}
              borderColor={error ? 'red.300' : 'gray.200'}
              placeholder='Search job'
              focusBorderColor='brand.400'
              rounded='md'
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
                setError(false);
              }}
            />
            <Box
              position='absolute'
              right={'2.9rem'}
              top={'0.35rem'}
              fontSize='0.9rem'
              color='gray.500'
              cursor='pointer'
              display={searchValue ? 'block' : 'none'}
              onClick={() => {
                setSearchValue('');
                setSearch('');
              }}
              zIndex={10}
            >
              <i className='fa-solid fa-xmark'></i>
            </Box>
            <InputRightAddon
              bg='gray.50'
              _dark={{
                bg: 'gray.500',
                color: 'white',
              }}
              _hover={{
                bg: 'gray.100',
                _dark: {
                  bg: 'gray.400',
                },
              }}
              color='gray.500'
              rounded='md'
              cursor='pointer'
              onClick={handleSearch}
            >
              <Search2Icon />
            </InputRightAddon>
          </InputGroup>
        </Box>
      </Box>
    </>
  );
};

export default Search;
