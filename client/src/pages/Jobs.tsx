import React, { forwardRef, useContext, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  chakra,
  Image,
  Text,
  IconButton,
  Drawer,
  Button,
  Grid,
  GridItem,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  DrawerCloseButton,
} from '@chakra-ui/react';
import Pagination from '@choc-ui/paginator';
import JobCard from '../components/JobCard';
import SideBar from '../components/SideBar';
import AddJobModal from '../components/AddJobModal';
import { FiMenu } from 'react-icons/fi';
import { addNote, deleteNote } from '../middlewares/note';
import { CategoryContext, JobContext } from '../context/Context';
const Empty = require('../public/images/empty.png');
import { UserContext } from '../context/Context';

const Jobs = ({ loadJobs, current, setCurrent }: any) => {
  const sidebar = useDisclosure();
  const { userDetails } = useContext(UserContext);
  const { userJobs } = useContext(JobContext);
  const { category, setCategory } = useContext(CategoryContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState<Boolean>(false);
  const [loading2, setLoading2] = useState<Boolean>(false);
  const [error, setError] = useState<string>('');
  const [note, setNote] = useState<string>('');
  const [noteStatus, setNoteStatus] = useState<string>('');
  const [activeCatId, setActiveCatId] = useState<string | null>('');
  const [activeSite, setActiveSite] = useState<string | null>('');
  const [status, setStatus] = useState<string>('all jobs');
  const [search, setSearch] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  // pagination
  const pageSize = 8;
  const offset = (current - 1) * pageSize;
  const user_jobs = userJobs && userJobs.slice(offset, offset + pageSize);

  // function to load jobs based on filter selected by user
  const handleLoadJobs = async () => {
    try {
      (await userDetails) &&
        loadJobs(
          userDetails.user._id,
          {
            status: status === 'all jobs' ? '' : status,
            category: activeCatId,
            title: search,
            sld: activeSite,
          },
          userDetails.token
        );
    } catch (error) {
      console.log(error);
    }
  };

  // Function for adding new note
  const handleAddNote = async (job: any) => {
    try {
      const res = await addNote(
        userDetails.user._id,
        { jobId: job, note: note },
        userDetails.token
      );
      setError('');
      if (res.data) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setNote('');
          setNoteStatus(res.data);
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.status === 400) setError(error.response.data);
      setLoading(false);
    }
  };

  // Function for deleting note
  const handleDeleteNote = async (note: any, job: any) => {
    try {
      const res = await deleteNote(
        userDetails.user._id,
        { jobId: job._id, noteId: note._id },
        userDetails.token
      );
      setLoading2(true);
      if (res.data) {
        setTimeout(() => {
          setLoading2(false);
          setNoteStatus(res.data);
        }, 2000);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleLoadJobs();
  }, [status, search, activeCatId, noteStatus, activeSite]);

  const Prev = forwardRef((props, ref: any) => (
    <Button ref={ref} {...props} shadow='sm'>
      Prev
    </Button>
  ));
  const Next = forwardRef((props, ref: any) => (
    <Button ref={ref} {...props} shadow='sm'>
      Next
    </Button>
  ));

  const itemRender = (_: any, type: any) => {
    if (type === 'prev') {
      return Prev;
    }
    if (type === 'next') {
      return Next;
    }
  };

  return (
    <Box
      _light={{ bg: '#f7f8fd' }}
      pt={{ base: '5rem', md: '5rem' }}
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
            px={5}
            py={4}
            pt='4rem'
            shadow='md'
            rounded='md'
          >
            <DrawerCloseButton />
            <SideBar
              status={status}
              search={search}
              setSearch={setSearch}
              setStatus={setStatus}
              loadJobs={loadJobs}
              category={category}
              setCategory={setCategory}
              sidebar={sidebar}
              activeCat={activeCatId}
              setActiveCat={setActiveCatId}
              activeSite={activeSite}
              setActiveSite={setActiveSite}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </DrawerContent>
        </Drawer>
        <GridItem
          rowSpan={5}
          colSpan={1}
          display={{ base: 'none', lg: 'block' }}
        >
          <SideBar
            status={status}
            search={search}
            setSearch={setSearch}
            setStatus={setStatus}
            loadJobs={loadJobs}
            category={category}
            sidebar={sidebar}
            setCategory={setCategory}
            activeCat={activeCatId}
            setActiveCat={setActiveCatId}
            activeSite={activeSite}
            setActiveSite={setActiveSite}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
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
                    size='md'
                    colorScheme='linkedin'
                  />
                </chakra.span>
                <chakra.span>
                  <Button
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
            {userJobs && userJobs.length === 0 && (
              <Box
                bg='white'
                _dark={{ bg: 'gray.700' }}
                rounded='md'
                shadow='sm'
                pt={{ base: '3rem', md: '4rem' }}
                pb='8rem'
                display='flex'
                justifyContent='center'
                alignItems='center'
                flexDir='column'
                px='2rem'
              >
                <Image
                  src={Empty}
                  alt='empty'
                  h={{ base: '10rem', md: '12rem' }}
                  w={{ base: '10rem', md: '12rem' }}
                />
                <Box textAlign='center'>
                  <Text
                    fontSize='1.04rem'
                    color='gray.600'
                    _dark={{
                      color: 'gray.100',
                    }}
                    fontWeight='700'
                  >
                    No jobs found.
                  </Text>
                  <chakra.p
                    mt={2}
                    color='gray.600'
                    _dark={{
                      color: 'gray.300',
                    }}
                    fontSize='0.9rem'
                  >
                    We could not find any jobs. It seems you haven't added any
                    jobs here.
                  </chakra.p>
                </Box>
              </Box>
            )}
            {!userJobs && (
              <Box
                className='load-wrapp'
                textAlign='center'
                pt='5rem'
                pb='8rem'
              >
                <Box className='load-3' py='5rem'>
                  <Box
                    className='line'
                    bg='gray.600'
                    _dark={{ bg: 'gray.500' }}
                  ></Box>
                  <Box
                    className='line'
                    bg='gray.600'
                    _dark={{ bg: 'gray.500' }}
                  ></Box>
                  <Box
                    className='line'
                    bg='gray.600'
                    _dark={{ bg: 'gray.500' }}
                  ></Box>
                </Box>
              </Box>
            )}
            {user_jobs &&
              user_jobs.length > 0 &&
              user_jobs.map((job: {}, i: string) => {
                return (
                  <JobCard
                    {...job}
                    key={i}
                    loading={loading}
                    setLoading={setLoading}
                    loading2={loading2}
                    error={error}
                    note={note}
                    setNote={setNote}
                    setError={setError}
                    handleAddNote={handleAddNote}
                    handleDeleteNote={handleDeleteNote}
                    categories={category}
                  />
                );
              })}
          </Box>
          {userJobs && userJobs.length > pageSize && (
            <Box className='job-card'>
              <Pagination
                current={current}
                onChange={(page: any) => {
                  setCurrent(page);
                }}
                pageSize={pageSize}
                total={userJobs && userJobs.length}
                itemRender={itemRender}
                paginationProps={{
                  mt: '1rem',
                  display: 'flex',
                }}
                colorScheme='linkedin'
              />
            </Box>
          )}
        </GridItem>
      </Grid>
      <AddJobModal isOpen={isOpen} onClose={onClose} categories={category} />
    </Box>
  );
};

export default Jobs;
