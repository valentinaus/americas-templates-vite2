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
import { useFormik } from "formik";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { PhoneNumbersCTX } from "../../../contexts/phoneNumber.context";
import * as Yup from "yup";
import { postClientPhone } from "../../../services/phoneNumbers.services";

const AddClientPhoneModal = ({ isOpen, onClose }) => {
  const toast = useToast();
  const { user } = useSelector((state: any) => state.auth);
  const { setRefresh, refreshList, setIsLoading } = useContext(PhoneNumbersCTX);

  const cancelButtonHandler = () => {
    onClose();
    formik.resetForm();
  };

  const submitClientPhone = async (values, actions) => {
    try {
      setIsLoading(true);
      const response = await postClientPhone(user.token, values);
      console.log(response);
      actions.setSubmitting(false);
      actions.resetForm();
      onClose();
      setRefresh(!refreshList);
      toast({
        title: "Device creation successful",
        description: "The device was created successfully",
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
        title: "Device creation unsuccessfull",
        description: "The device couldn't be created. try again later",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name required")
      .matches(/^[^\\/]+$/i, `Invalid character`),
    // .matches(
    //   /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
    //   "Name cannot contain special caracters"
    // ),
    description: Yup.string().required("Description required"),
    // .matches(
    //   /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
    //   "Description cannot contain special caracters"
    // ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: formSchema,
    onSubmit: submitClientPhone,
  });

  return (
    <Modal isOpen={isOpen} onClose={cancelButtonHandler} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"brand.gray.dark"}>Create device</ModalHeader>
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
                placeholder={"Insert device name"}
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
                placeholder={"Insert description"}
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
export default AddClientPhoneModal;
