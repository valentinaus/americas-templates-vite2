import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
  Divider,
  VStack,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Flex,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { PIcturesCTX } from "../../../contexts/pictures.context";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  postPicture,
  updatePicture,
} from "../../../services/pictures.services";
import { useSelector } from "react-redux";

const UpdatePicsModal = ({ isOpen, onClose }) => {
  const { user } = useSelector((state: any) => state.auth);

  const {
    setRefresh,
    refreshList,
    setIsLoading,
    selectedPicture,
    setSelectedPicture,
  } = useContext(PIcturesCTX);
  const toast = useToast();

  const cancelButtonHandler = () => {
    onClose();
    formik.resetForm();
    setSelectedPicture(null);
  };

  const submitPicInfo = async (values, actions) => {
    if (!selectedPicture) return null;
    try {
      setIsLoading(true);
      const obj = { ...values, base64Image: "" };
      const response = await updatePicture(
        user.token,
        selectedPicture?.id,
        obj
      );
      console.log(response);
      actions.setSubmitting(false);
      cancelButtonHandler();

      setRefresh(!refreshList);
      toast({
        title: "Picture information updated successful",
        description: "This picture was updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      actions.setSubmitting(false);
      setIsLoading(false);
      cancelButtonHandler();
      console.log(error);
      toast({
        title: "Picture information update unsuccessfull",
        description: "This picture couldn't be updated. try again later",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Photo name required")
      .matches(/^[^\\/]+$/i, `Invalid character`),
    description: Yup.string().required("Description required"),
  });

  const formik = useFormik({
    initialValues: {
      name: selectedPicture ? `${selectedPicture.name}` : "",
      description: selectedPicture ? `${selectedPicture.description}` : "",
    },
    validationSchema: formSchema,
    onSubmit: submitPicInfo,
    enableReinitialize: true,
  });

  return (
    <Modal isOpen={isOpen} onClose={cancelButtonHandler} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"brand.gray.dark"}>Update Picture</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <VStack
            as="form"
            onSubmit={formik.handleSubmit as any}
            w={"100%"}
            gap={2}
          >
            <FormControl
              display={"flex"}
              flexDir={"column"}
              isInvalid={(formik.errors.name as any) && formik.touched.name}
            >
              <FormLabel fontWeight="medium">Name</FormLabel>
              <Input
                {...formik.getFieldProps("name")}
                id="name"
                name="name"
                placeholder={"Insert photo name"}
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
                (formik.errors.description as any) && formik.touched.description
              }
            >
              <FormLabel fontWeight="medium">Description</FormLabel>
              <Input
                {...formik.getFieldProps("description")}
                id="description"
                name="description"
                placeholder={"Insert photo description"}
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
export default UpdatePicsModal;
