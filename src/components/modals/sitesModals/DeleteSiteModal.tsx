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
import { SitesCTX } from "../../../contexts/sites.context";
import { deleteSite } from "../../../services/sites.services";

const DeleteSiteModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const {
    setRefresh,
    refreshList,
    isLoading,
    setIsLoading,
    selectedSite,
    setSelectedSite,
  } = useContext(SitesCTX);

  const cancelButtonHandler = () => {
    onClose();
    setSelectedSite(null);
  };

  const submitDeleteSite = async () => {
    if (selectedSite) {
      try {
        const response = await deleteSite(user.token, selectedSite.id);
        console.log(response);
        onClose();
        setRefresh(!refreshList);
        toast({
          title: "Site deleted successful",
          description: "The site was deleted successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.log(error);
        toast({
          title: "Site deleted unsuccessfully",
          description: "The site couldn't be deleted. try again later",
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
        <ModalHeader color={"brand.gray.dark"}>Delete site</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          {selectedSite && (
            <Center my={4} flexDir={"row"}>
              <Text>
                Are you sure you want to delete
                <strong> {selectedSite.name} </strong>
                of your sites list?
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
            <Button size={"sm"} colorScheme="blue" onClick={submitDeleteSite}>
              Delete
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default DeleteSiteModal;
