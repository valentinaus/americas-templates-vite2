import { Button } from "@chakra-ui/react";
import React from "react";
const CButton = ({ text }) => {
  return (
    <Button colorScheme={"blue"} size={"sm"}>
      {text}
    </Button>
  );
};
export default CButton;
