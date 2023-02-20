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
import {
  changeProjectStatus,
  deleteProject,
} from "../../../services/projects.services";

const ChangeProjectStatusModal = ({ isOpen, onClose }) => {
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

  const submitChangeStatus = async () => {
    if (selectedProject) {
      try {
        const response = await changeProjectStatus(
          user.token,
          selectedProject.id
        );
        console.log(response);
        onClose();
        setRefresh(!refreshList);
        toast({
          title: "Project status changed successful",
          description: "The project status was changed successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Project deleted unsuccessfully",
          description:
            "The project status couldn't be changed. try again later",
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
        <ModalHeader color={"brand.gray.dark"}>Change status</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          {selectedProject && (
            <Center my={4} flexDir={"row"}>
              <Text>
                Are you sure you want to change the status of
                <strong> {selectedProject.name} </strong>?
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
            <Button size={"sm"} colorScheme="blue" onClick={submitChangeStatus}>
              Accept
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ChangeProjectStatusModal;
