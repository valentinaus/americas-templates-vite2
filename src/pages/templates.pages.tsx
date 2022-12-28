import { Divider, Flex, Text } from "@chakra-ui/react";
import React, { Fragment } from "react";
import MainCard from "../UI/containers/MainCard";
import HeadingTitle from "../UI/titles/HeadingTitle";
import SecongTitle from "../UI/titles/SecongTitle";

const Templates = () => {
  return (
    <Fragment>
      <Flex w={"100%"} flexDir={"column"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex flexDir={"column"}>
            <HeadingTitle title="Templates" />
            <Text fontSize={"sm"} color={"brand.gray.dark"}>
              Manage your templates here.
            </Text>
          </Flex>
        </Flex>
        <Divider my={4} />
      </Flex>
    </Fragment>
  );
};
export default Templates;
