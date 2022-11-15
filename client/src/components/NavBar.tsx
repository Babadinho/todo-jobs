import React, { useContext, useEffect } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, RepeatClockIcon } from '@chakra-ui/icons';
import { UserContext } from '../context/Context';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { userDetails } = useContext(UserContext);

  useEffect(() => {
    localStorage.getItem('track-jobs');
  }, [userDetails]);

  const handleLogout = () => {
    window.localStorage.removeItem('track-jobs');
    window.location.reload();
  };

  return (
    <>
      <Box bg={useColorModeValue('white', 'dark')}>
        <Flex
          h={16}
          px={{ base: '1rem', md: '6rem', lg: '11rem' }}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box
            fontWeight={'bold'}
            fontSize={'1.7rem'}
            color='gray.700'
            _dark={{
              color: 'white',
            }}
          >
            <Link
              href='/'
              className='logo'
              _hover={{
                textDecoration: 'none',
              }}
            >
              <Flex alignItems={'center'}>
                <Box as='span' pb='0.2rem'>
                  <RepeatClockIcon color='linkedin.600' />
                </Box>
                <Text ml='1'>Jobtrack</Text>
              </Flex>
            </Link>
          </Box>

          <Flex align={'center'}>
            <Stack
              direction={'row'}
              spacing={4}
              display='flex'
              alignItems={'center'}
            >
              <Button onClick={toggleColorMode} size='sm'>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              {userDetails && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                    _hover={{
                      textDecoration: 'none',
                    }}
                  >
                    <Avatar
                      size={'md'}
                      name={
                        userDetails &&
                        userDetails.user.firstName +
                          ' ' +
                          userDetails.user.lastName
                      }
                      //   src={
                      //     userDetails &&
                      //     userDetails.user.picture &&
                      //     userDetails.user.picture
                      //   }
                    />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <Center>
                      <Avatar
                        size={'xl'}
                        name={
                          userDetails &&
                          userDetails.user.firstName +
                            ' ' +
                            userDetails.user.lastName
                        }
                        // src={
                        //   userDetails &&
                        //   userDetails.user.picture &&
                        //   userDetails.user.picture
                        // }
                        mb='0.5rem'
                      />
                    </Center>
                    <Center>
                      <p>
                        {userDetails &&
                          userDetails.user.firstName +
                            ' ' +
                            userDetails.user.lastName}
                      </p>
                    </Center>
                    <MenuDivider />
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default NavBar;
