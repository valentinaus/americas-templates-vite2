import {
  Button,
  Divider,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useToast,
  Text,
  Center,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { PIcturesCTX } from "../../../contexts/pictures.context";
import { UsersCTX } from "../../../contexts/users.context";
import { deletePicture } from "../../../services/pictures.services";
import { deleteUser } from "../../../services/users.services";

const DeletePicModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const {
    setRefresh,
    refreshList,
    isLoading,
    setIsLoading,
    selectedPicture,
    setSelectedPicture,
  } = useContext(PIcturesCTX);

  const cancelButtonHandler = () => {
    onClose();
    setSelectedPicture(null);
  };

  const submitDeletePic = async () => {
    if (selectedPicture) {
      try {
        const response = await deletePicture(user.token, selectedPicture.id);
        console.log(response);
        onClose();
        setRefresh(!refreshList);
        toast({
          title: "Picture deleted successful",
          description: "The picture was deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Picture deleted unsuccessfully",
          description: "The picture couldn't be deleted. try again later",
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
        <ModalHeader color={"brand.gray.dark"}>Delete Picture</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          {selectedPicture && (
            <Center my={4} flexDir={"row"}>
              <Text>
                Are you sure you want to delete
                <strong> {selectedPicture.name} </strong>
                of your pictures list?
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
            <Button size={"sm"} colorScheme="blue" onClick={submitDeletePic}>
              Delete
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DeletePicModal;
