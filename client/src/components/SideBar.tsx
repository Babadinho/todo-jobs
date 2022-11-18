import React, { useContext, useState } from 'react';
import {
  Flex,
  chakra,
  useDisclosure,
  useToast,
  Box,
  Badge,
} from '@chakra-ui/react';
import AddCategoryModal from './AddCategoryModal';
import Categories from './Categories';
import { UserContext } from '../context/Context';
import {
  addCategory,
  deleteCategory,
  editCategory,
} from '../middlewares/category';

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

  const handleAddCategory = async () => {
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
            title: `'${value}' added to your Categories`,
            status: 'success',
            duration: 4000,
            isClosable: true,
            position: 'top',
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
    setError('');
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
          setEdit('');
          setLoading(false);
        }, 2000);
      }
    } catch (error: any) {
      setError(error.response.data);
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
        mb='1.5rem'
        px={{ base: 4, md: 3, xl: 4 }}
        shadow='sm'
        rounded='md'
        className='sidebarCard'
      >
        <Box
          fontSize='md'
          fontWeight='bold'
          color='gray.700'
          _dark={{
            color: 'gray.50',
          }}
          mb='0.7rem'
        >
          <i className='fa-solid fa-chart-pie'></i> Stats
        </Box>
        <Flex justifyContent='space-between' alignItems='center' mb='0.3rem'>
          <chakra.span
            fontSize='0.94rem'
            color='gray.600'
            _dark={{
              color: 'white',
            }}
          >
            <Flex align='center'>
              <Box
                fontSize='0.7rem'
                mr='0.4rem'
                color='gray.600'
                _dark={{ color: 'gray.300' }}
              >
                <i className='fa-solid fa-chart-simple'></i>
              </Box>{' '}
              <Box color='gray.600' _dark={{ color: 'gray.300' }}>
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
            fontSize='0.94rem'
            color='gray.600'
            _dark={{
              color: 'white',
            }}
          >
            <Flex align='center'>
              <Box
                fontSize='0.7rem'
                mr='0.4rem'
                color='gray.600'
                _dark={{ color: 'gray.300' }}
              >
                <i className='fa-solid fa-chart-column'></i>
              </Box>{' '}
              <Box color='gray.600' _dark={{ color: 'gray.300' }}>
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
            <Badge rounded='lg' fontSize='xs' colorScheme='linkedin'>
              150
            </Badge>
          </chakra.span>
        </Flex>
      </Box>
      <Categories
        loading={loading}
        loading2={loading2}
        error={error}
        setError={setError}
        defaultActive={defaultActive}
        edit={edit}
        onOpen={onOpen}
        category={category}
        setEditValue={setEditValue}
        editValue={editValue}
        handleCategoryEdit={handleCategoryEdit}
        setEdit={setEdit}
        activeCat={activeCat}
        setActiveCat={setActiveCat}
        handleCategoryDelete={handleCategoryDelete}
      />
      <AddCategoryModal
        value={value}
        setValue={setValue}
        loading={loading}
        handleSubmit={handleAddCategory}
        isOpen={isOpen}
        onClose={onClose}
        error={error}
        setError={setError}
      />
    </>
  );
};

export default SideBar;
