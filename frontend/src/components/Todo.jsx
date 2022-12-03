import { Box, Button, Text, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const Todo = ({ todo }) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation(
    (id) =>
      fetch(`http://localhost:5000/api/v1/todo/${id}`, {
        method: 'DELETE',
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todo');
      },
    }
  );
  const updateMutation = useMutation(
    (updateTodo) =>
      fetch('http://localhost:5000/api/v1/todo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateTodo),
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('todo');
      },
    }
  );
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Box
        w="400px"
        borderWidth="1px"
        borderRight="lg"
        overflow="hidden"
        bg="white"
        m={5}
      >
        <Box
          p="6"
          display="flex"
          flexDirection="column"
          bg={todo.isComplete ? 'lightgreen' : 'White'}
        >
          <Text> {todo.description} </Text>
          <Flex justifyContent="space-between">
            <Button
              w="150px"
              mt="10"
              bg="#7d05f6"
              _hover={{
                bg: '#9e47f5',
                fontWeight: '700',
              }}
              color="white"
              fontWeight="600"
              onClick={() =>
                updateMutation.mutate({
                  id: todo._id,
                  isComplete: !todo.isComplete,
                })
              }
            >
              {todo.isComplete ? 'Tarea completada' : 'Por hacer'}
            </Button>
            <Button
              w="150px"
              mt="10"
              colorScheme="red"
              _hover={{
                bg: 'red.200',
                fontWeight: '700',
              }}
              color="white"
              fontWeight="600"
              onClick={() => deleteMutation.mutate(todo._id)}
            >
              Delete
            </Button>
          </Flex>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Todo;
