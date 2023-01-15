import React from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Flex, Tooltip, Text, IconButton } from "@chakra-ui/react";
import { CameraIcon, InformationCircleIcon } from "@heroicons/react/solid";

const TemplatesTableOptions = ({
  editLabel,
  addPicturesLabel,
  detailsLabel,
  deleteLabel,
  onClickEdit,
  onClickDelete,
  onClickAddPics,
  onClickViewDetails,
}) => {
  return (
    <Flex
      w={"8rem"}
      h={5}
      justifyContent={"center"}
      alignItems={"center"}
      gap={"8px"}
    >
      <Tooltip
        label={detailsLabel}
        fontSize={"13px"}
        // bg={"brand.primary.dark"}
        color={"white"}
      >
        <IconButton
          aria-label=""
          size={"sm"}
          _hover={{
            color: "brand.primary.hover",
          }}
          _active={{
            color: "brand.primary.active",
          }}
          icon={<InformationCircleIcon width={"17px"} height={"17px"} />}
          color={"brand.gray.dark"}
          onClick={onClickViewDetails}
        />
      </Tooltip>

      <Tooltip
        label={addPicturesLabel}
        fontSize={"13px"}
        // bg={"brand.primary.dark"}
        color={"white"}
      >
        <IconButton
          aria-label=""
          size={"sm"}
          _hover={{
            color: "brand.primary.hover",
          }}
          _active={{
            color: "brand.primary.active",
          }}
          icon={<CameraIcon width={"17px"} height={"17px"} />}
          color={"brand.gray.dark"}
          onClick={onClickAddPics}
        />
      </Tooltip>

      <Tooltip
        label={editLabel}
        fontSize={"13px"}
        // bg={"brand.primary.dark"}
        color={"white"}
        placement={"bottom-start"}
      >
        <IconButton
          aria-label=""
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
        placement={"bottom-start"}
      >
        <IconButton
          aria-label=""
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
export default TemplatesTableOptions;
