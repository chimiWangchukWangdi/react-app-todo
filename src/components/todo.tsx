import { Heading, Box, Text, Flex, Button } from "@chakra-ui/react";
const Todo = () => {
  return (
    <Flex justifyContent={'space-between'}>
      <Box>
        <Heading size="xs" textTransform="uppercase">
          Summary
        </Heading>
        <Text pt="2" fontSize="sm">
          View a summary of all your clients over the last month.
        </Text>
      </Box>
      <Box>
        <Button margin={3} colorScheme='green'> Edit </Button>
        <Button m={3} colorScheme='red'> Delete </Button>
      </Box>
    </Flex>
  );
};

export default Todo;
