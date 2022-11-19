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
import JobCard from '../components/JobCard';
import SideBar from '../components/SideBar';
import AddJobModal2 from '../components/AddJobModal';
import { FiMenu } from 'react-icons/fi';
import { AddIcon } from '@chakra-ui/icons';
import { isAuthenticated } from '../middlewares/auth';
import { getCategories } from '../middlewares/category';
import { JobContext } from '../context/Context';

const Jobs = ({ loadJobs }: any) => {
  const sidebar = useDisclosure();
  const { userJobs } = useContext(JobContext);
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
      pt={{ base: '3rem', md: '4rem' }}
      px={{ base: '1rem', md: '5rem', xl: '12rem' }}
      className='main'
      pb={{ base: '5rem', md: '3rem' }}
    >
      <Grid
        // h='100%'
        // templateRows='repeat(1, 1fr)'
        templateColumns='repeat(4, 1fr)'
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
              loadJobs={loadJobs}
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
            loadJobs={loadJobs}
            category={category}
            setCategory={setCategory}
            sidebar={sidebar}
            activeCat={activeCatId}
            setActiveCat={setActiveCatId}
          />
        </GridItem>
        <GridItem colSpan={{ base: 6, lg: 3 }}>
          <Box>
            <Box
              px={4}
              py={3}
              mb='1rem'
              bg='gray.700'
              _dark={{
                bg: 'gray.700',
              }}
              shadow='sm'
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
                    size='sm'
                    colorScheme='linkedin'
                  />
                </chakra.span>
                <chakra.span>
                  <Button
                    // leftIcon={<AddIcon fontSize='0.8rem' color='gray.100' />}
                    bg='linkedin.500'
                    color='gray.100'
                    _hover={{ bg: 'linkedin.600' }}
                    fontWeight='400'
                    onClick={() => onOpen()}
                    rounded='2rem'
                  >
                    Add Job
                  </Button>
                </chakra.span>
              </Flex>
            </Box>
            {userJobs &&
              userJobs.length > 0 &&
              userJobs.map((job: {}, i: any) => {
                return <JobCard {...job} key={i} />;
              })}
          </Box>
        </GridItem>
      </Grid>

      <AddJobModal2 isOpen={isOpen} onClose={onClose} categories={category} />
    </Box>
  );
};

export default Jobs;
