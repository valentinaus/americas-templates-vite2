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
import { PhoneNumbersCTX } from "../../../contexts/phoneNumber.context";
import { deleteClientPhone } from "../../../services/phoneNumbers.services";

const DeleteClientPhoneModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const {
    setRefresh,
    refreshList,
    isLoading,
    setIsLoading,
    selectedPhoneNumber,
    setSelectedPhoneNumber,
  } = useContext(PhoneNumbersCTX);

  const cancelButtonHandler = () => {
    onClose();
    setSelectedPhoneNumber(null);
  };

  const submitDeleteClientPhone = async () => {
    if (selectedPhoneNumber) {
      try {
        const response = await deleteClientPhone(
          user.token,
          selectedPhoneNumber.id
        );
        console.log(response);
        onClose();
        setRefresh(!refreshList);
        toast({
          title: "Device deleted successful",
          description: "The device was deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Device deleted unsuccessfully",
          description: "The device couldn't be deleted. try again later",
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
        <ModalHeader color={"brand.gray.dark"}>Delete Device</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          {selectedPhoneNumber && (
            <Center my={4} flexDir={"row"}>
              <Text>
                Are you sure you want to delete
                <strong> {selectedPhoneNumber.name} </strong>
                of your device list?
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
              onClick={submitDeleteClientPhone}
            >
              Delete
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DeleteClientPhoneModal;
