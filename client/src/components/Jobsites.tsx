import { Box } from '@chakra-ui/react';
import React from 'react';

const Jobsites = () => {
  return (
    <>
      <Box
        w='full'
        py={3}
        bg='white'
        _dark={{
          bg: 'gray.700',
        }}
        mb='1.5rem'
        px={{ base: 4, md: 3, xl: 4 }}
        shadow='sm'
        rounded='md'
        className='sidebarCard'
      ></Box>
    </>
  );
};

export default Jobsites;
