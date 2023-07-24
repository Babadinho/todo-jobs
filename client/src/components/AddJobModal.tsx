import React, { useContext, useState } from 'react';
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
  InputRightAddon,
  Slide,
  Flex,
  useOutsideClick,
  FormHelperText,
} from '@chakra-ui/react';
import { addJob, fetchJob } from '../middlewares/job';
import { UserContext, JobContext } from '../context/Context';

interface JobInfo {
  link: string;
  title: string;
  description?: string;
  category: string;
  endDate: string;
  image: string;
}

const AddJobModal = ({ onClose, isOpen, categories }: any) => {
  const ref = React.useRef();
  const toast = useToast();
  const { userDetails } = useContext(UserContext);
  const { setUserJobs } = useContext(JobContext);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<Boolean>(false);
  const [loading2, setLoading2] = useState<Boolean>(false);
  const [jobDetails, setJobDetails] = useState<JobInfo>({
    link: '',
    title: '',
    description: '',
    category: '',
    endDate: '',
    image: '',
  });

  const { link, title, description, category, endDate } = jobDetails;

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  const handleChange = (name: string) => (e: { target: { value: string } }) => {
    setJobDetails({ ...jobDetails, [name]: e.target.value });
    setError('');
  };

  // Function for fetching job details using node-fetch from server
  const handlefetchJob = async () => {
    try {
      setLoading2(true);
      setError('');
      const res = await fetchJob({ link }, userDetails.token);
      if (res.data) {
        setTimeout(() => {
          setLoading2(false);
          setJobDetails({
            ...jobDetails,
            title: res.data.title,
            description: res.data.desc,
            image: res.data.image,
          });
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.status === 400) setError(error.response.data);
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

  // Function for adding new job
  const handleAddJob = async () => {
    setError('');
    try {
      const res = await addJob(
        userDetails.user._id,
        { jobDetails },
        userDetails.token
      );
      if (res.data) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setUserJobs(res.data);
          onClose();
          toast({
            title: 'Job added successfully',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
          });
          setJobDetails({
            link: '',
            title: '',
            description: '',
            category: '',
            endDate: '',
            image: '',
          });
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.status === 400) setError(error.response.data);
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

  return (
    <Box>
      <Slide
        ref={ref}
        direction='right'
        in={isOpen}
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
          overflow='auto'
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
              onClose();
              setLoading2(false);
              setLoading(false);
              setJobDetails({
                link: '',
                title: '',
                description: '',
                category: '',
                endDate: '',
                image: '',
              });
            }}
            cursor='pointer'
            fontSize='1.15rem'
          >
            <Flex align='center'>
              {/* <Box as='span'>Close</Box>
              <ArrowForwardIcon pt='0.15rem' /> */}
              <i className='fa-solid fa-xmark'></i>
            </Flex>
          </Button>
          <Stack
            spacing={8}
            mx={'auto'}
            maxW={'lg'}
            py={10}
            w={{ base: 'full', md: '63vh' }}
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
                            type='tel'
                            placeholder='https://www.example.com'
                            focusBorderColor='brand.400'
                            rounded='md'
                            value={link}
                            onChange={handleChange('link')}
                          />
                          <InputRightAddon
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
                            rounded='md'
                            cursor='pointer'
                            onClick={handlefetchJob}
                          >
                            {loading2 ? (
                              <Spinner size='xs' />
                            ) : (
                              <Box as='span'>
                                <i className='fa-solid fa-link'></i> &nbsp;
                                Fetch job
                              </Box>
                            )}
                          </InputRightAddon>
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
                          placeholder='Select category'
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
                            categories.map((category: any, i: any) => (
                              <option
                                key={i}
                                value={category._id}
                                style={{ textTransform: 'capitalize' }}
                              >
                                {category.name}
                              </option>
                            ))}
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
                          value={endDate}
                          onChange={handleChange('endDate')}
                        />
                      </FormControl>
                    </Box>
                  </Stack>
                </chakra.form>
                <Flex justify='flex-end' mt='1.5rem' pr={2}>
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
                    onClick={handleAddJob}
                  >
                    {loading ? <Spinner thickness='4px' size='md' /> : 'Submit'}
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

export default AddJobModal;
