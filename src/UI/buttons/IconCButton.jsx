import { Button } from "@chakra-ui/react";
import React from "react";
const IconCButton = ({ text, icon, onClick, ml = 0 }) => {
  return (
    <Button
      colorScheme={"blue"}
      size={"sm"}
      leftIcon={icon}
      onClick={onClick}
      ml={2}
    >
      {text}
    </Button>
  );
};
export default IconCButton;
