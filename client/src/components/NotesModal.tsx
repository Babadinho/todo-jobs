import React, { useState, useContext, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  InputRightAddon,
  Spinner,
  Box,
  Text,
  InputGroup,
  List,
  ListItem,
} from '@chakra-ui/react';
import { addNote, deleteNote } from '../middlewares/note';
import { JobContext, UserContext } from '../context/Context';
import moment from 'moment';

const NotesModal = ({ isOpen, onClose, job }: any) => {
  const { userDetails } = useContext(UserContext);
  const { setUserJobs } = useContext(JobContext);
  const [note, setNote] = useState<string>();
  const [noteId, setNoteId] = useState<string>();
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<Boolean>(false);
  const [loading2, setLoading2] = useState<Boolean>(false);

  const handleAddNote = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const res = await addNote(
        userDetails.user._id,
        { jobId: job._id, note: note },
        userDetails.token
      );
      setError('');
      if (res.data) {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
          setUserJobs(res.data);
          setNote('');
        }, 2000);
      }
    } catch (error: any) {
      if (error.response.status === 400) setError(error.response.data);
      setLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: any) => {
    setNoteId(noteId);
    try {
      const res = await deleteNote(
        userDetails.user._id,
        { jobId: job._id, noteId: noteId },
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

  useEffect(() => {}, [setUserJobs]);

  return (
    <>
      <Modal onClose={onClose} size='md' isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='1.1rem' fontWeight='500'>
            {job.title.substring(0, 30)}...
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text color='red.500' pb='0.1rem' textAlign='center'>
              {error && error}
            </Text>
            <Box as='form' onSubmit={handleAddNote}>
              <InputGroup size='sm'>
                <Input
                  type='tel'
                  placeholder='Enter note'
                  focusBorderColor='brand.400'
                  rounded='md'
                  value={note}
                  onChange={(e) => {
                    setNote(e.target.value);
                    setError('');
                    setLoading(false);
                  }}
                />
                <InputRightAddon
                  bg='gray.50'
                  _dark={{
                    bg: 'gray.600',
                    color: 'white',
                  }}
                  _hover={{
                    bg: 'gray.100',
                  }}
                  color='gray.600'
                  rounded='md'
                  cursor='pointer'
                  onClick={handleAddNote}
                >
                  {loading ? (
                    <Spinner size='xs' />
                  ) : (
                    <Box as='span'>Add note</Box>
                  )}
                </InputRightAddon>
              </InputGroup>
            </Box>
            <List
              spacing={3}
              mt='1.5rem'
              minH='1.5rem'
              maxH='25rem'
              overflow='auto'
            >
              {job.notes &&
                job.notes.map((note: any, i: any) => (
                  <ListItem mb='1rem' fontSize='0.87rem' key={i}>
                    <Box
                      bg='gray.50'
                      p={2}
                      _dark={{ bg: 'gray.600' }}
                      display='flex'
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      <Box>
                        <Box
                          mr='0.4rem'
                          color='gray.500'
                          fontSize='0.8rem'
                          _dark={{ color: 'gray.400' }}
                        >
                          {moment(note.createdAt).fromNow()}:
                        </Box>
                        <Box>{note.note}</Box>
                      </Box>
                      <Box
                        mr='0.4rem'
                        color='gray.500'
                        fontSize='0.8rem'
                        _hover={{ color: 'gray.600' }}
                        _dark={{ color: 'gray.400' }}
                        onClick={() => handleDeleteNote(note._id)}
                        cursor='pointer'
                      >
                        {loading2 && note._id === noteId ? (
                          <Spinner size='xs' />
                        ) : (
                          <i className='fa-solid fa-trash'></i>
                        )}
                      </Box>
                    </Box>
                  </ListItem>
                ))}
            </List>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NotesModal;
