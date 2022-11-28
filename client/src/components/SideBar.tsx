import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/react';
import AddCategoryModal from './AddCategoryModal';
import Categories from './Categories';
import Stats from './Stats';
import Search from './Search';
import Status from './Status';
import Jobsites from './Jobsites';
import { JobContext, UserContext } from '../context/Context';
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
  activeSite,
  setActiveSite,
  status,
  setStatus,
  search,
  setSearch,
  searchValue,
  setSearchValue,
  sidebar,
}: any) => {
  const toast = useToast();
  const { userDetails } = useContext(UserContext);
  const { setUserJobs } = useContext(JobContext);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState<Boolean>(false);
  const [loading2, setLoading2] = useState<Boolean>(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState<string>('');
  const [edit, setEdit] = useState<string>('');
  const [editValue, setEditValue] = useState<string>('');

  /* get default category and store in variable. WIll be passed 
  as props to Categories and used to set Default category to not deletable */
  const defaultCategory = category && category.length > 0 && category[0]._id;

  // Function for adding new category
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

  // Function for editing category
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

  // Function for deleting category
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
          setUserJobs(res.data);
          setLoading2(false);
        }, 2000);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Stats />
      <Search
        search={search}
        setSearch={setSearch}
        sidebar={sidebar}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <Status status={status} setStatus={setStatus} />
      <Jobsites activeSite={activeSite} setActiveSite={setActiveSite} />
      <Categories
        loading={loading}
        loading2={loading2}
        error={error}
        setError={setError}
        defaultCategory={defaultCategory}
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
