import React from "react";
import { Box, Heading } from "@chakra-ui/react";

const HeadingTitle = ({ title }) => {
  return (
    <Box pb={2}>
      <Heading
        as={"h1"}
        color="brand.gray.superDark"
        fontWeight="bold"
        fontSize={"2xl"}
        textTransform={"capitalize"}
      >
        {title}
      </Heading>
    </Box>
  );
};
export default HeadingTitle;
