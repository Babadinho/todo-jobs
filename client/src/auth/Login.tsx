import React, { useContext } from 'react';
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
import { authenticate, login, signinGoogle } from '../middlewares/auth';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/Context';
import useScript from '../hooks/useScript';

interface UserInfo {
  email: string;
  password: string;
}

const Login = () => {
  const { setUserDetails } = useContext(UserContext);
  const navigate = useNavigate();
  const toast = useToast();
  const { loaded, error } = useScript('https://apis.google.com/js/platform.js');
  const [values, setValues] = useState<UserInfo>({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginText, setLoginText] = useState<string>('Login');

  const { email, password } = values;

  const handleChange = (name: string) => (e: { target: { value: string } }) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoginText('Please wait..');
    try {
      const res = await login({
        email: email,
        password: password,
      });
      setLoading(true);
      if (res.data) {
        authenticate(res.data);
        setTimeout(() => {
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
      });
      setLoading(false);
      setLoginText('Login');
    }
  };

  const handleGoogleLogin = async (response: any) => {
    setLoginText('Please wait..');
    try {
      const res = await signinGoogle(response);
      setLoading(true);
      if (res.data) {
        authenticate(res.data);
        setTimeout(() => {
          setUserDetails(res.data);
          navigate('/', res.data);
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
      setLoginText('Login');
    }
  };

  useEffect(() => {
    if (loaded && !error && (window as any).google) {
      (window as any).google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleLogin,
      });

      (window as any).google.accounts.id.renderButton(
        document.getElementById('loginGoogle'),
        {
          type: 'standard',
          // theme: 'filled_black',
          size: 'large',
          text: 'signin_with',
          shape: 'pill',
        }
      );
    }
  }, [loaded, error]);

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
              className='heading'
            >
              Account Login
            </Heading>
            <Text
              _dark={{
                color: 'gray.50',
              }}
              fontSize={'1xl'}
              color={'gray.600'}
              align={'center'}
            >
              Login to manage your job applications
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'sm'}
            p={8}
          >
            <Stack spacing={4} color='gray.600'>
              <Box id='loginGoogle' mx='auto' mb='1rem'></Box>
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
                  {loading ? <Spinner thickness='4px' size='lg' /> : loginText}
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
    </Box>
  );
};

export default Login;
