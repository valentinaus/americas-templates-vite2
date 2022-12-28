import React from "react";
import { Flex, Heading } from "@chakra-ui/react";

const SecongTitle = ({ title }) => {
  return (
    <Flex alignItems={"center"}>
      <Heading
        as={"h2"}
        color="brand.gray.medium"
        fontWeight="semibold"
        fontSize={"md"}
        textTransform={"capitalize"}
      >
        {title}
      </Heading>
    </Flex>
  );
};
export default SecongTitle;
