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
  Badge,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const Categories = ({
  loading,
  loading2,
  error,
  setError,
  defaultCategory,
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
  const deleteCategory = useDisclosure();
  const cancelRef = React.useRef();
  const [categoryToDelete, setCategoryToDelete] = useState<string>('');

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
        <Flex justifyContent='space-between' alignItems='center' mb='0.6rem'>
          <chakra.span
            fontSize='md'
            fontWeight='bold'
            fontFamily="'Overpass', sans-serif"
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
              bg='linkedin.500'
              color='gray.100'
              _hover={{ bg: 'linkedin.600' }}
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
                        setActiveCat(activeCat === c._id ? '' : c._id);
                        // sidebar.onClose();
                        activeCat !== c._id && setEdit('');
                      }}
                      cursor='pointer'
                      display='flex'
                      alignItems='center'
                      className='category'
                      color={activeCat === c._id ? 'gray.700' : 'gray.600'}
                      _dark={{
                        color: activeCat === c._id ? 'gray.50' : 'gray.300',
                      }}
                      _hover={{
                        color: 'gray.700',
                        _dark: { color: 'gray.50' },
                      }}
                    >
                      <Box fontSize='0.6rem' mr='0.4rem'>
                        {activeCat === c._id ? (
                          <i className='fa-solid fa-square-check'></i>
                        ) : (
                          <i className='fa-solid fa-stop'></i>
                        )}
                      </Box>
                      {edit && activeCat === c._id ? (
                        <Box as='form' onSubmit={handleCategoryEdit}>
                          <Input
                            borderColor={error && 'red.400'}
                            value={editValue}
                            size='xs'
                            textTransform='capitalize'
                            color='gray.700'
                            _dark={{
                              color: 'gray.200',
                            }}
                            width='90%'
                            autoFocus
                            isRequired
                            onChange={(e) => {
                              setEditValue(e.target.value);
                              setError('');
                            }}
                          />
                        </Box>
                      ) : (
                        <Box fontSize='0.94rem' mr='0.3rem'>
                          {c.name}
                        </Box>
                      )}
                    </Box>
                    <Badge
                      colorScheme='linkedin'
                      fontWeight='400'
                      fontSize='0.65rem'
                      rounded='50%'
                    >
                      {c.jobCount}
                    </Badge>
                  </Box>

                  <Stack
                    direction={'row'}
                    align='center'
                    cursor={'pointer'}
                    display={activeCat === c._id ? 'flex' : 'none'}
                  >
                    <Text fontSize='0.7rem' display='flex' alignItems='center'>
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
                          color='gray.600'
                          _dark={{ color: 'gray.300' }}
                          _hover={{
                            color: 'gray.700',
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
                      display={c._id === defaultCategory ? 'none' : 'flex'}
                      color='red.400'
                      _hover={{ color: 'red.500' }}
                      onClick={() => {
                        setCategoryToDelete(c._id);
                        deleteCategory.onOpen();
                      }}
                      alignItems='center'
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

      {/* delete category alert dialog */}

      <AlertDialog
        isOpen={deleteCategory.isOpen}
        leastDestructiveRef={cancelRef}
        onClose={deleteCategory.onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Category
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will also delete jobs in this category.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={deleteCategory.onClose}>
                Cancel
              </Button>
              <Button
                colorScheme='red'
                onClick={() => {
                  handleCategoryDelete(categoryToDelete);
                  deleteCategory.onClose();
                }}
                ml={3}
              >
                Continue
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Categories;
