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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { ProjectsCTX } from "../../../contexts/projects.context";
import { TemplatesCTX } from "../../../contexts/templates.context";
import { IPicture } from "../../../interfaces/pictures.interfaces";
import { ITemplateInfo } from "../../../interfaces/template.interfaces";
import { getAllPictures } from "../../../services/pictures.services";
import { deleteProject } from "../../../services/projects.services";
import {
  deleteTemplate,
  getTemplateInfo,
  postPicsToTemplate,
} from "../../../services/templates.services";
import LoadingSkeletons from "../../spinners/loadingSkeletons";

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

  // const [loadingPics, setLoadingPics] = useState<boolean>(false);
  // const [picturesList, setPicturesList] = useState<IPicture[] | null>([]);
  const [selectedItemsList, setSelectedItemsList] = useState<any>([]);

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
                  <TemplateText
                    title={"Description:"}
                    text={templateInfo.description}
                  />
                </Flex>
              )}

              <Text
                fontWeight={600}
                fontSize={"sm"}
                color={"brand.gray.superDark"}
                mt={2}
              >
                Select pictures to complete the template:
              </Text>

              {loadingPics ? (
                <Flex w={"100%"}>
                  <LoadingPicsSkeletons />
                </Flex>
              ) : (
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
    <Tooltip hasArrow label={picture.name}>
      <Flex
        // maxW={"200px"}
        // h={"150px"}
        // w={"100%"}
        border={"1px"}
        borderColor={
          handleSelected() === true ? "blue.300" : "brand.gray.superLight"
        }
        borderRadius={"8px"}
        boxShadow={handleSelected() === true ? "md" : "sm"}
        position={"relative"}
        _hover={{
          boxShadow: "md",
          border: "1px",
          borderColor: "blue.300",
        }}
        onClick={() => {
          handleChange(picture.id);
        }}
      >
        <Image
          w={"100%"}
          src={picture.base64Image}
          objectFit="cover"
          alt={picture.name}
          borderRadius={"4px"}
        />
      </Flex>
    </Tooltip>
  );
};

export default AddPicsToTemplateModal;
