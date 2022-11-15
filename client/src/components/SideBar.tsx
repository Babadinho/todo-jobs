import React from 'react';
import { Box, Flex, chakra } from '@chakra-ui/react';

export const SideBar = () => {
  return (
    <>
      <Flex justifyContent='space-between' alignItems='center'>
        <chakra.span
          fontSize='sm'
          color='gray.800'
          _dark={{
            color: 'gray.400',
          }}
        >
          Courses and MOOCs
        </chakra.span>
        <chakra.span
          color='brand.800'
          _dark={{
            color: 'brand.900',
          }}
          px={3}
          py={1}
          rounded='full'
          textTransform='uppercase'
          fontSize='xs'
        >
          psychology
        </chakra.span>
      </Flex>
    </>
  );
};

export default SideBar;
