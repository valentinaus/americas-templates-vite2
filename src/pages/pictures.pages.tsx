import { Divider, Flex, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import HeadingTitle from "../UI/titles/HeadingTitle";
const Pictures = () => {
  return (
    <Fragment>
      <Flex w={"100%"} flexDir={"column"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex flexDir={"column"}>
            <HeadingTitle title="Pictures" />
            <Text fontSize={"sm"} color={"brand.gray.dark"}>
              Manage your pictures here.
            </Text>
          </Flex>
        </Flex>
        <Divider my={4} />
      </Flex>
    </Fragment>
  );
};
export default Pictures;
