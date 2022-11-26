import React from 'react';
import {
  chakra,
  Box,
  Button,
  Stack,
  Image,
  Text,
  Icon,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';

const Index = () => {
  const Feature = (props: any) => {
    return (
      <Flex>
        <Flex shrink={0}>
          <Flex
            alignItems='center'
            justifyContent='center'
            h={12}
            w={12}
            rounded='md'
            bg='linkedin.500'
            color='gray.50'
          >
            <Icon
              boxSize={6}
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              aria-hidden='true'
            >
              {props.icon}
            </Icon>
          </Flex>
        </Flex>
        <Box ml={4}>
          <chakra.dt
            fontSize='lg'
            fontWeight='medium'
            lineHeight='6'
            _light={{ color: 'gray.900' }}
          >
            {props.title}
          </chakra.dt>
          <chakra.dd mt={2} color='gray.500' _dark={{ color: 'gray.400' }}>
            {props.children}
          </chakra.dd>
        </Box>
      </Flex>
    );
  };

  return (
    <Box
      mt={{ base: '4rem', md: '7rem' }}
      px={{ base: '1rem', md: '5rem', xl: '12rem' }}
      className='main'
      pb={{ base: '5rem', md: '3rem' }}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Box
        w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
        mx='auto'
        textAlign={{ base: 'left', md: 'center' }}
      >
        <chakra.h1
          mb={6}
          fontSize={{ base: '4xl', md: '6xl' }}
          fontWeight='bold'
          lineHeight='none'
          letterSpacing={{ base: 'normal', md: 'tight' }}
          color='gray.700'
          _dark={{ color: 'gray.100' }}
        >
          Track all your{' '}
          <Text
            display={{ base: 'block', lg: 'inline' }}
            w='full'
            bgClip='text'
            bgGradient='linear(to-r, green.400,linkedin.500)'
            fontWeight='extrabold'
          >
            job applications
          </Text>{' '}
          in a single place.
        </chakra.h1>
        <chakra.p
          px={{ base: 0, lg: 15 }}
          mb={6}
          fontSize={{ base: 'lg', md: 'xl' }}
          color='gray.600'
          _dark={{ color: 'gray.300' }}
        >
          Todojobs is a web application that allows it users to record and keep
          track of their job applications. You can now ditch excel and use use
          todojobs which is easier and faster to use. Allows you to also
          categorize your job applications.
        </chakra.p>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          mb={{ base: 4, md: 8 }}
          spacing={2}
          justifyContent={{ sm: 'left', md: 'center' }}
        >
          <Button
            as='a'
            variant='solid'
            color='white'
            bg='linkedin.500'
            _hover={{ bg: 'linkedin.600' }}
            display='inline-flex'
            alignItems='center'
            justifyContent='center'
            w={{ base: 'full', sm: 'auto' }}
            mb={{ base: 2, sm: 0 }}
            size='lg'
            cursor='pointer'
            href='/login'
          >
            Get Started
            <Icon boxSize={4} ml={1} viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </Icon>
          </Button>
          <Button
            as='a'
            colorScheme='gray'
            display='inline-flex'
            alignItems='center'
            justifyContent='center'
            w={{ base: 'full', sm: 'auto' }}
            mb={{ base: 2, sm: 0 }}
            size='lg'
            cursor='pointer'
            href='#howItWorks'
          >
            How it Works
            <Icon boxSize={4} ml={1} viewBox='0 0 20 20' fill='currentColor'>
              <path
                fillRule='evenodd'
                d='M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z'
                clipRule='evenodd'
              />
            </Icon>
          </Button>
        </Stack>
      </Box>
      <Box
        w={{ base: 'full', md: 10 / 12 }}
        mx='auto'
        mt={20}
        textAlign='center'
      >
        <Image
          w='full'
          rounded='lg'
          shadow='2xl'
          src='https://kutty.netlify.app/hero.jpg'
          alt='Hellonext feedback boards software screenshot'
        />
      </Box>
      <Flex
        justifyContent='center'
        alignItems='center'
        mt='10rem'
        id='howItWorks'
        className='scrollTo'
      >
        <Box py={12} bg='white' _dark={{ bg: 'gray.700' }} rounded='xl'>
          <Box maxW='7xl' mx='auto' px={{ base: 4, lg: 8 }} pb={4}>
            <Box textAlign='center'>
              <chakra.h2
                _light={{ color: 'brand.600' }}
                fontSize='1.1rem'
                fontWeight='semibold'
                textTransform='uppercase'
                letterSpacing='wide'
                pb={4}
              >
                How it Works
                <Icon
                  boxSize={4}
                  ml={1}
                  mb={1}
                  viewBox='0 0 20 20'
                  fill='currentColor'
                >
                  <path
                    fillRule='evenodd'
                    d='M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z'
                    clipRule='evenodd'
                  />
                </Icon>
              </chakra.h2>
              <chakra.p
                mt={2}
                fontSize={{ base: '3xl', sm: '4xl' }}
                lineHeight='8'
                fontWeight='extrabold'
                letterSpacing='tight'
                _light={{ color: 'gray.700' }}
              >
                Track your job applications with ease
              </chakra.p>
              <chakra.p
                mt={4}
                maxW='2xl'
                fontSize='xl'
                mx={{ lg: 'auto' }}
                color='gray.500'
                _dark={{ color: 'gray.400' }}
              >
                You can finally get to keep track of all your job applications
                as well as record the status of your applications. You can also
                add to your google calendar any job application.
              </chakra.p>
            </Box>

            <Box mt={10}>
              <Stack
                spacing={{ base: 10, md: 0 }}
                display={{ md: 'grid' }}
                gridTemplateColumns={{ md: 'repeat(2,1fr)' }}
                gridColumnGap={{ md: 8 }}
                gridRowGap={{ md: 10 }}
              >
                <Feature
                  title='Categorize your applications'
                  icon={
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9'
                    />
                  }
                >
                  You can categorize your applications by creating different
                  categories and adding your job applications to any
                  corresponding category. You can also edit or delete your
                  categories.
                </Feature>

                <Feature
                  title='Manage application status'
                  icon={
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3'
                    />
                  }
                >
                  You can manage your application status. You can change to
                  Rejected, Assessment, Interview or set it to closed. It is
                  automatically set to close when the end date reaches.
                </Feature>

                <Feature
                  title='Robust job filter'
                  icon={
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M13 10V3L4 14h7v7l9-11h-7z'
                    />
                  }
                >
                  Filter between job applications using the category, status,
                  and the job board or website. The search feature also adds and
                  extra way to narrow down what you are looing for.
                </Feature>

                <Feature
                  title='Manage job application'
                  icon={
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
                    />
                  }
                >
                  You can delete or edit your job applications with easy. You
                  can add notes to your job applications. Job applications with
                  notes display the note count.
                </Feature>
              </Stack>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default Index;
