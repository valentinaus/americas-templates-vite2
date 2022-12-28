import { Button, Flex, Heading } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Flex color={"black"}>
      <Heading>{user ? user.fullName : " nadie, no funciono"}</Heading>
      <Button colorScheme={"blue"}>hopla</Button>
    </Flex>
  );
};
export default Home;
