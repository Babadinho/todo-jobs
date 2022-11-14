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
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon, RepeatClockIcon } from '@chakra-ui/icons';
import { isAuthenticated } from '../actions/auth';
import { UserContext } from '../context/Context';

const NavBar = () => {
  const { user, token } = isAuthenticated();
  const { colorMode, toggleColorMode } = useColorMode();
  const { userDetails } = useContext(UserContext);

  useEffect(() => {
    localStorage.getItem('track-jobs');
  }, [userDetails]);

  return (
    <>
      <Box bg={useColorModeValue('white', 'dark')} px={4}>
        <Flex
          h={16}
          px={{ base: 4, md: 20, xl: 40 }}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Box
            fontFamily={'heading'}
            fontWeight={'bold'}
            fontSize={'1.7rem'}
            color='linkedin.500'
          >
            <Link href='/' className='logo'>
              <Flex alignItems={'center'}>
                <Box as='span' pb='0.2rem'>
                  <RepeatClockIcon />
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

              {user && token && (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}
                  >
                    <Avatar
                      size={'md'}
                      name={user && user.firstName + ' ' + user.lastName}
                      src={user && user.picture}
                    />
                  </MenuButton>
                  <MenuList alignItems={'center'}>
                    <Center>
                      <Avatar
                        size={'xl'}
                        name={user && user.firstName + ' ' + user.lastName}
                        src={user && user.picture}
                        mb='0.5rem'
                      />
                    </Center>
                    <Center>
                      <p>{user && user.firstName + ' ' + user.lastName}</p>
                    </Center>
                    <MenuDivider />
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem>Logout</MenuItem>
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
