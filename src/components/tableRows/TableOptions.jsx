import React from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Tooltip, Text, IconButton } from "@chakra-ui/react";

const TableOptions = ({
  editLabel,
  deleteLabel,
  onClickEdit,
  onClickDelete,
}) => {
  return (
    <Flex w={"5rem"} h={5} justifyContent={"center"} alignItems={"center"}>
      <Tooltip
        label={editLabel}
        fontSize={"13px"}
        // bg={"brand.primary.dark"}
        color={"white"}
      >
        <IconButton
          size={"sm"}
          _hover={{
            color: "brand.primary.hover",
          }}
          _active={{
            color: "brand.primary.active",
          }}
          icon={<EditIcon />}
          color={"brand.gray.dark"}
          onClick={onClickEdit}
        />
      </Tooltip>
      <Tooltip
        label={deleteLabel}
        fontSize={"13px"}
        // bg={"brand.primary.dark"}
        color={"white"}
      >
        <IconButton
          ml={2}
          size={"sm"}
          _hover={{
            color: "brand.red.medium",
          }}
          _active={{
            color: "brand.primary.active",
          }}
          icon={<DeleteIcon />}
          color={"brand.gray.dark"}
          onClick={onClickDelete}
        />
      </Tooltip>
    </Flex>
  );
};
export default TableOptions;
