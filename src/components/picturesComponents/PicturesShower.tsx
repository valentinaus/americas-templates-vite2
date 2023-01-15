import {
  Flex,
  Icon,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Skeleton,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import React, { Fragment, useContext, useState } from "react";
import { PIcturesCTX } from "../../contexts/pictures.context";
import { DotsVerticalIcon } from "@heroicons/react/solid";

import LoadingSkeletons from "../spinners/loadingSkeletons";
import PictureModal from "./PictureModal";
import EmptyTable from "../emptyStates/EmptyTable";

const PicturesShower = () => {
  const { picturesList, isLoading } = useContext(PIcturesCTX);
  const [onMouseEnter, setOnMouseEnter] = useState<string | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Fragment>
      {isLoading ? (
        <LoadingSkeletons />
      ) : (
        <Fragment>
          {picturesList && picturesList.length > 0 ? (
            <SimpleGrid
              w={"100%"}
              spacing={4}
              columns={[1, 2, 3, 5, 6]}
              // templateColumns="repeat(auto-fill, minmax(150px, 1fr))"
            >
              <Fragment>
                {picturesList.map((item, index) => (
                  <PictureCard
                    key={index}
                    onMouseEnter={onMouseEnter}
                    setOnMouseEnter={setOnMouseEnter}
                    picture={item}
                    onOpen={onOpen}
                  />
                ))}
              </Fragment>
            </SimpleGrid>
          ) : (
            <Flex
              borderRadius={"8px"}
              border={"1px"}
              borderColor={"brand.gray.superLight"}
              boxShadow={"sm"}
            >
              <EmptyTable emptyTitle={"Pictures list empty!"} />
            </Flex>
          )}
        </Fragment>
      )}
      <PictureModal isOpen={isOpen} onClose={onClose} />
    </Fragment>
  );
};

const PictureCard = ({
  picture,
  onMouseEnter,
  setOnMouseEnter,
  onOpen,
}: any) => {
  const { onOpenDeleteModal, setSelectedPicture } = useContext(PIcturesCTX);
  return (
    <Tooltip hasArrow label={picture.name}>
      <Flex
        // maxW={"150px"}
        // maxH={"200px"}
        border={"1px"}
        borderColor={"brand.gray.superLight"}
        borderRadius={"4px"}
        boxShadow={"sm"}
        position={"relative"}
        _hover={{
          boxShadow: "md",
          border: "1px",
          borderColor: "blue.100",
        }}
        onMouseEnter={() => {
          setOnMouseEnter(picture.id);
        }}
        onMouseLeave={() => {
          setOnMouseEnter(null);
        }}
        onClick={() => {
          setSelectedPicture(picture);
        }}
      >
        <Flex
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onOpen();
          }}
        >
          <Image
            src={picture.base64Image}
            objectFit="cover"
            alt={picture.name}
            borderRadius={"4px"}
          />
        </Flex>

        {onMouseEnter && onMouseEnter === picture.id && (
          <Flex
            position={"absolute"}
            alignItems={"flex-end"}
            flexDir={"column"}
            // bg={"rgba(255,255,255,0.4)"}
          >
            <Menu>
              <MenuButton
                variant="ghost"
                as={IconButton}
                aria-label="Options"
                icon={
                  <Icon
                    as={DotsVerticalIcon}
                    w={4}
                    h={4}
                    color={"brand.gray.superDark"}
                  />
                }
                _hover={{
                  bg: "transparent",
                  border: "0px",
                }}
                _active={{ bg: "transparent", border: "0px" }}
                _focus={{ bg: "transparent", border: "0px" }}
              />
              <MenuList>
                {/* <MenuItem icon={<EditIcon />}>Edit Picture</MenuItem> */}
                <MenuItem
                  icon={<DeleteIcon />}
                  onClick={(e) => {
                    e.preventDefault();
                    e.nativeEvent.stopImmediatePropagation();
                    e.stopPropagation();
                    onOpenDeleteModal();
                  }}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        )}
      </Flex>
    </Tooltip>
  );
};

export default PicturesShower;
