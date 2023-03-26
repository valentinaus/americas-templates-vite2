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
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { UsersCTX } from "../../../contexts/users.context";
import * as Yup from "yup";
import { useFormik } from "formik";
import { editUser } from "../../../services/users.services";

const UpdateUserModal = ({ isOpen, onClose }) => {
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

  const submitUpdateUser = async (values, actions) => {
    if (selectedUser) {
      const obj = {
        ...values,
        roleId: 0,
        clientId: "test",
      };

      try {
        setIsLoading(true);
        const response = await editUser(user.token, selectedUser.id, obj);
        console.log(response);
        actions.setSubmitting(false);
        actions.resetForm();
        onClose();
        setRefresh(!refreshList);
        toast({
          title: "User update successful",
          description: "The user was updated successfully",
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
          title: "User update unsuccessfull",
          description: "The user couldn't be updated. try again later",
          status: "error",
          duration: 2000,
          isClosable: true,
        });
      }
    }
  };

  const formSchema = Yup.object().shape({
    fullName: Yup.string().required("Fullname required"),
    // .matches(
    //   /^([A-zÀ-ú]|[0-9]|[-'_ `´])+$/,
    //   "full name cannot contain special caracters"
    // )
    email: Yup.string()
      .email("Email must be a valid email")
      .required("Email required"),
    phoneNumber: Yup.string()
      .required("phone number required")
      .matches(/^([0-9]|)+$/, "Phone number can only contain numbers"),
  });

  const formik = useFormik({
    initialValues: {
      fullName: selectedUser ? `${selectedUser.fullName}` : "",
      email: selectedUser ? `${selectedUser.email}` : "",
      phoneNumber: selectedUser ? `${selectedUser.phoneNumber}` : "",
    },
    validationSchema: formSchema,
    onSubmit: submitUpdateUser,
    enableReinitialize: true,
  });

  return (
    <Modal isOpen={isOpen} onClose={cancelButtonHandler} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader color={"brand.gray.dark"}>Edit User</ModalHeader>
        <Divider />
        <ModalCloseButton />
        <ModalBody>
          <VStack
            as="form"
            mt={4}
            onSubmit={formik.handleSubmit as any}
            spacing={4}
          >
            <FormControl
              display={"flex"}
              flexDir={"column"}
              isInvalid={
                (formik.errors.fullName as any) &&
                (formik.touched.fullName as any)
              }
            >
              <FormLabel fontWeight="medium">Full name</FormLabel>
              <Input
                {...formik.getFieldProps("fullName")}
                id="fullName"
                name="fullName"
                placeholder={"Insert full name"}
                size="sm"
                borderRadius="4px"
                borderColor={"brand.gray.mediumLight"}
              />
              <FormErrorMessage>{formik.errors.fullName}</FormErrorMessage>
            </FormControl>
            <FormControl
              display={"flex"}
              flexDir={"column"}
              isInvalid={
                (formik.errors.email as any) && (formik.touched.email as any)
              }
            >
              <FormLabel fontWeight="medium">Email</FormLabel>
              <Input
                {...formik.getFieldProps("email")}
                id="email"
                name="email"
                placeholder={"Insert email"}
                size="sm"
                borderRadius="4px"
                borderColor={"brand.gray.mediumLight"}
              />
              <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              display={"flex"}
              flexDir={"column"}
              isInvalid={
                (formik.errors.phoneNumber as any) &&
                (formik.touched.phoneNumber as any)
              }
            >
              <FormLabel fontWeight="medium">Phone number</FormLabel>
              <Input
                {...formik.getFieldProps("phoneNumber")}
                id="phoneNumber"
                name="phoneNumber"
                placeholder={"Insert phone number"}
                size="sm"
                borderRadius="4px"
                borderColor={"brand.gray.mediumLight"}
              />
              <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
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
export default UpdateUserModal;
