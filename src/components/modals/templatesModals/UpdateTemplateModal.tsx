import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Switch,
  Text,
  Tooltip,
  useToast,
  VStack,
  Image,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { Fragment, useContext, useState } from "react";
import { TemplatesCTX } from "../../../contexts/templates.context";
import {
  editTemplate,
  postPicsToTemplate,
} from "../../../services/templates.services";
import EmptyTable from "../../emptyStates/EmptyTable";
import { LoadingPicsSkeletons } from "./AddPicsToTemplateModal";
import { CloseIcon } from "@chakra-ui/icons";

const UpdateTemplateModal = ({ isOpen, onClose, loadingPics }) => {
  const toast = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const {
    setRefresh,
    refreshList,
    isLoading,
    setIsLoading,
    selectedTemplate,
    setSelectedTemplate,
    templateInfo,
  } = useContext(TemplatesCTX);

  const [selectedPicsToDelete, SetSelectedPicsToDelete] = useState<
    string[] | any[]
  >([]);

  const handleUpdatedPics = () => {
    if (
      templateInfo &&
      templateInfo.photos &&
      templateInfo.photos?.length > 0
    ) {
      const filteredPicsList = templateInfo.photos
        .map((pic) => pic.id)
        .filter((item) => !selectedPicsToDelete.includes(item));
      return filteredPicsList;
    } else return [];
  };

  const submitUpdateTemplate = async (values, actions) => {
    if (selectedTemplate) {
      setIsLoading(true);
      const obj = {
        ...values,
        allowEmpty:
          values.allowEmpty === "false" || values.allowEmpty === false
            ? false
            : true,
      };
      try {
        const updatedPics = handleUpdatedPics();

        const updateTemplateInfo = await editTemplate(
          user.token,
          selectedTemplate.id,
          obj
        );

        const updateTemplatePics = await postPicsToTemplate(
          user.token,
          updatedPics,
          selectedTemplate.id
        );

        Promise.all([updateTemplateInfo, updateTemplatePics])
          .then((data) => {
            const [updateTemplateInfoRes, updateTemplatePicsRes] = data;

            actions.setSubmitting(false);
            actions.resetForm();
            onClose();
            setRefresh(!refreshList);
            SetSelectedPicsToDelete([]);
            toast({
              title: "Template creation successful",
              description: "The template was created successfully",
              status: "success",
              duration: 3000,
              isClosable: true,
            });
            setIsLoading(false);
          })
          .catch((error) => {
            handleErrors(error, actions);
          });
      } catch (error) {
        handleErrors(error, actions);
      }
    }
  };

  const handleErrors = (error, actions) => {
    actions.setSubmitting(false);
    SetSelectedPicsToDelete([]);
    setIsLoading(false);
    actions.resetForm();
    console.log(error);
    onClose();
    toast({
      title: "Template creation unsuccessfull",
      description: "The template couldn't be created. try again later",
      status: "error",
      duration: 2000,
      isClosable: true,
    });
  };

  const handleChange = (item: any) => {
    if (!selectedPicsToDelete) return null;

    let updateList = [...selectedPicsToDelete];
    if (updateList.includes(item)) {
      updateList.splice(selectedPicsToDelete.indexOf(item), 1);
    } else {
      updateList.push(item);
    }
    SetSelectedPicsToDelete(updateList);
  };

  const cancelButtonHandler = () => {
    onClose();
    formik.resetForm();
    // setSelectedTemplate(null);
    SetSelectedPicsToDelete([]);
  };

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name required")
      .matches(/^[^\\/]+$/i, `Invalid character`),
    // .matches(
    //   /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
    //   "Name cannot contain special caracters"
    // )
    description: Yup.string().required("Description required"),
    allowEmpty: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      name: selectedTemplate ? `${selectedTemplate.name}` : "",
      description: selectedTemplate ? `${selectedTemplate.description}` : "",
      allowEmpty: selectedTemplate ? `${selectedTemplate.allowEmpty}` : false,
    },
    validationSchema: formSchema,
    onSubmit: submitUpdateTemplate,
    enableReinitialize: true,
  });

  return (
    <Modal isOpen={isOpen} onClose={cancelButtonHandler} isCentered>
      <ModalOverlay />
      <ModalContent maxW={"70rem"} mx={8} maxH={"37rem"} h={"100%"}>
        <ModalHeader color={"brand.gray.dark"}>Update Template</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <VStack
            as="form"
            onSubmit={formik.handleSubmit as any}
            spacing={4}
            alignItems={"flex-start"}
            justifyContent={"space-between"}
            h={"100%"}
          >
            <VStack w={"100%"}>
              <HStack
                w={"100%"}
                alignItems={"flex-start"}
                justifyContent={"center"}
              >
                <FormControl
                  display={"flex"}
                  flexDir={"column"}
                  isInvalid={
                    (formik.errors.name as any) && (formik.touched.name as any)
                  }
                >
                  <FormLabel fontWeight="medium" fontSize={"sm"}>
                    Name
                  </FormLabel>
                  <Input
                    {...formik.getFieldProps("name")}
                    id="name"
                    name="name"
                    placeholder={"Insert template name"}
                    size="sm"
                    borderRadius="4px"
                    borderColor={"brand.gray.mediumLight"}
                  />
                  <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                </FormControl>

                <FormControl
                  display={"flex"}
                  flexDir={"column"}
                  isInvalid={
                    (formik.errors.description as any) &&
                    (formik.touched.description as any)
                  }
                >
                  <FormLabel fontWeight="medium" fontSize={"sm"}>
                    Description
                  </FormLabel>
                  <Input
                    {...formik.getFieldProps("description")}
                    id="description"
                    name="description"
                    placeholder={"Insert template description"}
                    size="sm"
                    borderRadius="4px"
                    borderColor={"brand.gray.mediumLight"}
                  />
                  <FormErrorMessage>
                    {formik.errors.description}
                  </FormErrorMessage>
                </FormControl>
              </HStack>
              <FormControl
                display={"flex"}
                flexDir={"column"}
                isInvalid={
                  (formik.errors.allowEmpty as any) &&
                  (formik.touched.allowEmpty as any)
                }
              >
                <FormLabel fontWeight="medium" fontSize={"sm"}>
                  Allow to be empty
                </FormLabel>

                <Switch
                  {...formik.getFieldProps("allowEmpty")}
                  width={"fit-content"}
                  id="allowEmpty"
                  name="allowEmpty"
                  defaultChecked={selectedTemplate?.allowEmpty}
                ></Switch>

                <FormErrorMessage>{formik.errors.allowEmpty}</FormErrorMessage>
              </FormControl>
            </VStack>

            {/* <Divider /> */}

            <Flex
              w={"100%"}
              justifyContent={"flex-start"}
              flexDir={"column"}
              position={"relative"}
              overflowY={"auto"}
              h={"100%"}
              sx={{
                "&::-webkit-scrollbar": {
                  width: "10px",
                  borderRadius: "8px",
                  backgroundColor: `rgba(0, 0, 0, 0.05)`,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: `rgba(0, 0, 0, 0.05)`,
                },
              }}
            >
              <Flex flexDir={"column"} position={"sticky"} top={0} zIndex={1}>
                {loadingPics ? (
                  <Flex w={"100%"} overflow={"hidden"}>
                    <LoadingPicsSkeletons height="17rem" />
                  </Flex>
                ) : (
                  <Fragment>
                    {templateInfo?.photos &&
                    templateInfo.photos.length === 0 ? (
                      <Flex
                        border={"1px"}
                        borderColor={"brand.gray.superLight"}
                        p={4}
                        mt={2}
                        borderRadius={"8px"}
                        w={"100%"}
                        maxH={"17rem"}
                      >
                        <EmptyTable
                          emptyTitle={
                            "No pictures assigned to this template yet."
                          }
                        />
                      </Flex>
                    ) : (
                      <SimpleGrid
                        columns={[1, 2, 3, 4, 5]}
                        border={"1px"}
                        borderColor={"brand.gray.superLight"}
                        p={4}
                        mt={2}
                        borderRadius={"8px"}
                        w={"100%"}
                        spacing={4}
                        maxH={"17rem"}
                        overflowY={"auto"}
                        scrollBehavior="auto"
                        sx={{
                          "&::-webkit-scrollbar": {
                            width: "10px",
                            borderRadius: "8px",
                            backgroundColor: `rgba(0, 0, 0, 0.05)`,
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: `rgba(0, 0, 0, 0.05)`,
                          },
                        }}
                      >
                        {templateInfo?.photos &&
                          templateInfo.photos.map((item, index) => (
                            <PictureCardTempRemovable
                              key={index}
                              picture={item}
                              selectedPicsToDelete={selectedPicsToDelete}
                              handleChange={handleChange}
                            />
                          ))}
                      </SimpleGrid>
                    )}
                  </Fragment>
                )}
              </Flex>
            </Flex>

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
                type="submit"
                loadingText="Updating..."
                isLoading={formik.isSubmitting}
              >
                Update
              </Button>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default UpdateTemplateModal;

const initialPictureCardState = { show: false, id: null };

export const PictureCardTempRemovable = ({
  picture,
  selectedPicsToDelete,
  handleChange,
}) => {
  const [showDeleteBtn, SetShowDeleteBtn] = useState(initialPictureCardState);

  const handleSelected = () => {
    const selected = selectedPicsToDelete.filter((item) => item === picture.id);
    if (selected.length > 0) {
      return true;
    } else return false;
  };
  const handleSelectedValue = handleSelected();

  return (
    <Card
      maxW="sm"
      borderRadius={"4px"}
      onMouseEnter={() => {
        SetShowDeleteBtn({ show: true, id: picture.id });
      }}
      onMouseLeave={() => {
        SetShowDeleteBtn(initialPictureCardState);
      }}
      h={"10rem"}
    >
      <CardHeader
        p={0}
        w={"100%"}
        h={"100%"}
        opacity={handleSelectedValue === true ? "0.5" : "1.0"}
        maxH={"7rem"}
      >
        <Image
          src={picture.base64Image}
          objectFit="cover"
          h={"100%"}
          w={"100%"}
          alt={picture.name}
        />
      </CardHeader>
      <CardBody p={"10px"} display={"flex"} alignItems={"center"}>
        <Tooltip label={picture.name}>
          <Text
            fontWeight={"500"}
            textTransform={"capitalize"}
            color={"brand.gray.superDark"}
            noOfLines={1}
            cursor={"pointer"}
          >
            {picture.name}
          </Text>
        </Tooltip>

        {((showDeleteBtn.show && showDeleteBtn.id === picture.id) ||
          handleSelectedValue === true) && (
          <Tooltip label={"Remove picture"} fontSize={"13px"} color={"white"}>
            <CloseIcon
              width={"10px"}
              color={"brand.gray.dark"}
              onClick={() => {
                handleChange(picture.id);
              }}
            />
          </Tooltip>
        )}
      </CardBody>
    </Card>
  );
};
