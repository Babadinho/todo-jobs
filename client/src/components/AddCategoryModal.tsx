import React, { useRef } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Input,
  Text,
  FormControl,
  Spinner,
} from '@chakra-ui/react';

const AddCategoryModal = ({
  value,
  setValue,
  loading,
  handleSubmit,
  isOpen,
  onClose,
  error,
  setError,
}: any) => {
  return (
    <>
      <Modal onClose={onClose} size={'md'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='1.1rem' fontWeight='500'>
            Add Category
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={4} color='gray.600'>
              <FormControl>
                <Input
                  size='sm'
                  autoFocus
                  borderColor={error ? 'red' : '#e2e8f0'}
                  _focus={{
                    outline: 'none',
                  }}
                  placeholder='Enter category name'
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setError('');
                  }}
                  focusBorderColor='brand.400'
                  rounded='md'
                />
                <Text color='red.500' pt='0.3rem'>
                  {error && error}
                </Text>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button
              mr='0.7rem'
              size='sm'
              fontWeight='500'
              variant='ghost'
              onClick={() => {
                onClose();
                setValue('');
              }}
            >
              Cancel
            </Button>
            <Button
              size='sm'
              loadingText='Submitting'
              fontWeight='500'
              colorScheme='linkedin'
              onClick={handleSubmit}
            >
              {loading ? <Spinner thickness='4px' size='md' /> : 'Submit'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
