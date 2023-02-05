import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useContext, Fragment } from "react";
import { PIcturesCTX } from "../../contexts/pictures.context";

const PictureModal = ({ isOpen, onClose }) => {
  const { selectedPicture, setSelectedPicture } = useContext(PIcturesCTX);

  const cancelButtonHandler = () => {
    onClose();
    setSelectedPicture(null);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxW={"40rem"} maxH={"40rem"}>
        <ModalHeader color={"brand.gray.dark"}>
          {selectedPicture && selectedPicture.name
            ? selectedPicture.name
            : "Picture"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {selectedPicture && (
            <Fragment>
              {selectedPicture.description && (
                <Flex gap={"8px"}>
                  <Text
                    color={"brand.gray.superDark"}
                    fontWeight={600}
                    fontSize={"sm"}
                  >
                    Description:
                  </Text>
                  <Text color={"brand.gray.superDark"} fontSize={"sm"}>
                    {selectedPicture?.description}
                  </Text>
                </Flex>
              )}

              <Flex
                w={"100%"}
                h={"27rem"}
                justifyContent={"center"}
                flexDir={"column"}
                gap={"8px"}
                alignItems={"center"}
              >
                <Image
                  maxH={"27rem"}
                  src={selectedPicture.base64Image}
                  objectFit="contain"
                  alt={selectedPicture.name}
                />
              </Flex>
            </Fragment>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={cancelButtonHandler}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default PictureModal;
