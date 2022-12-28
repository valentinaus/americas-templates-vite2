import { Flex } from "@chakra-ui/react";
import MainCard from "../UI/containers/MainCard";
import HeadingTitle from "../UI/titles/HeadingTitle";
import SecongTitle from "../UI/titles/SecongTitle";

const Templates = () => {
  return (
    <Flex w={"100%"} flexDir={"column"}>
      <HeadingTitle title="Templates" />
      <MainCard>
        <SecongTitle title={"Templates List"} />
      </MainCard>
    </Flex>
  );
};
export default Templates;
