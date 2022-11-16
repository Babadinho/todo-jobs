import React, { useContext, useState } from 'react';
import {
  Flex,
  chakra,
  Button,
  useDisclosure,
  useToast,
  Box,
  Badge,
  Text,
  Stack,
  Input,
  Spinner,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import AddCategoryModal from './AddCategoryModal';
import { UserContext } from '../context/Context';
import { addCategory, deleteCategory, editCategory } from '../actions/category';

export const SideBar = ({
  category,
  setCategory,
  activeCat,
  setActiveCat,
  sidebar,
}: any) => {
  const toast = useToast();
  const { userDetails } = useContext(UserContext);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState<Boolean>(false);
  const [loading2, setLoading2] = useState<Boolean>(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState<string>('');
  const [edit, setEdit] = useState<string>('');
  const [editValue, setEditValue] = useState<string>('');

  //get default list and store in variable
  const defaultActive = category && category.length > 0 && category[0]._id;

  const handleSubmit = async () => {
    try {
      const res = await addCategory(
        userDetails.user._id,
        { name: value },
        userDetails.token
      );
      if (res.data) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          onClose();
          setCategory(res.data);
          toast({
            title: value + ' added to your list',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
          setValue('');
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.status === 400) setError(error.response.data);
      setLoading(false);
    }
  };

  const handleCategoryEdit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const res = await editCategory(
        userDetails.user._id,
        { categoryId: edit, name: editValue },
        userDetails.token
      );
      setLoading(true);

      if (res.data) {
        setTimeout(() => {
          setCategory(res.data);
          toast({
            title: 'Category edited successfully',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
          setEdit('');
          setLoading(false);
        }, 2000);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleCategoryDelete = async (categoryId: any) => {
    try {
      const res = await deleteCategory(
        userDetails.user._id,
        { categoryId: categoryId },
        userDetails.token
      );
      setLoading2(true);
      if (res.data) {
        setTimeout(() => {
          setCategory(res.data);
          toast({
            title: 'Category deleted successfully',
            status: 'success',
            duration: 4000,
            isClosable: true,
          });
          setLoading2(false);
        }, 2000);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Box
        w='full'
        py={3}
        bg='white'
        _dark={{
          bg: 'gray.700',
        }}
        mb='2.5rem'
        px={{ base: 4, md: 3, xl: 4 }}
        shadow='md'
        rounded='md'
        className='sidebarCard'
      >
        <Box
          fontSize='md'
          fontWeight='bold'
          color='gray.600'
          _dark={{
            color: 'white',
          }}
          mb='0.7rem'
        >
          <i className='fa-solid fa-chart-pie'></i> Stats
        </Box>
        <Flex justifyContent='space-between' alignItems='center' mb='0.3rem'>
          <chakra.span
            fontSize={{ sm: 'md', md: '0.9rem', xl: 'md' }}
            color='gray.600'
            _dark={{
              color: 'white',
            }}
          >
            <Flex align='center'>
              <Box
                fontSize='0.65rem'
                mr='0.4rem'
                color='gray.600'
                _dark={{ color: 'white' }}
              >
                <i className='fa-solid fa-chart-simple'></i>
              </Box>{' '}
              <Box color='gray.600' _dark={{ color: 'white' }}>
                This month
              </Box>
            </Flex>
          </chakra.span>
          <chakra.span
            color='brand.800'
            _dark={{
              color: 'brand.900',
            }}
          >
            <Badge rounded='lg' fontSize='xs' colorScheme='linkedin'>
              15
            </Badge>
          </chakra.span>
        </Flex>
        <Flex justifyContent='space-between' alignItems='center' mb='0.3rem'>
          <chakra.span
            fontSize={{ sm: 'md', md: '0.9rem', xl: 'md' }}
            color='gray.600'
            _dark={{
              color: 'white',
            }}
          >
            <Flex align='center'>
              <Box
                fontSize='0.65rem'
                mr='0.4rem'
                color='gray.600'
                _dark={{ color: 'white' }}
              >
                <i className='fa-solid fa-chart-column'></i>
              </Box>{' '}
              <Box color='gray.600' _dark={{ color: 'white' }}>
                Last month
              </Box>
            </Flex>
          </chakra.span>
          <chakra.span
            color='brand.800'
            _dark={{
              color: 'brand.900',
            }}
          >
            <Badge rounded='lg' colorScheme='linkedin'>
              150
            </Badge>
          </chakra.span>
        </Flex>
      </Box>
      <Box
        w='full'
        py={3}
        bg='white'
        _dark={{
          bg: 'gray.700',
        }}
        mb='3rem'
        px={{ base: 4, md: 3, xl: 4 }}
        shadow='md'
        rounded='md'
        className='sidebarCard'
      >
        <Flex justifyContent='space-between' alignItems='center' mb='0.8rem'>
          <chakra.span
            fontSize='md'
            fontWeight='bold'
            color='gray.600'
            _dark={{
              color: 'white',
            }}
          >
            <i className='fa-solid fa-table-list'></i> Categories
          </chakra.span>
          <chakra.span
            color='brand.800'
            _dark={{
              color: 'brand.900',
            }}
            rounded='full'
            textTransform='uppercase'
            fontSize='xs'
          >
            <Button
              size='xs'
              colorScheme='linkedin'
              variant='solid'
              fontWeight='400'
              onClick={() => onOpen()}
            >
              <AddIcon fontSize='0.7rem' />
            </Button>
          </chakra.span>
        </Flex>

        <Flex flexDir='column'>
          {category &&
            category.length > 0 &&
            category.map((c: any, i: any) => (
              <Box
                key={i}
                fontSize={{ sm: 'md', md: '0.9rem', xl: 'md' }}
                textTransform='capitalize'
                mb='0.2rem'
              >
                <Box
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <Box display='flex' alignItems='center'>
                    <Box
                      onClick={() => {
                        setActiveCat(c._id);
                        // sidebar.onClose();
                        activeCat !== c._id && setEdit('');
                      }}
                      cursor='pointer'
                      display='flex'
                      alignItems='center'
                    >
                      <Box
                        fontSize='0.65rem'
                        mr='0.4rem'
                        color='gray.600'
                        _dark={{ color: 'white' }}
                      >
                        <i className='fa-solid fa-stop'></i>
                      </Box>
                      {edit && activeCat === c._id ? (
                        <Box as='form' onSubmit={handleCategoryEdit}>
                          <Input
                            value={editValue}
                            size='xs'
                            textTransform='capitalize'
                            color='gray.700'
                            width='90%'
                            autoFocus
                            isRequired
                            onChange={(e) => setEditValue(e.target.value)}
                          />
                        </Box>
                      ) : (
                        <Box
                          className='category'
                          color={activeCat === c._id ? 'gray.500' : 'gray.600'}
                          _dark={{
                            color: activeCat === c._id ? 'gray.500' : 'white',
                          }}
                          _hover={{
                            color: 'gray.500',
                          }}
                        >
                          {c.name}
                        </Box>
                      )}
                    </Box>
                  </Box>

                  <Stack
                    direction={'row'}
                    align='center'
                    cursor={'pointer'}
                    display={activeCat === c._id ? 'flex' : 'none'}
                  >
                    <Text fontSize='0.8rem'>
                      {edit ? (
                        <Box
                          as='span'
                          onClick={handleCategoryEdit}
                          fontSize='1rem'
                        >
                          {loading ? (
                            <Spinner size='xs' />
                          ) : (
                            <i className='fa-solid fa-check'></i>
                          )}
                        </Box>
                      ) : (
                        <Box
                          as='span'
                          onClick={() => {
                            setEdit(c._id);
                            setEditValue(c.name);
                          }}
                          color='gray.500'
                          _hover={{ color: 'gray.600' }}
                        >
                          {loading ? (
                            <Spinner size='xs' />
                          ) : (
                            <i className='fa-solid fa-pen-to-square'></i>
                          )}
                        </Box>
                      )}{' '}
                    </Text>
                    <Text
                      fontSize='0.8rem'
                      display={c._id === defaultActive ? 'none' : 'block'}
                      color='red.300'
                      _hover={{ color: 'red.400' }}
                      onClick={() => handleCategoryDelete(c._id)}
                    >
                      {loading2 ? (
                        <Spinner size='xs' />
                      ) : (
                        <i className='fa-solid fa-trash-can'></i>
                      )}
                    </Text>
                  </Stack>
                </Box>
              </Box>
            ))}
        </Flex>
      </Box>
      <AddCategoryModal
        value={value}
        setValue={setValue}
        loading={loading}
        handleSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
        error={error}
        setError={setError}
      />
    </>
  );
};

export default SideBar;
