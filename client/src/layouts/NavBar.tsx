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
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { UserContext } from '../context/Context';

const NavBar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { userDetails, setUserDetails } = useContext(UserContext);

  useEffect(() => {
    localStorage.getItem('todo-jobs');
  }, [setUserDetails]);

  const handleLogout = () => {
    window.localStorage.removeItem('todo-jobs');
    window.location.reload();
  };

  return (
    <>
      <Box bg={useColorModeValue('white', 'gray.700')}>
        <Flex
          h={16}
          px={{ base: '1rem', md: '5rem', xl: '12rem' }}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box
            fontWeight={'bold'}
            fontSize={'1.7rem'}
            color='gray.700'
            _dark={{
              color: 'gray.50',
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
                {/* <Box as='span' pb='0.2rem'>
                  <i className='fa-solid fa-stopwatch'></i>
                </Box> */}
                <Text ml='0.12rem'>Todojobs</Text>
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
                        mb='0.5rem'
                      />
                    </Center>
                    <Center>
                      <Box>
                        {userDetails &&
                          userDetails.user.firstName +
                            ' ' +
                            userDetails.user.lastName}
                      </Box>
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
