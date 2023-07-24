import React, { useEffect } from 'react';
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
const Hero = require('../public/images/hero.png');
import { Link, animateScroll as scroll } from 'react-scroll';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Index = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const animation = useAnimation();

  const container = {
    show: {
      transition: {
        staggerChildren: 0.35,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        ease: [0.6, 0.01, -0.05, 0.01],
        duration: 1.6,
      },
    },
    exit: {
      opacity: 0,
      y: -200,
      transition: {
        ease: 'easeInOut',
        duration: 0.8,
      },
    },
  };

  useEffect(() => {
    if (inView) {
      animation.start('show');
    }
  }, [animation, inView]);

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
            <Box fontSize='1.3rem'>{props.icon}</Box>
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
      pt={{ base: '4rem', md: '7rem' }}
      px={{ base: '1rem', md: '5rem', xl: '12rem' }}
      className='main'
      pb={{ base: '5rem', md: '6rem' }}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Box
        w={{ base: 'full', md: 11 / 12, xl: 9 / 12 }}
        mx='auto'
        textAlign={{ base: 'left', md: 'center' }}
        maxW='7xl'
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
          Todojobs is a web application that allows to you record and keep track
          of your job applications. You can now ditch excel and use use todojobs
          which is easier and faster to use. Categorize and seamlessly manage
          your job applications.
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
          <Link
            activeClass='active'
            to='howItWorks'
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
          >
            <Button
              colorScheme='gray'
              display='inline-flex'
              alignItems='center'
              justifyContent='center'
              w={{ base: 'full', sm: 'auto' }}
              mb={{ base: 2, sm: 0 }}
              size='lg'
              cursor='pointer'
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
          </Link>
        </Stack>
      </Box>
      <Box mx='auto' mt={20} textAlign='center' maxW='7xl'>
        {' '}
        <motion.div
          variants={container}
          initial='hidden'
          animate='show'
          exit='exit'
        >
          <motion.div variants={item}>
            <Image
              w='full'
              rounded='lg'
              shadow='md'
              src={Hero}
              alt='todojobs application dashboard'
            />
          </motion.div>
        </motion.div>
      </Box>
      <Box as='div' ref={ref}>
        <Flex
          justifyContent='center'
          alignItems='center'
          mt='8rem'
          id='howItWorks'
          className='scrollTo'
        >
          <motion.div
            variants={container}
            animate={animation}
            initial='hidden'
            exit='exit'
          >
            <motion.div variants={item}>
              <chakra.h2
                mb={9}
                fontSize={{ base: '3xl', md: '2.7rem' }}
                fontWeight='bold'
                lineHeight='none'
                color='gray.700'
                _dark={{ color: 'gray.100' }}
                textAlign='center'
              >
                How it Works
                <Icon
                  boxSize={6}
                  ml={1}
                  mb={1}
                  viewBox='0 0 20 20'
                  fill='linkedin.500'
                >
                  <path
                    fillRule='evenodd'
                    d='M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.415l.707-.708zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z'
                    clipRule='evenodd'
                  />
                </Icon>
              </chakra.h2>
            </motion.div>
            <motion.div variants={item}>
              <Box py={12} bg='white' _dark={{ bg: 'gray.700' }} rounded='xl'>
                <Box maxW='7xl' mx='auto' px={{ base: 4, lg: 8 }} pb={4}>
                  <Box textAlign='center'>
                    <chakra.p
                      mt={2}
                      fontSize={{ base: '3xl', sm: '4xl' }}
                      lineHeight='8'
                      fontWeight='extrabold'
                      fontFamily="'Overpass', sans-serif"
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
                      You can finally get to keep track of all your job
                      applications as well as record the status of your
                      applications. You can also add to your google calendar any
                      job application.
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
                        icon={<i className='fa-solid fa-list'></i>}
                      >
                        You can categorize your applications by creating
                        different categories and adding your job applications to
                        any corresponding category. You can also edit or delete
                        your categories.
                      </Feature>

                      <Feature
                        title='Manage application status'
                        icon={
                          <i className='fa-solid fa-temperature-three-quarters'></i>
                        }
                      >
                        You can manage your application status. You can change
                        to Rejected, Assessment, Interview or set it to closed.
                        It is automatically set to close when the end date
                        reaches.
                      </Feature>

                      <Feature
                        title='Robust job filter'
                        icon={
                          <i className='fa-solid fa-arrow-up-wide-short'></i>
                        }
                      >
                        Filter between job applications using the category,
                        status, and the job board or website. The search feature
                        also adds and extra way to narrow down what you are
                        looking for.
                      </Feature>

                      <Feature
                        title='Manage job application'
                        icon={<i className='fa-solid fa-copy'></i>}
                      >
                        You can delete or edit your job applications with easy.
                        You can add notes to your job applications. Job
                        applications with notes display the note count.
                      </Feature>
                    </Stack>
                  </Box>
                </Box>
              </Box>
            </motion.div>
          </motion.div>
        </Flex>
      </Box>
    </Box>
  );
};

export default Index;
