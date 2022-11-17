import React from 'react';
import { Box, Flex, Image, Link, chakra, Tooltip } from '@chakra-ui/react';
import moment from 'moment';

const JobCard = ({ ...job }) => {
  const {
    link,
    title,
    description,
    category,
    endDate,
    domain,
    image,
    status,
    createdAt,
  } = job;
  return (
    <>
      <Box
        mx='auto'
        px={8}
        py={4}
        mb='1rem'
        rounded='md'
        shadow='md'
        bg='white'
        _dark={{
          bg: 'gray.700',
        }}
        w={{ base: 'full', md: 'full' }}
      >
        <Flex justifyContent='space-between' alignItems='center'>
          <chakra.span
            fontSize='0.92rem'
            color='gray.600'
            _dark={{
              color: 'gray.400',
            }}
          >
            {moment(createdAt).format('MMM Do, YYYY')}
          </chakra.span>
          <Box
            as='span'
            px={2}
            py={1}
            cursor='pointer'
            bg='gray.600'
            color='gray.100'
            fontSize='0.68rem'
            fontWeight='700'
            rounded='md'
            _hover={{
              bg: 'gray.500',
            }}
            textTransform='capitalize'
          >
            {status}
          </Box>
        </Flex>

        <Box mt={2}>
          <Link
            fontSize='1.08rem'
            color='gray.700'
            _dark={{
              color: 'white',
            }}
            fontWeight='700'
            _hover={{
              color: 'gray.600',
              _dark: {
                color: 'gray.200',
              },
              textDecor: 'underline',
            }}
          >
            {title}
          </Link>
          <chakra.p
            mt={2}
            color='gray.600'
            _dark={{
              color: 'gray.300',
            }}
            fontSize='0.95rem'
          >
            {description}
          </chakra.p>
        </Box>

        <Flex justifyContent='space-between' alignItems='center' mt={4}>
          <Flex alignItems='center'>
            <Image
              mr={2}
              w={6}
              h={6}
              rounded='full'
              fit='cover'
              src={image}
              alt='avatar'
            />
            <Box
              as='span'
              color='gray.700'
              _dark={{
                color: 'gray.200',
              }}
              fontSize='0.9rem'
              fontWeight='700'
              cursor='pointer'
            >
              {domain}
            </Box>
          </Flex>

          <Flex
            alignItems='center'
            color='gray.700'
            _dark={{
              color: 'gray.200',
            }}
          >
            <Box mr='0.5rem' cursor='pointer'>
              <Tooltip
                hasArrow
                label='Add note'
                bg='gray.300'
                color='black'
                placement='top'
                fontSize='0.75rem'
              >
                <i className='fa-solid fa-file-pen'></i>
              </Tooltip>
            </Box>
            <Box cursor='pointer'>
              <Tooltip
                hasArrow
                label='Add to calender'
                bg='gray.300'
                color='black'
                placement='top'
                fontSize='0.75rem'
              >
                <i className='fa-solid fa-calendar-days'></i>
              </Tooltip>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default JobCard;
