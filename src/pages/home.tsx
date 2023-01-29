import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  StackDivider,
  Stack,
  Box,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Todo from "../components/todo";
import * as actions from "../state/action";
import { todoActions } from "../state/slice";
import { useAppDispatch } from "../state/store";

const Home = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(todoActions.fetchTodoList());
  }, []);
  return (
    <Card>
      <CardHeader>
        <Heading size="md">Todo Listing</Heading>
      </CardHeader>

      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          {/* <Todo/>
          <Todo/>
          <Todo/> */}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default Home;