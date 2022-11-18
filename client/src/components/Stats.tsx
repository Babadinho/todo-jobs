import React from 'react';
import { Flex, chakra, Box, Badge } from '@chakra-ui/react';

const Stats = () => {
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
      >
        <Box
          fontSize='md'
          fontWeight='bold'
          color='gray.700'
          _dark={{
            color: 'gray.50',
          }}
          mb='0.7rem'
        >
          <i className='fa-solid fa-chart-pie'></i> Stats
        </Box>
        <Flex justifyContent='space-between' alignItems='center' mb='0.3rem'>
          <chakra.span
            fontSize='0.94rem'
            color='gray.600'
            _dark={{
              color: 'white',
            }}
          >
            <Flex align='center'>
              <Box
                fontSize='0.7rem'
                mr='0.4rem'
                color='gray.600'
                _dark={{ color: 'gray.300' }}
              >
                <i className='fa-solid fa-chart-simple'></i>
              </Box>{' '}
              <Box color='gray.600' _dark={{ color: 'gray.300' }}>
                This month
              </Box>
            </Flex>
          </chakra.span>
          <chakra.span
            color='brand.800'
            _dark={{
              color: 'brand.900',
            }}
          >
            <Badge rounded='lg' fontSize='xs' colorScheme='linkedin'>
              15
            </Badge>
          </chakra.span>
        </Flex>
        <Flex justifyContent='space-between' alignItems='center' mb='0.3rem'>
          <chakra.span
            fontSize='0.94rem'
            color='gray.600'
            _dark={{
              color: 'white',
            }}
          >
            <Flex align='center'>
              <Box
                fontSize='0.7rem'
                mr='0.4rem'
                color='gray.600'
                _dark={{ color: 'gray.300' }}
              >
                <i className='fa-solid fa-chart-column'></i>
              </Box>{' '}
              <Box color='gray.600' _dark={{ color: 'gray.300' }}>
                Last month
              </Box>
            </Flex>
          </chakra.span>
          <chakra.span
            color='brand.800'
            _dark={{
              color: 'brand.900',
            }}
          >
            <Badge rounded='lg' fontSize='xs' colorScheme='linkedin'>
              150
            </Badge>
          </chakra.span>
        </Flex>
      </Box>
    </>
  );
};

export default Stats;
