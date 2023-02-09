import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Text,
  VStack,
  Center,
  Icon,
  Divider,
  StackDivider,
} from "@chakra-ui/react";
import { ClipboardIcon } from "@heroicons/react/solid";
import React from "react";
import { IRecentProject } from "../../../interfaces/projects.interfaces";

interface MoreProjectDetailsModalTypes {
  isOpen: any;
  onClose: any;
  projectSelected: IRecentProject | null;
  setItemSelected: any;
}

const MoreProjectDetailsModal = ({
  isOpen,
  onClose,
  projectSelected,
  setItemSelected,
}: MoreProjectDetailsModalTypes) => {
  const handleOnClose = () => {
    setItemSelected(null);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={handleOnClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"brand.gray.dark"}>Project Details</ModalHeader>
        <ModalCloseButton />
        <Divider />
        <ModalBody>
          <VStack display={"flex"} alignItems={"flex-start"}>
            {projectSelected && (
              <>
                <Flex alignItems={"center"} gap={"16px"}>
                  <Center bg={"brand.gray.light"} borderRadius={"40rem"} p={2}>
                    <Icon as={ClipboardIcon} w={6} h={6} color={"white"} />
                  </Center>
                  <Text
                    textTransform={"capitalize"}
                    fontWeight={700}
                    color={"brand.gray.superDark"}
                  >
                    {projectSelected.name}
                  </Text>
                </Flex>

                <VStack
                  pl={2}
                  spacing={2}
                  display={"flex"}
                  alignItems={"flex-start"}
                  w={"100%"}
                  divider={<StackDivider borderColor="gray.200" />}
                >
                  <TextElement
                    title={"Description"}
                    text={projectSelected.description}
                  />
                  <TextElement
                    title={"Template"}
                    text={projectSelected.templateName}
                  />
                  <TextElement
                    title={"Technician"}
                    text={projectSelected.technician}
                  />
                  <TextElement
                    title={"Phone client name"}
                    text={projectSelected.phoneClientName}
                  />
                  <TextElement title={"Site"} text={projectSelected.siteName} />
                </VStack>
              </>
            )}
          </VStack>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button colorScheme="blue" size={"sm"} onClick={handleOnClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface TextElementTypes {
  title: string;
  text: string;
}

const TextElement = ({ title, text }: TextElementTypes) => {
  return (
    <Flex>
      <Text fontWeight={500} w={"160px"} color={"brand.gray.superDark"}>
        {`${title}:`}
      </Text>

      <Text color={text ? "brand.gray.superDark" : "brand.red.medium"}>
        {text ?? "Not assigned"}
      </Text>
    </Flex>
  );
};
export default MoreProjectDetailsModal;
