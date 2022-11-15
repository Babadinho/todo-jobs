import React from 'react';
import {
  Box,
  Flex,
  chakra,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerCloseButton,
  Button,
} from '@chakra-ui/react';
import JobCard from './JobCard';
import SideBar from './SideBar';
import { FiMenu } from 'react-icons/fi';
import { AddIcon } from '@chakra-ui/icons';

const Jobs = () => {
  const sidebar = useDisclosure();
  return (
    <>
      <Box px={{ base: '1rem', md: '6rem', lg: '11rem' }} pt='5rem'>
        <Box
          px={4}
          py={3}
          bg='gray.700'
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
              <IconButton
                aria-label='Menu'
                display={{ base: 'inline-flex', lg: 'none' }}
                onClick={sidebar.onOpen}
                icon={<FiMenu />}
                size='md'
                color='linkedin.500'
              />
            </chakra.span>
            <chakra.span>
              <Button
                leftIcon={<AddIcon fontSize='0.7rem' />}
                colorScheme='linkedin'
                variant='solid'
                fontWeight='400'
              >
                Add Job
              </Button>
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
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement='left'
          size='xs'
        >
          <DrawerOverlay display={{ sm: 'block', lg: 'none' }} />
          <DrawerContent display={{ sm: 'block', lg: 'none' }}>
            <DrawerCloseButton />
            <Box
              w='full'
              px={4}
              py={3}
              bg='white'
              _dark={{
                bg: 'gray.700',
              }}
              pt='3rem'
            >
              <SideBar />
            </Box>
          </DrawerContent>
        </Drawer>

        <Box
          w='full'
          maxW='20rem'
          mr='2rem'
          px={4}
          py={3}
          bg='white'
          _dark={{
            bg: 'gray.700',
          }}
          shadow='md'
          rounded='md'
          display={{ base: 'none', lg: 'block' }}
        >
          <SideBar />
        </Box>

        <JobCard />
      </Flex>
    </>
  );
};

export default Jobs;
