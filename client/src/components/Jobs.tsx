import React from 'react';
import { Box, Flex, chakra } from '@chakra-ui/react';
import JobCard from './JobCard';
import SideBar from './SideBar';

const Jobs = () => {
  return (
    <>
      <Box px={{ base: '1rem', md: '6rem', lg: '11rem' }} pt='5rem'>
        <Box
          px={4}
          py={3}
          bg='linkedin.500'
          _dark={{
            bg: 'gray.700',
          }}
          shadow='md'
          rounded='md'
        >
          <Flex justifyContent='space-between' alignItems='center'>
            <chakra.span
              fontSize='sm'
              color='white'
              _dark={{
                color: 'white',
              }}
            >
              Courses and MOOCs
            </chakra.span>
            <chakra.span
              color='white'
              _dark={{
                color: 'white',
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
        </Box>
      </Box>
      <Flex
        py='2rem'
        px={{ base: '1rem', md: '6rem', lg: '11rem' }}
        w='full'
        alignItems='center'
        justifyContent='center'
      >
        <SideBar />
        <JobCard />
      </Flex>
      ;
    </>
  );
};

export default Jobs;
