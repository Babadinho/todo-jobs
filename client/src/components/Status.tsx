import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { colors, colors_hover } from '../utils/globalVars';

const Status = ({ status, setStatus }: any) => {
  // const handleSetActive = async (color: string) => {
  //   setStatus(status === color ? '' : color);
  // };

  return (
    <>
      <Box
        w='full'
        py={3}
        // pt='1.5rem'
        bg='white'
        _dark={{
          bg: 'gray.700',
        }}
        mb='0.9rem'
        px={{ base: 4, md: 3, xl: 4 }}
        shadow='sm'
        rounded='md'
        className='sidebarCard'
      >
        <Box
          fontSize='md'
          fontWeight='bold'
          fontFamily="'Overpass', sans-serif"
          color='gray.700'
          _dark={{
            color: 'gray.50',
          }}
          mb='1rem'
        >
          <i className='fa-solid fa-temperature-three-quarters'></i> Status
        </Box>
        <Flex wrap='wrap'>
          {Object.keys(colors).map((color: string, i: any) => {
            return (
              <Button
                key={i}
                onClick={() => setStatus(status === color ? '' : color)}
                rounded='0.3rem'
                mr='0.7rem'
                mb='0.7rem'
                fontSize='0.8rem'
                fontWeight='400'
                borderColor={colors[color]}
                bg={colors[color]}
                color={'gray.50'}
                _focus={{
                  outline: 0,
                  boxShadow: 0,
                }}
                _hover={{
                  bg: colors_hover[color],
                  color: 'gray.50',
                }}
                size='xs'
                textTransform='capitalize'
              >
                {status === color && (
                  <Box fontSize='0.7rem' mr='0.15rem'>
                    <i className='fa-regular fa-circle-check'></i>
                  </Box>
                )}
                {color}
              </Button>
            );
          })}
        </Flex>
      </Box>
    </>
  );
};

export default Status;
