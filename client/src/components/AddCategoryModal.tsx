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
  Box,
  Flex,
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
      <Modal onClose={onClose} size={'sm'} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='1.1rem' fontWeight='500' mb='0.1rem'>
            Add Category
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody mb='1rem'>
            <Stack color='gray.600'>
              <FormControl>
                <Input
                  _dark={{
                    color: 'gray.50',
                    _placeholder: { color: 'gray.200' },
                  }}
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
            <Flex justify='flex-end' mt='0.9rem'>
              <Box>
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
                  minW='4.334rem'
                  size='sm'
                  fontWeight='500'
                  bg='linkedin.500'
                  color='gray.100'
                  _hover={{ bg: 'linkedin.600' }}
                  onClick={handleSubmit}
                >
                  {loading ? <Spinner thickness='4px' size='md' /> : 'Submit'}
                </Button>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddCategoryModal;
