import { Button } from "@chakra-ui/react";
import React from "react";
const IconCButton = ({ text, icon, onClick }) => {
  return (
    <Button colorScheme={"blue"} size={"sm"} leftIcon={icon} onClick={onClick}>
      {text}
    </Button>
  );
};
export default IconCButton;
