import { Box, chakra, Flex, Link, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Box className='footer' mt='auto'>
      <Flex
        w='full'
        flexDir='row'
        alignItems='center'
        justifyContent='center'
        bg={useColorModeValue('#f7f8fd', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        borderTop={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        h={'65px'}
        px={{ base: 4, md: 20, xl: 40 }}
        fontSize='0.9rem'
      >
        <Flex
          w='full'
          as='footer'
          flexDir={{ base: 'column', md: 'row' }}
          align='center'
          justify='space-between'
          py='4'
          maxW='7xl'
          mx='auto'
        >
          <chakra.p
            py={{ base: '2', sm: '0' }}
            color='gray.800'
            _dark={{ color: 'white' }}
          >
            Todojobs © 2023. All Rights Reserved
          </chakra.p>

          <chakra.p color='gray.800' _dark={{ color: 'white' }}>
            Built by{' '}
            <Link
              href='https://github.com/Babadinho'
              color='linkedin.500'
              fontWeight='400'
              target='_blank'
              _hover={{
                color: 'linkedin.600',
              }}
            >
              Babadinho
            </Link>
          </chakra.p>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;
