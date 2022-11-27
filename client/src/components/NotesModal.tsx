import React, { useState, useContext } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  InputRightAddon,
  Spinner,
  Box,
  Text,
  InputGroup,
  List,
  ListItem,
} from '@chakra-ui/react';
import moment from 'moment';

const NotesModal = ({
  isOpen,
  onClose,
  job,
  loading,
  setLoading,
  loading2,
  error,
  note,
  setNote,
  setError,
  handleAddNote,
  handleDeleteNote,
}: any) => {
  const [noteId, setNoteId] = useState<string>('');

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
            <Box
              as='form'
              onSubmit={(e: { preventDefault: () => void }) => {
                e.preventDefault();
                handleAddNote(job);
              }}
            >
              <InputGroup size='sm'>
                <Input
                  type='text'
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
                  onClick={() => handleAddNote(job._id)}
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
                        onClick={() => {
                          setNoteId(note._id);
                          handleDeleteNote(note, job);
                        }}
                        cursor='pointer'
                      >
                        {loading2 && noteId === note._id ? (
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
