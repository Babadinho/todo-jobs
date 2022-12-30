import React, { useContext, useState, useRef } from 'react';
import {
  Box,
  Flex,
  Image,
  Link,
  chakra,
  Tooltip,
  useDisclosure,
  Badge,
  List,
  ListItem,
  useToast,
  useOutsideClick,
} from '@chakra-ui/react';
import moment from 'moment';
import NotesModal from './NotesModal';
import { colors, colors_hover } from '../utils/globalVars';
import { changeJobStatus } from '../middlewares/job';
import { JobContext, UserContext } from '../context/Context';
import EditJobModal from './EditJobModal';
const Website = require('../public/images/website.png');

interface JobInfo {
  jobId: string;
  link: string;
  title: string;
  description?: string;
  category: string;
  endDate: string;
}

const JobCard = ({
  loading,
  setLoading,
  loading2,
  setLoading2,
  error,
  note,
  setNote,
  setError,
  handleAddNote,
  handleDeleteNote,
  categories,
  ...job
}: any) => {
  const {
    _id,
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
  const ref = React.useRef();
  const toast = useToast();
  const editModal = useDisclosure();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userDetails } = useContext(UserContext);
  const { setUserJobs } = useContext(JobContext);
  const [jobDetails, setJobDetails] = useState<JobInfo>({
    jobId: '',
    link: '',
    title: '',
    description: '',
    category: '',
    endDate: '',
  });
  const [currentStatus, setCurrentStatus] = useState<string | null>('');

  useOutsideClick({
    ref: ref,
    handler: () => setCurrentStatus(''),
  });

  const hadleJobStatus = async (jobId: string, newStatus: string) => {
    setCurrentStatus('');
    try {
      const res = await changeJobStatus(
        jobId,
        { userId: userDetails.user._id, status: newStatus },
        userDetails.token
      );
      if (res.data) {
        setLoading(false);
        setUserJobs(res.data);
        toast({
          title: 'Status updated successfully',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
      }
    } catch (error: any) {
      if (error.response.status === 400) setError(error.response.data);
      toast({
        title: error.response.data,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  return (
    <>
      <Box
        className='job-card'
        mx='auto'
        px={{ base: 5, md: 6 }}
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
              color:
                moment(endDate).diff(Date.now()) <= 0 ? 'red.400' : 'gray.400',
            }}
            cursor='pointer'
          >
            <Tooltip
              hasArrow
              label={
                endDate
                  ? moment(endDate).diff(Date.now()) <= 0
                    ? `Closed ${moment(endDate).fromNow()}`
                    : `Closing ${moment(endDate).fromNow()}`
                  : 'No closing date'
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
            ref={ref}
            display='flex'
            alignItems='center'
            as='span'
            px={2}
            py={1}
            cursor='pointer'
            bg={colors[status]}
            color='gray.100'
            fontSize='0.7rem'
            rounded='md'
            onClick={() => {
              setCurrentStatus(currentStatus !== _id ? _id : '');
            }}
            _hover={{
              bg: colors_hover[status],
            }}
            textTransform='capitalize'
            position='relative'
          >
            {status}
            <Box fontSize='0.6rem' as='span' ml='0.2rem'>
              <i className='fa-solid fa-chevron-down'></i>
            </Box>

            <Box
              bg='white'
              _dark={{ bg: 'gray.700', borderColor: 'gray.500' }}
              pt={1}
              pb={2}
              pl={2}
              w='7.2rem'
              display={currentStatus === _id ? 'flex' : 'none'}
              border='1px'
              borderColor='gray.200'
              rounded='md'
              shadow='sm'
              position='absolute'
              right={'0.05rem'}
              top={7}
              onMouseLeave={() => setCurrentStatus('')}
            >
              <List
                spacing={'0.1rem'}
                display='flex'
                flexDir='column'
                alignItems={'flex-end'}
                justifyContent='flex-start'
                fontSize='0.85rem'
                textTransform='capitalize'
              >
                {Object.keys(colors).map((status: string, i: any) => {
                  if (status !== job.status) {
                    return (
                      <ListItem
                        display={currentStatus === _id ? 'flex' : 'none'}
                        alignItems='center'
                        cursor='pointer'
                        key={i}
                        px='0.5rem'
                        color={colors[status]}
                        onClick={() => hadleJobStatus(_id, status)}
                        _hover={{ bg: 'gray.200', _dark: { bg: 'gray.600' } }}
                        rounded='sm'
                      >
                        {status}
                        <Box
                          color={colors[status]}
                          fontSize='0.4rem'
                          ml='0.3rem'
                        >
                          <i className='fa-solid fa-stop'></i>
                        </Box>
                      </ListItem>
                    );
                  }
                })}

                {/* <ListItem>Lorem ipsu</ListItem> */}
              </List>
            </Box>
          </Box>
        </Flex>

        <Box mt={2}>
          <Link
            fontSize='1.05rem'
            color={status === 'closed' ? 'gray.600' : 'gray.700'}
            _dark={{
              color: status === 'closed' ? 'gray.400' : 'gray.50',
            }}
            fontWeight='700'
            _hover={{
              color: 'gray.600',
              _dark: {
                color: 'gray.200',
              },
              textDecor: 'none',
            }}
            href={link}
            target='_blank'
          >
            <chakra.h2>{title}</chakra.h2>
          </Link>
          <chakra.p
            mt={2}
            color='gray.600'
            _dark={{
              color: 'gray.300',
            }}
            fontSize='0.92rem'
          >
            {description.substring(0, 230)}
            {description.length > 143 && '..'}
          </chakra.p>
        </Box>

        <Flex justifyContent='space-between' alignItems='center' mt={4}>
          <Flex align='center'>
            <Image
              mr='0.3rem'
              w={5}
              h={5}
              rounded='full'
              fit='cover'
              src={image ? image : Website}
              alt='avatar'
            />
            <Link
              href={`https://www.${domain}`}
              target='_blank'
              _hover={{ textDecoration: 'none' }}
            >
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
            </Link>
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
            <Box cursor='pointer' mr='0.5rem'>
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
            <Box
              cursor='pointer'
              onClick={() => {
                setJobDetails({
                  jobId: job._id,
                  link: job.link,
                  title: job.title,
                  description: job.description,
                  category: job.category._id,
                  endDate: job.endDate,
                });
                editModal.onOpen();
              }}
            >
              <Tooltip
                hasArrow
                label='Edit job'
                bg='gray.300'
                color='black'
                placement='top'
                fontSize='0.75rem'
              >
                <i className='fa-solid fa-pen-to-square'></i>
              </Tooltip>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <NotesModal
        isOpen={isOpen}
        onClose={onClose}
        job={job}
        loading={loading}
        setLoading={setLoading}
        loading2={loading2}
        error={error}
        note={note}
        setNote={setNote}
        setError={setError}
        handleAddNote={handleAddNote}
        handleDeleteNote={handleDeleteNote}
      />
      <EditJobModal
        job={job}
        jobDetails={jobDetails}
        setJobDetails={setJobDetails}
        editModal={editModal}
        isOpen={editModal.isOpen}
        onClose={editModal.onClose}
        categories={categories}
      />
    </>
  );
};

export default JobCard;
