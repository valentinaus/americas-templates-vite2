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
import { UsersCTX } from "../../../contexts/users.context";
import { deleteUser } from "../../../services/users.services";

const DeleteUserModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const {
    setRefresh,
    refreshList,
    isLoading,
    setIsLoading,
    selectedUser,
    setSelectedUser,
  } = useContext(UsersCTX);

  const cancelButtonHandler = () => {
    onClose();
    setSelectedUser(null);
  };

  const submitDeleteUser = async () => {
    if (selectedUser) {
      try {
        const response = await deleteUser(user.token, selectedUser.id);
        console.log(response);
        onClose();
        setRefresh(!refreshList);
        toast({
          title: "User deleted successful",
          description: "The user was deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "User deleted unsuccessfully",
          description: "The user couldn't be deleted. try again later",
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
        <ModalHeader color={"brand.gray.dark"}>Delete User</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          {selectedUser && (
            <Center my={4} flexDir={"row"}>
              <Text>
                Are you sure you want to delete
                <strong> {selectedUser.fullName} </strong>
                of your users list?
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
            <Button size={"sm"} colorScheme="blue" onClick={submitDeleteUser}>
              Delete
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DeleteUserModal;
