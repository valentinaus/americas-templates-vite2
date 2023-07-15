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
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useSelector } from "react-redux";

import { TemplatesCTX } from "../../../contexts/templates.context";

import { duplicateTemplate } from "../../../services/templates.services";

const DuplicateTemplateModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const {
    setRefresh,
    refreshList,
    isLoading,
    setIsLoading,
    selectedTemplate,
    setSelectedTemplate,
  } = useContext(TemplatesCTX);

  const cancelButtonHandler = () => {
    onClose();
    setSelectedTemplate(null);
  };

  const submitDuplicateTemplate = async () => {
    if (selectedTemplate) {
      try {
        const response = await duplicateTemplate(
          user.token,
          selectedTemplate.id
        );
        console.log(response);
        onClose();
        setRefresh(!refreshList);
        toast({
          title: "Template copied successful",
          description: "The template was copied successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Template copied unsuccessfully",
          description: "The template couldn't be copied. try again later",
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
      <ModalContent>
        <ModalHeader color={"brand.gray.dark"}>Duplicate Template</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          {selectedTemplate && (
            <Center my={4} flexDir={"row"}>
              <Text>
                Are you sure you want to duplicate the template
                <strong> {selectedTemplate.name} </strong>?
              </Text>
            </Center>
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
              onClick={submitDuplicateTemplate}
            >
              Duplicate
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DuplicateTemplateModal;
