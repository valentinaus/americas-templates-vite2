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
  Image,
  Card,
  CardHeader,
  CardBody,
  Tooltip,
} from "@chakra-ui/react";
import React, { Fragment, useContext } from "react";
import { TemplatesCTX } from "../../../contexts/templates.context";
import EmptyTable from "../../emptyStates/EmptyTable";
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
  const { setSelectedTemplate, templateInfo, setTemplateInfo, loadingInfo } =
    useContext(TemplatesCTX);

  const cancelButtonHandler = () => {
    onClose();
    setSelectedTemplate(null);
    setTemplateInfo(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={cancelButtonHandler} isCentered>
      <ModalOverlay />
      <ModalContent maxW={"70rem"} mx={8} maxH={"35rem"} h={"100%"}>
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
                <Fragment>
                  {" "}
                  {templateInfo?.photos && templateInfo.photos.length === 0 ? (
                    <Flex
                      border={"1px"}
                      borderColor={"brand.gray.superLight"}
                      p={4}
                      mt={2}
                      borderRadius={"8px"}
                      w={"100%"}
                      h={"20rem"}
                    >
                      <EmptyTable
                        emptyTitle={
                          "No pictures assigned to this template yet."
                        }
                      />
                    </Flex>
                  ) : (
                    <SimpleGrid
                      columns={[1, 2, 3, 4, 5]}
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

export const PictureCardTemp = ({ picture }) => {
  return (
    <Card maxW="sm" borderRadius={"4px"}>
      <CardHeader p={0} w={"100%"} h={"100%"} maxH={"10rem"}>
        <Image
          src={picture.base64Image}
          objectFit="cover"
          h={"100%"}
          w={"100%"}
          alt={picture.name}
          // borderRadius={"4px"}
        />
      </CardHeader>
      <CardBody p={"10px"}>
        <Tooltip label={picture.name}>
          <Text
            fontWeight={"500"}
            textTransform={"capitalize"}
            color={"brand.gray.superDark"}
            noOfLines={1}
            cursor={"pointer"}
          >
            {picture.name}
          </Text>
        </Tooltip>
      </CardBody>
    </Card>
  );
};

export default TemplateDetailsModal;
