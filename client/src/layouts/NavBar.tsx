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
  Portal,
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
      <Box
        bg={useColorModeValue('white', 'gray.700')}
        shadow='sm'
        px={{ base: '1rem', md: '5rem', xl: '12rem' }}
      >
        <Flex
          h={'3.8rem'}
          alignItems={'center'}
          justifyContent={'space-between'}
          maxW='7xl'
          mx='auto'
        >
          <Box
            fontWeight='bold'
            fontSize={'1.6rem'}
            color='gray.700'
            _dark={{
              color: 'gray.50',
            }}
          >
            <Link
              href='/'
              className='logo selectable'
              _hover={{
                textDecoration: 'none',
              }}
            >
              <Flex alignItems={'center'}>
                <Box as='span' pb='0.1rem' fontSize='1.3rem'>
                  <i className='fa-regular fa-calendar-check'></i>
                </Box>
                <Text ml='0.14rem'>Todojobs</Text>
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
                      src={userDetails && userDetails.user.picture}
                    />
                  </MenuButton>
                  <Portal>
                    <MenuList alignItems={'center'} fontSize='0.95rem'>
                      {/* <Center>
                        <Avatar
                          size={'xl'}
                          name={
                            userDetails &&
                            userDetails.user.firstName +
                              ' ' +
                              userDetails.user.lastName
                          }
                          src={userDetails && userDetails.user.picture}
                          mb='0.5rem'
                        />
                      </Center> */}
                      {/* <Center>
                        <Box>
                          {userDetails &&
                            userDetails.user.firstName +
                              ' ' +
                              userDetails.user.lastName}
                        </Box>
                      </Center>
                      <MenuDivider /> */}
                      <MenuItem>
                        <i className='fa-solid fa-user-gear'></i>&nbsp; Account
                        Settings
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>
                        <i className='fa-solid fa-right-from-bracket'></i>&nbsp;
                        Logout
                      </MenuItem>
                    </MenuList>
                  </Portal>
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
