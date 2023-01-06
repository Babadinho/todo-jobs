import React, { useContext } from 'react';
import { StatsContext } from '../context/Context';
import { Flex, chakra, Box, Badge } from '@chakra-ui/react';

const Stats = () => {
  const { jobStats } = useContext(StatsContext);

  const month: any = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December',
  };

  const date: any = new Date();
  let thisMonth = month[date.getMonth()];
  let lastMonth = month[date.getMonth() - 1];
  let lastThreeMonth = month[date.getMonth() - 2];

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
          fontSize='md'
          fontWeight='bold'
          fontFamily="'Overpass', sans-serif"
          color='gray.700'
          _dark={{
            color: 'gray.50',
          }}
          mb='0.5rem'
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
                fontSize='0.8rem'
                mr='0.4rem'
                color='gray.600'
                _dark={{ color: 'gray.300' }}
              >
                <i className='fa-solid fa-chart-simple'></i>
              </Box>{' '}
              <Box color='gray.600' _dark={{ color: 'gray.300' }}>
                This Month
              </Box>
            </Flex>
          </chakra.span>
          <chakra.span
            color='brand.800'
            _dark={{
              color: 'brand.900',
            }}
          >
            <Badge
              rounded='lg'
              fontSize='xs'
              colorScheme='linkedin'
              fontWeight='400'
            >
              {jobStats && jobStats.length === 0 && 0}
              {jobStats &&
                jobStats.length > 0 &&
                jobStats.map((stat: any) => {
                  if (stat.month === thisMonth) {
                    return stat.number;
                  } else {
                    return 0;
                  }
                })}
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
                fontSize='0.8rem'
                mr='0.4rem'
                color='gray.600'
                _dark={{ color: 'gray.300' }}
              >
                <i className='fa-solid fa-square-poll-vertical'></i>
              </Box>{' '}
              <Box color='gray.600' _dark={{ color: 'gray.300' }}>
                {lastMonth === undefined ? 'December' : lastMonth}
              </Box>
            </Flex>
          </chakra.span>
          <chakra.span
            color='brand.800'
            _dark={{
              color: 'brand.900',
            }}
          >
            <Badge
              rounded='lg'
              fontSize='xs'
              colorScheme='linkedin'
              fontWeight='400'
            >
              {jobStats && jobStats.length === 0 && 0}
              {jobStats &&
                jobStats.length > 0 &&
                jobStats.map((stat: any) => {
                  if (stat.month === lastMonth) {
                    return stat.number;
                  } else {
                    return 0;
                  }
                })}
            </Badge>
          </chakra.span>
        </Flex>
        {/* <Flex justifyContent='space-between' alignItems='center' mb='0.3rem'>
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
                <i className='fa-solid fa-square-poll-vertical'></i>
              </Box>{' '}
              <Box color='gray.600' _dark={{ color: 'gray.300' }}>
                {lastThreeMonth}
              </Box>
            </Flex>
          </chakra.span>
          <chakra.span
            color='brand.800'
            _dark={{
              color: 'brand.900',
            }}
          >
            <Badge
              rounded='lg'
              fontSize='xs'
              colorScheme='linkedin'
              fontWeight='400'
            >
              {jobStats && jobStats.length === 0 && 0}
              {jobStats &&
                jobStats.length > 0 &&
                jobStats.map((stat: any) => {
                  if (stat.month === lastThreeMonth) {
                    return stat.number;
                  } else {
                    return 0;
                  }
                })}
            </Badge>
          </chakra.span>
        </Flex> */}
      </Box>
    </>
  );
};

export default Stats;
