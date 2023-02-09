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
import { postPicsToTemplate } from "../../../services/templates.services";
import SearchBar from "../../searchBar/SearchBar";

const AddPicsToTemplateModal = ({
  isOpen,
  onClose,
  picturesList,
  loadingPics,
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
  } = useContext(TemplatesCTX);
  const [searchValue, setSearchValue] = useState<string>("");
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
        console.log(response);
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

  return (
    <Modal isOpen={isOpen} onClose={cancelButtonHandler} isCentered>
      <ModalOverlay />
      <ModalContent maxW={"70rem"} mx={8}>
        <ModalHeader color={"brand.gray.dark"}>
          Add pictures to template
        </ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          {loadingInfo ? (
            <Fragment>
              <LoadingSkeleton />
            </Fragment>
          ) : (
            <Fragment>
              {templateInfo && (
                <Flex flexDir={"column"}>
                  <TemplateText title={"Name:"} text={templateInfo.name} />
                </Flex>
              )}

              <Text
                fontWeight={600}
                fontSize={"sm"}
                color={"brand.gray.superDark"}
                my={2}
              >
                Select pictures to complete the template:
              </Text>

              {loadingPics ? (
                <Flex w={"100%"}>
                  <LoadingPicsSkeletons />
                </Flex>
              ) : (
                <Fragment>
                  <SearchBar
                    placeHolderText="Search for a picture"
                    onSearchValueChange={onSearchValueChange}
                  />
                  <SimpleGrid
                    columns={[1, 2, 3, 4]}
                    border={"1px"}
                    borderColor={"brand.gray.superLight"}
                    p={4}
                    mt={2}
                    borderRadius={"8px"}
                    w={"100%"}
                    spacing={4}
                    maxH={"22rem"}
                    overflowY={"scroll"}
                    scrollBehavior="auto"
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
                  <PaginationComponent />
                </Fragment>
              )}
            </Fragment>
          )}
        </ModalBody>
        <ModalFooter>
          <Flex pb={4} justifyContent={"flex-end"} w={"100%"}>
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
        </ModalFooter>
      </ModalContent>
    </Modal>
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
    <Flex gap={"8px"} flexDir={"column"}>
      <Flex gap={"8px"}>
        <Skeleton w={"3rem"} h={"12px"} />
        <Skeleton w={"7rem"} h={"12px"} />
      </Flex>
      <Flex gap={"8px"}>
        <Skeleton w={"3rem"} h={"12px"} />
        <Skeleton w={"7rem"} h={"12px"} />
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
    columns={[1, 2, 3, 4]}
    h={"20rem"}
  >
    <Skeleton h={"200px"} />
    <Skeleton h={"200px"} />
    <Skeleton h={"200px"} />
    <Skeleton h={"200px"} />
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
    >
      <CardHeader
        p={0}
        w={"100%"}
        h={"100%"}
        maxH={"10rem"}
        onClick={() => {
          handleChange(picture.id);
        }}
        opacity={handleSelected() === true ? "70%" : "100%"}
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

const PaginationComponent = ({ currentPage, totalPages }) => {
  return (
    <Flex
      w={"100%"}
      mt={4}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Text fontSize={"sm"}>{`${1} of 123 pages`}</Text>
      <Flex>
        <Tooltip label={"Start"}>
          <IconButton
            size={"sm"}
            mr={2}
            icon={<Icon as={ChevronDoubleLeftIcon} w={"5"} h={"5"} />}
            fontSize="sm"
            bg="brand.primary.mediumLight"
            // border={"1px"}
            // borderColor={"brand.primary.medium"}
            color={"blue.500"}
            variant="solid"
            fontWeight="medium"
            onClick={() => {
              // dispatch({ type: types.goStart });
            }}
            _hover={{
              bg: "brand.primary.mediumLight",
            }}
            _active={{
              background: "brand.primary.mediumLight",
            }}
            // disabled={paginationInfo && pageCounter === 0 ? true : false}
            aria-label={""}
          />
        </Tooltip>

        <Tooltip label={"Previous"}>
          <IconButton
            size={"sm"}
            icon={<Icon as={ChevronLeftIcon} w={"5"} h={"5"} />}
            fontSize="sm"
            bg="brand.primary.mediumLight"
            // border={"1px"}
            // borderColor={"brand.primary.medium"}
            color={"blue.500"}
            variant="solid"
            fontWeight="medium"
            onClick={() => {
              //      onClick={() => {
              //   // dispatch({ type: types.decrement });
              // }}
            }}
            _hover={{
              bg: "brand.primary.mediumLight",
            }}
            _active={{
              background: "brand.primary.mediumLight",
            }}
            // disabled={paginationInfo && pageCounter === 0 ? true : false}
            aria-label={""}
          />
        </Tooltip>

        <Center
          borderRadius={"4px"}
          bg={"white"}
          mx={2}
          px={2}
          color={"blue.500"}
          fontWeight={"medium"}
        >
          {/* {pageCounter + 1} */}
          {"1"}
        </Center>

        <Tooltip label={"Next"}>
          <IconButton
            size={"sm"}
            icon={<Icon as={ChevronRightIcon} w={"5"} h={"5"} />}
            fontSize="sm"
            bg="brand.primary.mediumLight"
            // border={"1px"}
            // borderColor={"brand.primary.medium"}
            color={"blue.500"}
            variant="solid"
            fontWeight="medium"
            onClick={() => {
              // dispatch({ type: types.increment });
            }}
            _hover={{
              bg: "brand.primary.mediumLight",
            }}
            _active={{
              background: "brand.primary.mediumLight",
            }}
            // disabled={
            //   paginationInfo &&
            //   pageCounter === paginationInfo.totalPages
            //     ? true
            //     : false
            // }
            aria-label={""}
          />
        </Tooltip>

        <Tooltip label={"End"}>
          <IconButton
            size={"sm"}
            ml={2}
            icon={<Icon as={ChevronDoubleRightIcon} w={"5"} h={"5"} />}
            fontSize="sm"
            // border={"1px"}
            // borderColor={"brand.primary.medium"}
            bg="brand.primary.mediumLight"
            color={"blue.500"}
            variant="solid"
            fontWeight="medium"
            onClick={() => {
              // dispatch({ type: types.goEnd });
            }}
            _hover={{
              bg: "brand.primary.mediumLight",
            }}
            _active={{
              background: "brand.primary.mediumLight",
            }}
            // disabled={
            //   paginationInfo &&
            //   pageCounter === paginationInfo.totalPages
            //     ? true
            //     : false
            // }
            aria-label={""}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default AddPicsToTemplateModal;
