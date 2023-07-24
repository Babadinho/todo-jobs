import React, { useContext, useState, useRef } from 'react';
import {
  Button,
  Box,
  chakra,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  InputGroup,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  useToast,
  Spinner,
  useColorModeValue,
  Slide,
  Flex,
  useOutsideClick,
  FormHelperText,
} from '@chakra-ui/react';
import { editJob, deleteJob } from '../middlewares/job';
import { UserContext, JobContext } from '../context/Context';
import moment from 'moment';

const EditJobModal = ({
  editModal,
  categories,
  job,
  jobDetails,
  setJobDetails,
}: any) => {
  const ref = useRef();
  const toast = useToast();
  const { userDetails } = useContext(UserContext);
  const { setUserJobs } = useContext(JobContext);
  const [loading, setLoading] = useState<Boolean>(false);
  const [loading2, setLoading2] = useState<Boolean>(false);

  const { link, title, description, category, endDate } = jobDetails;

  useOutsideClick({
    ref: ref,
    handler: () => editModal.onClose(),
  });

  const handleChange = (name: string) => (e: { target: { value: string } }) => {
    setJobDetails({ ...jobDetails, [name]: e.target.value });
  };

  // Function for Editing job
  const handleEditJob = async () => {
    try {
      const res = await editJob(
        userDetails.user._id,
        { jobDetails },
        userDetails.token
      );
      if (res.data) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setUserJobs(res.data);
          editModal.onClose();
          toast({
            title: 'Job edited successfully',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
          });
        }, 2000);
      }
    } catch (error: any) {
      setLoading(false);
      toast({
        title: error.response.data,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
    }
  };

  // Function for deleting job
  const handleDeleteJob = async (jobId: string) => {
    try {
      const res = await deleteJob(
        userDetails.user._id,
        { jobId, category },
        userDetails.token
      );
      if (res.data) {
        setLoading2(true);
        setTimeout(() => {
          setLoading2(false);
          setUserJobs(res.data);
          editModal.onClose();
          toast({
            title: 'Job deleted successfully',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
          });
        }, 2000);
      }
    } catch (error: any) {
      setLoading2(false);
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
    <Box>
      <Slide
        ref={ref}
        direction='right'
        in={editModal.isOpen}
        style={{ zIndex: 10, width: 'full' }}
      >
        <Box
          p='1rem'
          rounded='md'
          shadow='md'
          h='100vh'
          w={{ base: '100vw', md: 'xl' }}
          zIndex={10}
          bg={useColorModeValue('white', 'gray.700')}
        >
          <Button
            size='0.8rem'
            ml={4}
            py={1}
            px={2}
            bg='gray.50'
            _dark={{
              bg: 'gray.500',
              color: 'white',
            }}
            _hover={{
              bg: 'gray.100',
              _dark: {
                bg: 'gray.400',
              },
            }}
            color='gray.500'
            onClick={() => {
              editModal.onClose();
              setLoading2(false);
              setLoading(false);
            }}
            cursor='pointer'
            fontSize='1.15rem'
          >
            <Flex align='center'>
              <i className='fa-solid fa-xmark'></i>
            </Flex>
          </Button>
          <Stack
            spacing={8}
            mx={'auto'}
            maxW={'lg'}
            py={10}
            w={{ base: 'full', md: '63vh' }}
            overflow='auto'
          >
            <Box
              rounded={'lg'}
              bg={useColorModeValue('white', 'gray.700')}
              p={4}
            >
              <Box>
                <chakra.form
                  method='POST'
                  overflow={{
                    sm: 'hidden',
                  }}
                >
                  <Stack
                    bg='white'
                    _dark={{
                      bg: 'gray.700',
                    }}
                    spacing={6}
                    p={{
                      sm: 2,
                    }}
                  >
                    <SimpleGrid columns={3} spacing={6}>
                      <FormControl
                        as={GridItem}
                        colSpan={[3, 4]}
                        id='link'
                        isRequired
                      >
                        <FormLabel
                          fontSize='sm'
                          fontWeight='md'
                          color='gray.700'
                          _dark={{
                            color: 'gray.50',
                          }}
                        >
                          Job Link
                        </FormLabel>
                        <InputGroup size='sm'>
                          <Input
                            _dark={{
                              _placeholder: { color: 'gray.200' },
                            }}
                            type='text'
                            placeholder='https://www.example.com'
                            focusBorderColor='brand.400'
                            rounded='md'
                            value={link}
                            onChange={handleChange('link')}
                          />
                        </InputGroup>
                      </FormControl>
                    </SimpleGrid>

                    <Box>
                      <FormControl id='description' mt={1} isRequired>
                        <FormLabel
                          fontSize='sm'
                          fontWeight='md'
                          color='gray.700'
                          _dark={{
                            color: 'gray.50',
                          }}
                        >
                          Title
                        </FormLabel>

                        <Input
                          _dark={{
                            _placeholder: { color: 'gray.200' },
                          }}
                          placeholder='Enter job title'
                          mt={1}
                          shadow='sm'
                          focusBorderColor='brand.400'
                          fontSize={{
                            sm: 'sm',
                          }}
                          value={title}
                          onChange={handleChange('title')}
                        />
                        <FormHelperText fontStyle='italic' fontSize='0.85rem'>
                          Use good format. E.g: Web Developer at Google
                        </FormHelperText>
                      </FormControl>
                    </Box>

                    <Box>
                      <FormControl id='description' mt={1}>
                        <FormLabel
                          fontSize='sm'
                          fontWeight='md'
                          color='gray.700'
                          _dark={{
                            color: 'gray.50',
                          }}
                        >
                          Description
                        </FormLabel>
                        <Textarea
                          _dark={{
                            _placeholder: { color: 'gray.200' },
                          }}
                          placeholder='Enter job description'
                          mt={1}
                          rows={3}
                          shadow='sm'
                          focusBorderColor='brand.400'
                          fontSize={{
                            sm: 'sm',
                          }}
                          value={description}
                          onChange={handleChange('description')}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id='category' isRequired>
                        <FormLabel
                          htmlFor='country'
                          fontSize='sm'
                          fontWeight='md'
                          color='gray.700'
                          _dark={{
                            color: 'gray.50',
                          }}
                        >
                          Category
                        </FormLabel>
                        <Select
                          placeholder={job.category.name}
                          mt={1}
                          focusBorderColor='brand.400'
                          shadow='sm'
                          size='sm'
                          w='full'
                          rounded='md'
                          value={category}
                          onChange={handleChange('category')}
                        >
                          {categories &&
                            categories.map((category: any, i: any) => {
                              if (job.category.name != category.name) {
                                return (
                                  <option
                                    key={i}
                                    value={category._id}
                                    style={{ textTransform: 'capitalize' }}
                                  >
                                    {category.name}
                                  </option>
                                );
                              }
                            })}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl id='endDate' mt={1}>
                        <FormLabel
                          fontSize='sm'
                          fontWeight='md'
                          color='gray.700'
                          _dark={{
                            color: 'gray.50',
                          }}
                        >
                          Close Date
                        </FormLabel>
                        <Input
                          type='date'
                          mt={1}
                          shadow='sm'
                          focusBorderColor='brand.400'
                          fontSize={{
                            sm: 'sm',
                          }}
                          value={
                            endDate && moment(endDate).format('YYYY-MM-DD')
                          }
                          onChange={handleChange('endDate')}
                        />
                      </FormControl>
                    </Box>
                  </Stack>
                </chakra.form>
                <Flex justify='flex-end' alignItems='center' mt='1.5rem' pr={2}>
                  <Button
                    mr='0.7rem'
                    minW='6.5rem'
                    type='submit'
                    bg='red.500'
                    color='gray.100'
                    _hover={{ bg: 'red.600' }}
                    _focus={{
                      shadow: '',
                    }}
                    fontWeight='md'
                    onClick={() => handleDeleteJob(job._id)}
                  >
                    {loading2 ? (
                      <Spinner thickness='4px' size='md' />
                    ) : (
                      'Delete'
                    )}
                  </Button>

                  <Button
                    minW='6.5rem'
                    type='submit'
                    bg='linkedin.500'
                    color='gray.100'
                    _hover={{ bg: 'linkedin.600' }}
                    _focus={{
                      shadow: '',
                    }}
                    fontWeight='md'
                    onClick={handleEditJob}
                  >
                    {loading ? (
                      <Spinner thickness='4px' size='md' />
                    ) : (
                      'Edit Job'
                    )}
                  </Button>
                </Flex>
              </Box>
            </Box>
          </Stack>
        </Box>
      </Slide>
    </Box>
  );
};

export default EditJobModal;
