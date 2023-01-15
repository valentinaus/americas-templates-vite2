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
import { ProjectsCTX } from "../../../contexts/projects.context";
import { TemplatesCTX } from "../../../contexts/templates.context";
import { deleteProject } from "../../../services/projects.services";
import { deleteTemplate } from "../../../services/templates.services";

const DeleteTemplateModal = ({ isOpen, onClose }) => {
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

  const submitDeleteProject = async () => {
    if (selectedTemplate) {
      try {
        const response = await deleteTemplate(user.token, selectedTemplate.id);
        console.log(response);
        onClose();
        setRefresh(!refreshList);
        toast({
          title: "Template deleted successful",
          description: "The template was deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Template deleted unsuccessfully",
          description: "The template couldn't be deleted. try again later",
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
        <ModalHeader color={"brand.gray.dark"}>Delete Template</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          {selectedTemplate && (
            <Center my={4} flexDir={"row"}>
              <Text>
                Are you sure you want to delete
                <strong> {selectedTemplate.name} </strong>
                of your templates list?
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
              onClick={submitDeleteProject}
            >
              Delete
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DeleteTemplateModal;
