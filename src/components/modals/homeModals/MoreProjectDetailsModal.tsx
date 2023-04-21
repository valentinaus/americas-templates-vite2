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
  Tag,
  TagLabel,
  HStack,
  Tooltip,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Skeleton,
} from "@chakra-ui/react";
import { ClipboardIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import {
  IProjectById,
  IRecentProject,
} from "../../../interfaces/projects.interfaces";
import { ITemplate } from "../../../interfaces/template.interfaces";

interface MoreProjectDetailsModalTypes {
  isOpen: any;
  onClose: any;
  projectSelected: IProjectById | null;
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
      <ModalContent maxW={"40rem"}>
        <ModalHeader color={"brand.gray.dark"}>Project Details</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <VStack
            display={"flex"}
            alignItems={"flex-start"}
            borderRadius={"8px"}
            border={"1px"}
            borderColor="gray.200"
            p={4}
          >
            {projectSelected && (
              <>
                <Flex alignItems={"center"} gap={"16px"} mb={4}>
                  <Center bg={"brand.gray.light"} borderRadius={"40rem"} p={2}>
                    <Icon as={ClipboardIcon} w={6} h={6} color={"white"} />
                  </Center>
                  <Text
                    textTransform={"capitalize"}
                    fontWeight={700}
                    color={"brand.gray.superDark"}
                    maxWidth={"20rem"}
                    noOfLines={2}
                  >
                    {projectSelected.name}
                  </Text>

                  <Tag
                    size="sm"
                    borderRadius="full"
                    variant="solid"
                    cursor={"pointer"}
                    bg={
                      projectSelected.isFinished === true
                        ? "brand.gray.mediumLight"
                        : "#38A169"
                    }
                  >
                    <TagLabel>
                      {projectSelected.isFinished === true
                        ? "Completed "
                        : "In progress"}
                    </TagLabel>
                  </Tag>
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

                  <Flex>
                    <Text
                      fontWeight={500}
                      w={"160px"}
                      color={"brand.gray.superDark"}
                      maxWidth={"20rem"}
                      noOfLines={1}
                    >
                      {"Templates:"}
                    </Text>
                    {projectSelected.templates &&
                    projectSelected.templates.length > 0 ? (
                      <Flex flexWrap={"wrap"} gap={2} maxWidth={"22rem"}>
                        {projectSelected.templates.map((item) => {
                          return (
                            <TemplatesDetailsTag
                              key={item.id}
                              template={item}
                            />
                          );
                        })}
                      </Flex>
                    ) : (
                      <>
                        {projectSelected.templates &&
                        projectSelected.templates.length === 0 ? (
                          <Text color="brand.red.medium">Not assigned</Text>
                        ) : (
                          <Skeleton
                            width={"10rem"}
                            height={"1.2rem"}
                          ></Skeleton>
                        )}
                      </>
                    )}
                  </Flex>

                  <TextElement
                    title={"Technician"}
                    text={projectSelected.technician}
                  />
                  <TextElement
                    title={"Device"}
                    text={projectSelected.phoneClientName}
                  />
                  <TextElement title={"Site"} text={projectSelected.siteName} />
                </VStack>
              </>
            )}
          </VStack>
        </ModalBody>

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
      <Text
        fontWeight={500}
        w={"160px"}
        color={"brand.gray.superDark"}
        maxWidth={"20rem"}
        noOfLines={1}
      >
        {`${title}:`}
      </Text>

      <Text
        color={
          text && text !== "" ? "brand.gray.superDark" : "brand.red.medium"
        }
        maxWidth={"20rem"}
        noOfLines={1}
      >
        {text && text !== "" ? text : "Not assigned"}
      </Text>
    </Flex>
  );
};

interface TemplatesDetailsTagTypes {
  template: ITemplate;
}

const TemplatesDetailsTag = ({ template }: TemplatesDetailsTagTypes) => {
  const [open, setOpen] = useState(false);
  return (
    <Popover isOpen={open} onClose={() => setOpen(false)}>
      <PopoverTrigger>
        <Tag
          border={"1px"}
          borderColor={" brand.gray.mediumLight"}
          color={" brand.gray.dark"}
          bg={"white"}
          cursor={"default"}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {template.name}
        </Tag>
      </PopoverTrigger>
      <PopoverContent boxShadow={"lg"}>
        <PopoverArrow />

        <PopoverHeader color={" brand.gray.dark"}>
          Template details
        </PopoverHeader>
        <PopoverBody>
          <VStack width={"100%"} alignItems={"flex-start"}>
            <TagDetailsText title={"Name"} text={template.name} />
            <TagDetailsText title={"Description"} text={template.description} />
            <TagDetailsText
              title={"Allowed to be empty"}
              isBool={template.allowEmpty}
            />
          </VStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

interface TagDetailsTextTypes {
  title: string;
  text?: string;
  isBool?: boolean;
}

const TagDetailsText = ({ title, text, isBool }: TagDetailsTextTypes) => {
  return (
    <Flex gap={2} fontSize={"sm"}>
      <Text
        fontWeight={500}
        color={"brand.gray.superDark"}
        maxWidth={"20rem"}
        noOfLines={1}
      >
        {`${title}:`}
      </Text>

      {isBool !== undefined ? (
        <Tag
          size={"sm"}
          borderRadius="full"
          variant="solid"
          cursor={"pointer"}
          bg={!!isBool === true ? "#38A169" : "brand.gray.mediumLight"}
        >
          {!!isBool === true ? "Allowed" : "Not allowed"}
        </Tag>
      ) : (
        <Text color={"brand.gray.superDark"}>{text} </Text>
      )}
    </Flex>
  );
};
export default MoreProjectDetailsModal;
