import { Badge, Box, Button, Flex } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { colors, colors_hover } from '../utils/globalVars';
import { UserContext } from '../context/Context';

const Status = ({ loadJobs }: any) => {
  const { userDetails } = useContext(UserContext);
  const [active, setActive] = useState<string>('');

  const handleLoadActive = async (color: any) => {
    setActive(color);
    try {
      await loadJobs(
        userDetails.user._id,
        { status: color === 'all jobs' ? '' : color },
        userDetails.token
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        w='full'
        py={3}
        pt='1.5rem'
        bg='white'
        _dark={{
          bg: 'gray.700',
        }}
        mb='1.5rem'
        px={{ base: 4, md: 3, xl: 4 }}
        shadow='sm'
        rounded='md'
        className='sidebarCard'
      >
        <Flex wrap='wrap'>
          {Object.keys(colors).map((color: any) => {
            return (
              <Button
                onClick={() => handleLoadActive(color)}
                rounded={active === color ? '0.4rem' : '0.3rem'}
                mr='0.7rem'
                mb='0.7rem'
                fontSize='xs'
                fontWeight='400'
                bg={active === color ? colors_hover[color] : colors[color]}
                color='gray.50'
                _hover={{
                  bg: colors_hover[color],
                  color: 'gray.50',
                }}
                _dark={{
                  bg: active === color ? colors_hover[color] : colors[color],
                  color: 'gray.50',
                  _hover: {
                    bg: colors_hover[color],
                    color: 'gray.50',
                  },
                }}
                size='xs'
                textTransform='capitalize'
              >
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
