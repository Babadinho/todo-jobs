import { AddIcon } from '@chakra-ui/icons';
import {
  Flex,
  chakra,
  Stack,
  Spinner,
  Button,
  Input,
  Box,
  Text,
} from '@chakra-ui/react';
import React from 'react';

const Categories = ({
  loading,
  loading2,
  defaultActive,
  edit,
  onOpen,
  category,
  setEditValue,
  editValue,
  handleCategoryEdit,
  setEdit,
  activeCat,
  setActiveCat,
  handleCategoryDelete,
}: any) => {
  return (
    <>
      <Box
        w='full'
        py={3}
        bg='white'
        _dark={{
          bg: 'gray.700',
        }}
        mb='3rem'
        px={{ base: 4, md: 3, xl: 4 }}
        shadow='sm'
        rounded='md'
        className='sidebarCard'
      >
        <Flex justifyContent='space-between' alignItems='center' mb='0.8rem'>
          <chakra.span
            fontSize='md'
            fontWeight='bold'
            color='gray.700'
            _dark={{
              color: 'gray.50',
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
                mb='0.25rem'
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
                        _dark={{ color: 'gray.300' }}
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
                          color={activeCat === c._id ? 'gray.900' : 'gray.600'}
                          _dark={{
                            color: activeCat === c._id ? 'gray.50' : 'gray.300',
                          }}
                          _hover={{
                            color: 'gray.900',
                          }}
                          fontSize='0.94rem'
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
                    <Text fontSize='0.7rem'>
                      {edit ? (
                        <Box
                          as='span'
                          onClick={handleCategoryEdit}
                          fontSize='0.85rem'
                          color='gray.600'
                          _dark={{ color: 'gray.300' }}
                          _hover={{
                            color: 'gray.900',
                            _dark: {
                              color: 'gray.100',
                            },
                          }}
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
                          _dark={{ color: 'gray.300' }}
                          _hover={{
                            color: 'gray.600',
                            _dark: {
                              color: 'gray.100',
                            },
                          }}
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
                      fontSize='0.7rem'
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
    </>
  );
};

export default Categories;
