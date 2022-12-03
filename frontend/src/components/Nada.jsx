import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const Nada = () => {
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Box
        w="300px"
        borderWidth="1px"
        borderRight="lg"
        overflow="hidden"
        bg="white"
        m={5}
      >
        <Box p="6" display="flex" flexDirection="column">
          <Text> No hay nada aqui! </Text>
        </Box>
      </Box>
    </motion.div>
  );
};

export default Nada;
