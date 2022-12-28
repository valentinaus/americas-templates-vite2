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
import { deleteProject } from "../../../services/projects.services";

const DeleteProjectModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const {
    setRefresh,
    refreshList,
    isLoading,
    setIsLoading,
    selectedProject,
    setSelectedProject,
  } = useContext(ProjectsCTX);

  const cancelButtonHandler = () => {
    onClose();
    setSelectedProject(null);
  };

  const submitDeleteProject = async () => {
    if (selectedProject) {
      try {
        const response = await deleteProject(user.token, selectedProject.id);
        console.log(response);
        onClose();
        setRefresh(!refreshList);
        toast({
          title: "Project deleted successful",
          description: "The project was deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Project deleted unsuccessfully",
          description: "The project couldn't be deleted. try again later",
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
        <ModalHeader color={"brand.gray.dark"}>Delete Project</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          {selectedProject && (
            <Center my={4} flexDir={"row"}>
              <Text>
                Are you sure you want to delete
                <strong> {selectedProject.name} </strong>
                of your projects list?
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
export default DeleteProjectModal;
