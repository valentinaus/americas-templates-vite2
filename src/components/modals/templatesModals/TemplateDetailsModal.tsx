import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Divider,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Flex,
  Button,
  SimpleGrid,
  Text,
  Tooltip,
  Image,
} from "@chakra-ui/react";
import React, { Fragment, useContext } from "react";
import { TemplatesCTX } from "../../../contexts/templates.context";
import {
  LoadingPicsSkeletons,
  LoadingSkeleton,
  TemplateText,
} from "./AddPicsToTemplateModal";

const TemplateDetailsModal = ({
  isOpen,
  onClose,
  picturesList,
  loadingPics,
}) => {
  const {
    setRefresh,
    refreshList,
    selectedTemplate,
    setSelectedTemplate,
    templateInfo,
    setTemplateInfo,
    loadingInfo,
  } = useContext(TemplatesCTX);

  const cancelButtonHandler = () => {
    onClose();
    setSelectedTemplate(null);
    setTemplateInfo(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={cancelButtonHandler} isCentered>
      <ModalOverlay />
      <ModalContent maxW={"70rem"} mx={8}>
        <ModalHeader color={"brand.gray.dark"}>Template details</ModalHeader>
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
              >
                Template pictures:
              </Text>

              {loadingPics ? (
                <Flex w={"100%"}>
                  <LoadingPicsSkeletons />
                </Flex>
              ) : (
                <SimpleGrid
                  columns={[1, 2, 3, 3]}
                  border={"1px"}
                  borderColor={"brand.gray.superLight"}
                  p={4}
                  mt={2}
                  borderRadius={"8px"}
                  w={"100%"}
                  spacing={4}
                  maxH={"22rem"}
                  overflowY={"auto"}
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
                  {templateInfo?.photos &&
                    templateInfo.photos.map((item, index) => (
                      <PictureCardTemp key={index} picture={item} />
                    ))}
                </SimpleGrid>
              )}
            </Fragment>
          )}
        </ModalBody>
        <ModalFooter>
          <Flex pb={4} justifyContent={"flex-end"} w={"100%"}>
            <Button
              size={"sm"}
              colorScheme="blue"
              onClick={cancelButtonHandler}
            >
              Close
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const PictureCardTemp = ({ picture }) => {
  return (
    <Tooltip hasArrow label={picture.name}>
      <Flex
        border={"1px"}
        borderColor={"brand.gray.superLight"}
        borderRadius={"8px"}
        boxShadow={"sm"}

        // _hover={{
        //   boxShadow: "md",
        //   border: "1px",
        //   borderColor: "blue.300",
        // }}
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

export default TemplateDetailsModal;
