import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  useToast,
  Text,
  Spinner,
  useColorModeValue,
  HStack,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { authenticate, register, signinGoogle } from '../middlewares/auth';
import { UserContext } from '../context/Context';

interface UserInfo {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

declare const google: any;

const Register = () => {
  const { setUserDetails } = useContext(UserContext);
  const toast = useToast();
  const navigate = useNavigate();
  const [values, setValues] = useState<UserInfo>({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [registerText, setRegisterText] = useState<string>('Register');

  const { firstName, lastName, email, password } = values;

  const handleChange = (name: string) => (e: { target: { value: string } }) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setRegisterText('Please wait..');
    try {
      const res = await register({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      });
      setLoading(true);
      if (res.data) {
        authenticate(res.data);
        setTimeout(() => {
          toast({
            title: 'Registration was successful',
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
          });
          setUserDetails(res.data);
          navigate('/jobs');
        }, 2000);
      }
    } catch (error: any) {
      toast({
        title: error.response.data,
        status: 'error',
        duration: 4000,
        isClosable: true,
        position: 'top',
      });
      setLoading(false);
      setRegisterText('Register');
    }
  };

  const handleGoogleRegister = async (response: any) => {
    setRegisterText('Please wait..');
    try {
      const res = await signinGoogle(response);
      setLoading(true);
      if (res.data) {
        authenticate(res.data);
        setTimeout(() => {
          setUserDetails(res.data);
          navigate('/');
        }, 3000);
      }
    } catch (error: any) {
      toast({
        title: error.response.data,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
      setRegisterText('Register');
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleGoogleRegister,
    });

    google.accounts.id.renderButton(document.getElementById('signupGoogle'), {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      text: 'signup_with',
      shape: 'pill',
    });
    // google.accounts.id.prompt()
  }, []);

  return (
    <Box className='main'>
      <Flex align={'center'} justify={'center'} mt='2rem'>
        <Stack
          spacing={8}
          mx={'auto'}
          maxW={'lg'}
          py={12}
          px={4}
          w={{ base: 'full', md: '63vh' }}
        >
          <Stack align={'center'}>
            <Heading
              fontSize={'1.6rem'}
              color={'gray.700'}
              _dark={{
                color: 'gray.50',
              }}
              textAlign='center'
              className='heading'
            >
              Register Account
            </Heading>
            <Text
              _dark={{
                color: 'gray.50',
              }}
              fontSize={'1xl'}
              color={'gray.600'}
              align={'center'}
            >
              To track and manage job applications
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'sm'}
            p={8}
          >
            <Stack spacing={4} color='gray.600'>
              <Box id='signupGoogle' mx='auto' mb='1rem' />
              <HStack>
                <Box>
                  <FormControl
                    id='firstName'
                    isRequired
                    _dark={{
                      color: 'gray.50',
                    }}
                  >
                    <FormLabel>First Name</FormLabel>
                    <Input
                      type='text'
                      value={firstName}
                      onChange={handleChange('firstName')}
                    />
                  </FormControl>
                </Box>
                <Box>
                  <FormControl
                    id='lastName'
                    isRequired
                    _dark={{
                      color: 'gray.50',
                    }}
                  >
                    <FormLabel>Last Name</FormLabel>
                    <Input
                      type='text'
                      value={lastName}
                      onChange={handleChange('lastName')}
                    />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl
                id='email'
                isRequired
                _dark={{
                  color: 'gray.50',
                }}
              >
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  value={email}
                  onChange={handleChange('email')}
                />
              </FormControl>
              <FormControl
                id='password'
                isRequired
                _dark={{
                  color: 'gray.50',
                }}
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handleChange('password')}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} onClick={handleRegister}>
                <Button
                  loadingText='Submitting'
                  size='lg'
                  fontWeight='500'
                  bg={'linkedin.500'}
                  color={'white'}
                  _hover={{
                    bg: 'linkedin.600',
                  }}
                >
                  {loading ? (
                    <Spinner thickness='4px' size='lg' />
                  ) : (
                    registerText
                  )}
                </Button>
              </Stack>
              <Box
                _dark={{
                  color: 'gray.50',
                }}
                textAlign='center'
                fontSize='0.95rem'
                pt='0.5rem'
              >
                Already have an account?{' '}
                <Link to='/login'>
                  {' '}
                  <Box
                    as='span'
                    color='linkedin.500'
                    _hover={{ color: 'linkedin.600' }}
                  >
                    Login
                  </Box>
                </Link>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Register;
