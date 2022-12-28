import { Flex } from "@chakra-ui/react";
import SecongTitle from "../titles/SecongTitle";
import React from "react";
const MainCard = (props) => {
  return (
    <Flex
      w={"100%"}
      h={"100%"}
      bg={"brand.gray.extraLight"}
      borderRadius={"8px"}
      boxShadow={"sm"}
      p={4}
      flexDir={"column"}
    >
      {props.children}
    </Flex>
  );
};
export default MainCard;
