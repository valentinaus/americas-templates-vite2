import {
  Button,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import React, { useContext } from "react";
import { ProjectsCTX } from "../../../contexts/projects.context";
import { postProject } from "../../../services/projects.services";
import { TemplatesCTX } from "../../../contexts/templates.context";
import { postTemplate } from "../../../services/templates.services";

const AddTemplateModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const { setRefresh, refreshList, setIsLoading } = useContext(TemplatesCTX);

  const submitTemplate = async (values, actions) => {
    try {
      setIsLoading(true);
      const response = await postTemplate(user.token, values);
      console.log(response);
      actions.setSubmitting(false);
      actions.resetForm();
      onClose();
      setRefresh(!refreshList);
      toast({
        title: "Template creation successful",
        description: "The template was created successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      actions.setSubmitting(false);
      setIsLoading(false);
      actions.resetForm();
      console.log(error);
      toast({
        title: "Template creation unsuccessfull",
        description: "The template couldn't be created. try again later",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const cancelButtonHandler = () => {
    onClose();
    formik.resetForm();
  };

  const formSchema = Yup.object().shape({
    name: Yup.string().required("Name required"),
    // .matches(
    //   /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
    //   "Name cannot contain special caracters"
    // )
    description: Yup.string().required("Description required"),
    // .matches(
    //   /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
    //   "Description cannot contain special caracters"
    // )
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: formSchema,
    onSubmit: submitTemplate,
  });

  return (
    <Modal isOpen={isOpen} onClose={cancelButtonHandler} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"brand.gray.dark"}>Create Template</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <VStack as="form" onSubmit={formik.handleSubmit as any} spacing={4}>
            <FormControl
              display={"flex"}
              flexDir={"column"}
              isInvalid={
                (formik.errors.name as any) && (formik.touched.name as any)
              }
            >
              <FormLabel fontWeight="medium">Name</FormLabel>
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
              <FormLabel fontWeight="medium">Description</FormLabel>
              <Input
                {...formik.getFieldProps("description")}
                id="description"
                name="description"
                placeholder={"Insert template description"}
                size="sm"
                borderRadius="4px"
                borderColor={"brand.gray.mediumLight"}
              />
              <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
            </FormControl>

            <Divider />

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
                loadingText="Loading..."
                isLoading={formik.isSubmitting}
              >
                Create
              </Button>
            </Flex>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
export default AddTemplateModal;
