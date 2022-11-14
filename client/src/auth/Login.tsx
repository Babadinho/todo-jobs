import {
  Flex,
  Box,
  Stack,
  Text,
  Input,
  Heading,
  useColorModeValue,
  FormControl,
  useToast,
  Button,
  Spinner,
  FormLabel,
  InputRightElement,
  InputGroup,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import { authenticate, login, signinGoogle } from '../actions/auth';
import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

interface UserInfo {
  email: string;
  password: string;
}

declare const google: any;

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [values, setValues] = useState<UserInfo>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = values;

  const handleChange = (name: string) => (e: { target: { value: string } }) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await login({
        email: email,
        password: password,
      });
      setLoading(true);
      if (res.data) {
        authenticate(res.data);
        setTimeout(() => {
          setValues({
            email: '',
            password: '',
          });
          navigate('/', res.data);
        }, 2000);
      }
    } catch (error: any) {
      toast({
        title: error.response.data,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (response: any) => {
    try {
      const res = await signinGoogle(response);
      setLoading(true);
      if (res.data) {
        authenticate(res.data);
        setTimeout(() => {
          setValues({
            email: '',
            password: '',
          });
          navigate('/', res.data);
        }, 2000);
      }
    } catch (error: any) {
      toast({
        title: error.response.data,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleGoogleLogin,
    });

    google.accounts.id.renderButton(document.getElementById('loginGoogle'), {
      type: 'standard',
      // theme: 'filled_black',
      size: 'large',
      text: 'signin_with',
      shape: 'pill',
    });
  }, []);

  return (
    <>
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
            <Heading fontSize={'3xl'} color={'linkedin.500'}>
              Account Login
            </Heading>
            <Text
              _dark={{
                color: 'gray',
              }}
              fontSize={'1xl'}
              color={'gray.600'}
              align={'center'}
            >
              Login to view and manage your job applications
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}
          >
            <Stack spacing={4} color='gray.600'>
              <Box id='loginGoogle' mx='auto' mb='1rem'></Box>
              <FormControl id='email' isRequired>
                <FormLabel
                  _dark={{
                    color: 'gray',
                  }}
                >
                  Email address
                </FormLabel>
                <Input
                  type='email'
                  value={email}
                  onChange={handleChange('email')}
                />
              </FormControl>
              <FormControl id='password' isRequired>
                <FormLabel
                  _dark={{
                    color: 'gray',
                  }}
                >
                  Password
                </FormLabel>
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
              <Stack spacing={10} onClick={handleLogin}>
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
                  {loading ? <Spinner thickness='4px' size='lg' /> : 'Login'}
                </Button>
              </Stack>
              <Box
                _dark={{
                  color: 'gray',
                }}
                textAlign='center'
                fontSize='0.95rem'
                pt='0.5rem'
              >
                Don't have an account?{' '}
                <Link to='/register'>
                  {' '}
                  <Box
                    as='span'
                    color='linkedin.500'
                    _hover={{ color: 'linkedin.600' }}
                  >
                    Register
                  </Box>
                </Link>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
