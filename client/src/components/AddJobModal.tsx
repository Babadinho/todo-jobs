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
  FormHelperText,
  FormLabel,
  GridItem,
  Input,
  InputGroup,
  InputLeftAddon,
  Select,
  SimpleGrid,
  Stack,
  Textarea,
  useToast,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { addJob } from '../actions/job';
import { UserContext } from '../context/Context';

interface JobInfo {
  link: string;
  description: string;
  category: string;
  date: string;
}

const AddJobModal = ({ onClose, isOpen, categories }: any) => {
  const toast = useToast();
  const { userDetails } = useContext(UserContext);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<Boolean>(false);
  const [jobDetails, setJobDetails] = useState<JobInfo>({
    link: '',
    description: '',
    category: '',
    date: '',
  });

  const { link, description, category, date } = jobDetails;

  const handleChange = (name: string) => (e: { target: { value: any } }) => {
    setJobDetails({ ...jobDetails, [name]: e.target.value });
  };

  const handleAddJob = async () => {
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
          // onClose();
          toast({
            title: 'Job added successfully',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
          // setJobDetails({ link: '', description: '', category: '', date: '' });
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.status === 400) setError(error.response.data);
      setLoading(false);
    }
  };

  return (
    <>
      <Modal onClose={onClose} size={'xl'} isOpen={isOpen}>
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
                    bg: '#141517',
                  }}
                  spacing={6}
                  p={{
                    sm: 6,
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
                        <InputLeftAddon
                          bg='gray.50'
                          _dark={{
                            bg: 'gray.800',
                          }}
                          color='gray.500'
                          rounded='md'
                        >
                          http://
                        </InputLeftAddon>
                        <Input
                          type='tel'
                          placeholder='www.example.com'
                          focusBorderColor='brand.400'
                          rounded='md'
                          value={link}
                          onChange={handleChange('link')}
                        />
                      </InputGroup>
                    </FormControl>
                  </SimpleGrid>

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
                      <FormHelperText>
                        If empty, we will try to fetch a description.
                      </FormHelperText>
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
                    <FormControl id='date' mt={1}>
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
                        value={date}
                        onChange={handleChange('date')}
                      />
                    </FormControl>
                  </Box>
                </Stack>
              </chakra.form>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              type='submit'
              colorScheme='linkedin'
              _focus={{
                shadow: '',
              }}
              fontWeight='md'
              onClick={handleAddJob}
            >
              {loading ? <Spinner thickness='4px' size='lg' /> : 'Add Job'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddJobModal;
