import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Flex,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

const FormTodo = () => {
  const queryClient = useQueryClient();
  const [todo, setTodo] = useState('');
  const toast = useToast();

  const mutation = useMutation(
    async (newTodo) => {
      await new Promise((resolve) => setTimeout(resolve, 400));

      return fetch('http://localhost:5000/api/v1/todo', {
        method: 'POST',
        headers: {
          'api-key':
            'pfiYJ1gVUhVSj6nNKd5Fzmgg2WrrNmkiazuDpnDXK4sRdEDaKNI4OEi2sJC8XjXb',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      });
    },
    {
      onSuccess: () => {
        toast({
          title: 'To-Do creado',
          status: 'success',
          isClosable: true,
          position: 'top',
        });
        queryClient.invalidateQueries('todo');
        setTodo('');
      },
      onError: () => {
        toast({
          title: 'error al  crear To-Do ',
          status: 'error',
          isClosable: true,
          position: 'top',
        });
        queryClient.invalidateQueries('todo');
        setTodo('');
      },
    }
  );

  console.log(todo);
  return (
    <Box
      w="600px"
      borderWidth="1px"
      borderRight="lg"
      overflow="hidden"
      bg="white"
      boxShadow="base"
      p="6"
      rounded="md"
      m={5}
    >
      <Flex alignItems="center" justifyContent="center" p="10">
        <FormControl id="todo" w="80%">
          <FormLabel>Crear Todo</FormLabel>
          <Input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <Button
            mt="10"
            bg="#7928CA"
            _hover={{
              bg: '#9e47f5',
              fontWeight: '700',
            }}
            color="white"
            fontWeight="600"
            onClick={() => mutation.mutate({ description: todo })}
          >
            {mutation.isLoading ? 'wait...' : 'Crear Todo'}
          </Button>
        </FormControl>
      </Flex>
    </Box>
  );
};

export default FormTodo;
