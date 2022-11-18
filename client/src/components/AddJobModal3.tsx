import React, { useContext, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
  Text,
  InputRightAddon,
  FormHelperText,
} from '@chakra-ui/react';
import { addJob, fetchJob } from '../middlewares/job';
import { UserContext } from '../context/Context';

interface JobInfo {
  link: string;
  title: string;
  description?: string;
  category: string;
  endDate: string;
  image: string;
}

const AddJobModal = ({ onClose, isOpen, categories }: any) => {
  const toast = useToast();
  const { userDetails } = useContext(UserContext);
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

  const handleChange = (name: string) => (e: { target: { value: any } }) => {
    setJobDetails({ ...jobDetails, [name]: e.target.value });
    setError('');
  };

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
    }
  };

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
          onClose();
          toast({
            title: 'Job added successfully',
            status: 'success',
            duration: 4000,
            isClosable: true,
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
    }
  };

  return (
    <>
      <Modal
        onClose={() => {
          onClose();
          setError('');
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
        size={'xl'}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add new job</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color='red.500' pb='0.1rem' textAlign='center'>
              {error && error}
            </Text>
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
                              <i className='fa-solid fa-link'></i> &nbsp; Fetch
                              job
                            </Box>
                          )}
                        </InputRightAddon>
                      </InputGroup>
                      <FormHelperText></FormHelperText>
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
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              minW='5.628rem'
              type='submit'
              colorScheme='linkedin'
              _focus={{
                shadow: '',
              }}
              fontWeight='md'
              onClick={handleAddJob}
            >
              {loading ? <Spinner thickness='4px' size='md' /> : 'Add Job'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddJobModal;
