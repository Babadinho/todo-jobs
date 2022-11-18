import React from 'react';
import {
  Box,
  Flex,
  Image,
  Link,
  chakra,
  Tooltip,
  useDisclosure,
  Badge,
} from '@chakra-ui/react';
import moment from 'moment';
import NotesModal from './NotesModal';

const JobCard = ({ ...job }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    link,
    title,
    description,
    category,
    endDate,
    domain,
    image,
    status,
    notes,
    createdAt,
  } = job;

  return (
    <>
      <Box
        className='job-card'
        mx='auto'
        px={8}
        py={4}
        mb='1rem'
        rounded='md'
        shadow='sm'
        bg='white'
        _dark={{
          bg: 'gray.700',
        }}
        w={{ base: 'full', md: 'full' }}
      >
        <Flex justifyContent='space-between' alignItems='center'>
          <chakra.span
            fontSize='0.92rem'
            color={
              moment(endDate).diff(Date.now()) <= 0 ? 'red.400' : 'gray.600'
            }
            _dark={{
              color: 'gray.400',
            }}
            cursor='pointer'
          >
            <Tooltip
              hasArrow
              label={
                moment(endDate).diff(Date.now()) <= 0
                  ? `Closed ${moment(endDate).fromNow()}`
                  : `Closing ${moment(endDate).fromNow()}`
              }
              bg='gray.700'
              color='white'
              placement='top'
              fontSize='0.75rem'
            >
              {moment(createdAt).format('MMM Do, YYYY')}
            </Tooltip>
          </chakra.span>
          <Box
            as='span'
            px={2}
            py={1}
            cursor='pointer'
            bg='gray.600'
            color='gray.100'
            fontSize='0.7rem'
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
            fontSize='1.05rem'
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
            fontSize='0.9rem'
          >
            {description.substring(0, 230)}
            {description.length > 143 && '..'}
          </chakra.p>
        </Box>

        {/* <Flex justifyContent='flex-end' mt='0.6rem'>
          <chakra.span
            fontSize='0.75rem'
            fontStyle='oblique'
            // fontWeight='600'
            color='gray.600'
            _dark={{
              color: 'gray.400',
            }}
          >
            Closing {moment(endDate).fromNow()}
          </chakra.span>
        </Flex> */}

        <Flex justifyContent='space-between' alignItems='center' mt={4}>
          <Flex align='center'>
            <Image
              mr='0.3rem'
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
            <Box mr='0.5rem' cursor='pointer' onClick={onOpen} display='flex'>
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
              {job && notes.length > 0 && (
                <Badge
                  bg='gray.300'
                  alignSelf='flex-start'
                  color='gray.800'
                  fontSize='0.6rem'
                  rounded='50%'
                >
                  {notes.length}
                </Badge>
              )}
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
      <NotesModal isOpen={isOpen} onClose={onClose} job={job} />
    </>
  );
};

export default JobCard;
