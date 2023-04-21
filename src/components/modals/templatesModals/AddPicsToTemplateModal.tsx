import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Divider,
  ModalCloseButton,
  ModalBody,
  Center,
  ModalFooter,
  Flex,
  Button,
  useToast,
  Text,
  Skeleton,
  SimpleGrid,
  Image,
  Tooltip,
  Card,
  CardHeader,
  CardBody,
  Icon,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import types from "@emotion/styled";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/solid";
import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { TemplatesCTX } from "../../../contexts/templates.context";
import { paginationI } from "../../../pages/pictures.pages";
import { postPicsToTemplate } from "../../../services/templates.services";
import PaginationComponent from "../../PaginationComponent";
import SearchBar from "../../searchBar/SearchBar";

const AddPicsToTemplateModal = ({
  isOpen,
  onClose,
  picturesList,
  loadingPics,
  setSearchValue,
  searchValue,
}) => {
  const toast = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const {
    setRefresh,
    refreshList,
    selectedTemplate,
    setSelectedTemplate,
    templateInfo,
    setTemplateInfo,
    loadingInfo,
    picturesPaginationInfo,
    setPicturesPaginationInfo,
  } = useContext(TemplatesCTX);

  const [selectedItemsList, setSelectedItemsList] = useState<any>([]);

  const assignedPictures = () => {
    if (
      templateInfo &&
      templateInfo.photos &&
      templateInfo.photos?.length > 0
    ) {
      return templateInfo.photos.map((item) => item.id);
    }
    return [];
  };

  useEffect(() => {
    const assigned = assignedPictures();
    setSelectedItemsList(assigned);
  }, [templateInfo?.photos]);

  const cancelButtonHandler = () => {
    onClose();
    setSelectedTemplate(null);
    setSelectedItemsList([]);
    setTemplateInfo(null);
    handleNoSearch();
  };

  const handleChange = (item: any) => {
    let updateList = [...selectedItemsList];
    if (updateList.includes(item)) {
      updateList.splice(selectedItemsList.indexOf(item), 1);
    } else {
      updateList.push(item);
    }
    setSelectedItemsList(updateList);
  };

  const onSearchValueChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const submitAddPicsToTemplate = async () => {
    if (selectedTemplate) {
      try {
        const response = await postPicsToTemplate(
          user.token,
          selectedItemsList,
          selectedTemplate.id
        );

        onClose();
        setRefresh(!refreshList);
        setSelectedTemplate(null);
        setSelectedItemsList([]);
        setTemplateInfo(null);
        toast({
          title: "Pictures added",
          description: "Pictures added to template successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        handleNoSearch();
      } catch (error) {
        console.log(error);
        toast({
          title: "Pcitures couldn't be added",
          description: "The pictures couldn't be added. try again later",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const handleEnterSearch = (e: any) => {
    if (e.key === "Enter") {
      handleSearch(searchValue);
    }
  };

  const handleSearch = (value: string) => {
    setPicturesPaginationInfo((prevState: any) => {
      return { ...prevState, name: value, currentPage: 1 };
    });
  };

  const handleNoSearch = () => {
    setSearchValue(() => {
      setPicturesPaginationInfo((prevState: any) => {
        return { ...prevState, currentPage: 1, name: "" };
      });
      return "";
    });
  };

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={"xl"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>{"Add pictures to template"}</DrawerHeader>
        <DrawerBody>
          {loadingInfo ? (
            <Fragment>
              <LoadingSkeleton />
            </Fragment>
          ) : (
            <Flex
              h={"100%"}
              flexDir={"column"}
              justifyContent={"space-between"}
            >
              <Flex flexDir={"column"}>
                {templateInfo && (
                  <Flex flexDir={"column"} mb={2}>
                    <TemplateText title={"Name:"} text={templateInfo.name} />
                  </Flex>
                )}
                <SearchBar
                  placeHolderText="Search for a picture"
                  onSearchValueChange={onSearchValueChange}
                  searchValue={searchValue}
                  handleEnterSearch={handleEnterSearch}
                  handleNoSearch={handleNoSearch}
                />
              </Flex>

              <Flex
                h={"100%"}
                flexDir={"column"}
                position={"relative"}
                overflowY={"auto"}
                sx={{
                  "&::-webkit-scrollbar": {
                    width: "10px",
                    borderRadius: "8px",
                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: `rgba(0, 0, 0, 0.05)`,
                  },
                }}
              >
                <Flex
                  flexDir={"column"}
                  position={"sticky"}
                  top={0}
                  zIndex={1}
                  mr={2}
                >
                  {loadingPics ? (
                    <Flex w={"100%"} h={"100%"}>
                      <LoadingPicsSkeletons />
                    </Flex>
                  ) : (
                    <Fragment>
                      <SimpleGrid
                        columns={[1, 2, 3, 4, 5]}
                        border={"1px"}
                        borderColor={"brand.gray.superLight"}
                        p={4}
                        mt={2}
                        borderRadius={"8px"}
                        w={"100%"}
                        // h={"100%"}
                        spacing={4}

                        // maxH={"100%"}

                        // templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
                      >
                        {picturesList &&
                          picturesList.map((item, index) => (
                            <PictureCardTemp
                              key={index}
                              picture={item}
                              handleChange={handleChange}
                              selectedItemsList={selectedItemsList}
                            />
                          ))}{" "}
                      </SimpleGrid>
                    </Fragment>
                  )}
                </Flex>
              </Flex>

              <Flex flexDir={"column"}>
                <PaginationComponent
                  paginationInfo={picturesPaginationInfo}
                  setPaginationInfo={setPicturesPaginationInfo}
                />
                <Divider my={4} />
                <Flex mb={4} justifyContent={"flex-end"} w={"100%"}>
                  <Button
                    size={"sm"}
                    variant="ghost"
                    mr={3}
                    onClick={cancelButtonHandler}
                  >
                    Cancel
                  </Button>
                  <Button
                    size={"sm"}
                    colorScheme="blue"
                    disabled={selectedItemsList.length === 0 ? true : false}
                    onClick={submitAddPicsToTemplate}
                  >
                    Add
                  </Button>
                </Flex>
              </Flex>
            </Flex>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export const TemplateText = ({ title, text }) => {
  return (
    <Flex gap={"8px"}>
      <Text fontWeight={600} fontSize={"sm"} color={"brand.gray.superDark"}>
        {title}
      </Text>

      <Text fontSize={"sm"} color={"brand.gray.dark"}>
        {text}
      </Text>
    </Flex>
  );
};

export const LoadingSkeleton = () => {
  return (
    <Flex gap={"8px"} flexDir={"column"} h={"100%"}>
      <Flex gap={"8px"}>
        <Skeleton w={"3rem"} h={"25px"} />
        <Skeleton w={"7rem"} h={"25px"} />
      </Flex>
      <Flex gap={"12px"}>
        <Skeleton w={"100%"} h={"30px"} />
      </Flex>

      <LoadingPicsSkeletons />
    </Flex>
  );
};

export const LoadingPicsSkeletons = () => (
  <SimpleGrid
    border={"1px"}
    w={"100%"}
    borderColor={"brand.gray.superLight"}
    p={4}
    mt={2}
    borderRadius={"8px"}
    gap={"8px"}
    columns={[1, 2, 3, 4, 5]}
    h={"20rem"}
  >
    <Skeleton h={"150px"} />
    <Skeleton h={"150px"} />
    <Skeleton h={"150px"} />
    <Skeleton h={"150px"} />
    <Skeleton h={"150px"} />
    <Skeleton h={"150px"} />
    <Skeleton h={"150px"} />
    <Skeleton h={"150px"} />
  </SimpleGrid>
);

const PictureCardTemp = ({ picture, handleChange, selectedItemsList }) => {
  const handleSelected = () => {
    const selected = selectedItemsList.filter((item) => item === picture.id);
    if (selected.length > 0) {
      return true;
    } else return false;
  };

  return (
    <Card
      maxW="sm"
      borderRadius={"4px"}
      border={handleSelected() === true ? "2px" : "1px"}
      borderColor={
        handleSelected() === true ? "blue.300" : "brand.gray.superLight"
      }
      boxShadow={handleSelected() === true ? "md" : "sm"}
      _hover={{
        boxShadow: "md",
        border: "2px",
        borderColor: "blue.300",
      }}
      h={"10rem"}
    >
      <CardHeader
        p={0}
        w={"100%"}
        h={"100%"}
        onClick={() => {
          handleChange(picture.id);
        }}
        opacity={handleSelected() === true ? "70%" : "100%"}
        maxH={"7rem"}
      >
        <Image
          src={picture.base64Image}
          objectFit="cover"
          h={"100%"}
          w={"100%"}
          alt={picture.name}
          // borderRadius={"4px"}
        />
      </CardHeader>

      <CardBody
        p={"10px"}
        onClick={() => {
          handleChange(picture.id);
        }}
      >
        <Text
          fontWeight={"500"}
          textTransform={"capitalize"}
          color={"brand.gray.superDark"}
          noOfLines={1}
          cursor={"pointer"}
        >
          {picture.name}
        </Text>
      </CardBody>
    </Card>
  );

  // return (
  //   <Tooltip hasArrow label={picture.name}>
  //     <Flex
  //       border={handleSelected() === true ? "2px" : "1px"}
  //       borderColor={
  //         handleSelected() === true ? "blue.300" : "brand.gray.superLight"
  //       }
  //       borderRadius={"8px"}
  //       boxShadow={handleSelected() === true ? "md" : "sm"}
  //       position={"relative"}
  //       _hover={{
  //         boxShadow: "md",
  //         border: "2px",
  //         borderColor: "blue.300",
  //       }}
  //       onClick={() => {
  //         handleChange(picture.id);
  //       }}
  //     >
  //       <Image
  //         w={"100%"}
  //         src={picture.base64Image}
  //         opacity={handleSelected() === true ? "60%" : "100%"}
  //         objectFit="cover"
  //         alt={picture.name}
  //         borderRadius={"4px"}
  //       />
  //     </Flex>
  //   </Tooltip>
  // );
};
export default AddPicsToTemplateModal;
