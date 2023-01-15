import { Center, Flex, Text } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import { ArchiveIcon } from "@heroicons/react/solid";
import React from "react";

const EmptyTable = ({ emptyTitle }) => {
  return (
    <Center
      height={"full"}
      w={"full"}
      justifyContent={"center"}
      alignItems={"center"}
      p={6}
    >
      <Flex flexDir={"column"} justifyContent={"center"} alignItems={"center"}>
        {/* <Image w={"10rem"} src={emptyBox} /> */}

        <Icon
          as={ArchiveIcon}
          w={"10rem"}
          h={"10rem"}
          color={"brand.gray.superLight"}
        />
        <Text fontWeight={700} color={"brand.gray.dark"} mt={4}>
          {emptyTitle}
        </Text>
      </Flex>
    </Center>
  );
};
export default EmptyTable;
