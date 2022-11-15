import React, { useContext, useEffect, useState } from 'react';
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
  Grid,
  GridItem,
} from '@chakra-ui/react';
import JobCard from './JobCard';
import SideBar from './SideBar';
import AddJobModal from './AddJobModal';
import { FiMenu } from 'react-icons/fi';
import { AddIcon } from '@chakra-ui/icons';
import { isAuthenticated } from '../actions/auth';
import { getCategories } from '../actions/category';

const Jobs = () => {
  const sidebar = useDisclosure();
  const [category, setCategory] = useState<Array<{}> | null>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeCatId, setActiveCatId] = useState<string | null>();

  const loadCategories = async () => {
    try {
      const res =
        isAuthenticated() &&
        (await getCategories(
          isAuthenticated().user._id,
          isAuthenticated().token
        ));
      setCategory(res.data);
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <Box
      _light={{ bg: '#f7f8fd' }}
      pt='5rem'
      px={{ base: '1rem', md: '5rem', xl: '12rem' }}
      className='main'
    >
      <Grid
        h='200px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <Drawer
          isOpen={sidebar.isOpen}
          onClose={sidebar.onClose}
          placement='left'
          size='xs'
        >
          <DrawerOverlay display={{ sm: 'block', lg: 'none' }} />
          <DrawerContent
            display={{ sm: 'block', lg: 'none' }}
            bg='#f7f8fd'
            _dark={{
              bg: 'gray.800',
            }}
            px={7}
            py={4}
            pt='4rem'
            shadow='md'
            rounded='md'
          >
            <DrawerCloseButton />
            <SideBar
              category={category}
              setCategory={setCategory}
              sidebar={sidebar}
              activeCat={activeCatId}
              setActiveCat={setActiveCatId}
            />
          </DrawerContent>
        </Drawer>
        <GridItem
          rowSpan={5}
          colSpan={1}
          display={{ base: 'none', lg: 'block' }}
        >
          <SideBar
            category={category}
            setCategory={setCategory}
            sidebar={sidebar}
            activeCat={activeCatId}
            setActiveCat={setActiveCatId}
          />
        </GridItem>
        <GridItem colSpan={{ base: 6, lg: 4 }}>
          <Box>
            <Box
              px={4}
              py={3}
              mb='2rem'
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
                    onClick={() => onOpen()}
                    rounded='2rem'
                  >
                    Add Job
                  </Button>
                </chakra.span>
              </Flex>
            </Box>
            <JobCard />
          </Box>
        </GridItem>
      </Grid>

      <AddJobModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Jobs;
