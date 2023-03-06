import {
  Avatar,
  Button,
  Center,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { EyeIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import HeadingTitle from "../../UI/titles/HeadingTitle";
import * as Yup from "yup";
import { useFormik } from "formik";
import { postChangePassword } from "../../services/login.services";

const ChangePassword = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowPConfirmPassword] = useState(false);

  const schema = Yup.object().shape({
    oldPassword: Yup.string()
      .required("No password provided.")
      .max(15, "Password must be 15 characters or less."),

    newPassword: Yup.string()
      .required("No password provided.")
      .max(15, "Password must be 15 characters or less.")
      .min(6, "Password has to be longer than 6 characters!")
      .matches(/[0-9]/, "Password requires a number")
      .matches(/[a-z]/, "Password requires a lowercase letter")
      .matches(/[A-Z]/, "Password requires an uppercase letter")
      .matches(/[^\w]/, "Password requires a symbol"),

    confirmPassword: Yup.string()
      .required("No password provided.")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  });

  const submitHandler = async (values, actions) => {
    const obj = {
      email: user.email,
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    try {
      setIsLoading(true);
      const response = await postChangePassword(user.token, obj);

      actions.setSubmitting(false);
      actions.resetForm();

      toast({
        title: "Password changed",
        description: "Your password has been change successfully.",
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
        title: "Error",
        description:
          "Your password couldn't be change. Please insert your previous password correctly and try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: submitHandler,
  });

  return (
    <>
      <Flex w={"100%"} flexDir={"column"}>
        <Flex flexDir={"column"}>
          <HeadingTitle title="Profile" />
          <Text fontSize={"sm"} color={"brand.gray.dark"}>
            Manage your user settings
          </Text>
        </Flex>
        <Divider my={4} />

        <Text
          fontSize={"md"}
          color={"brand.gray.medium"}
          fontWeight={"semibold"}
          mb={2}
        >
          User Information
        </Text>
        <Container>
          {user && (
            <Flex gap={3} alignItems={"center"}>
              <Center>
                <Avatar name={user ? user.fullName : ""} size="lg" />
              </Center>

              <Flex flexDir={"column"}>
                <TextComponent title="Name" text={user.fullName} />
                <TextComponent title="Email" text={user.email} />
              </Flex>
            </Flex>
          )}
        </Container>

        <Text
          fontSize={"md"}
          color={"brand.gray.medium"}
          fontWeight={"semibold"}
          mt={6}
          mb={2}
        >
          Change password
        </Text>

        <Container>
          <Flex w={"100%"} as="form" onSubmit={formik.handleSubmit as any}>
            <Flex flexDir={"column"}>
              <FormControl
                maxW={"20rem"}
                display={"flex"}
                flexDir={"column"}
                isInvalid={
                  (formik.errors.oldPassword as any) &&
                  formik.touched.oldPassword
                }
              >
                <FormLabel fontWeight="medium" color={"brand.gray.medium"}>
                  Old Password:
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    {...formik.getFieldProps("oldPassword")}
                    id="oldPassword"
                    name="oldPassword"
                    type={"password"}
                    placeholder={"Insert old password"}
                    size="sm"
                    borderRadius="4px"
                    borderColor={"brand.gray.mediumLight"}
                  />
                </InputGroup>

                <FormErrorMessage>{formik.errors.oldPassword}</FormErrorMessage>
              </FormControl>

              <FormControl
                maxW={"20rem"}
                display={"flex"}
                mt={4}
                flexDir={"column"}
                isInvalid={
                  (formik.errors.newPassword as any) &&
                  formik.touched.newPassword
                }
              >
                <FormLabel fontWeight="medium" color={"brand.gray.medium"}>
                  New Password:
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    {...formik.getFieldProps("newPassword")}
                    id="newPassword"
                    name="newPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder={"Insert new password"}
                    size="sm"
                    borderRadius="4px"
                    borderColor={"brand.gray.mediumLight"}
                  />

                  <InputRightElement
                    width="3rem"
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Icon
                      as={EyeIcon}
                      mb={"5px"}
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      _hover={{
                        color: "brand.primary.hover",
                      }}
                      color={
                        showPassword === true
                          ? "brand.primary.hover"
                          : "brand.gray.dark"
                      }
                    ></Icon>
                  </InputRightElement>
                </InputGroup>

                <FormErrorMessage>{formik.errors.newPassword}</FormErrorMessage>
              </FormControl>

              <FormControl
                maxW={"20rem"}
                display={"flex"}
                flexDir={"column"}
                mt={4}
                isInvalid={
                  (formik.errors.confirmPassword as any) &&
                  formik.touched.confirmPassword
                }
              >
                <FormLabel fontWeight="medium" color={"brand.gray.medium"}>
                  Confirm Password:
                </FormLabel>
                <InputGroup size="md">
                  <Input
                    {...formik.getFieldProps("confirmPassword")}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={"Confirm password"}
                    size="sm"
                    borderRadius="4px"
                    borderColor={"brand.gray.mediumLight"}
                  />

                  <InputRightElement
                    width="3rem"
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Icon
                      as={EyeIcon}
                      mb={"5px"}
                      onClick={() => {
                        setShowPConfirmPassword(!showConfirmPassword);
                      }}
                      _hover={{
                        color: "brand.primary.hover",
                      }}
                      color={
                        showConfirmPassword === true
                          ? "brand.primary.hover"
                          : "brand.gray.dark"
                      }
                    ></Icon>
                  </InputRightElement>
                </InputGroup>

                <FormErrorMessage>
                  {formik.errors.confirmPassword}
                </FormErrorMessage>
              </FormControl>
            </Flex>

            <Flex
              w={"100%"}
              justifyContent={"flex-end"}
              alignItems={"flex-end"}
            >
              <Button
                size={"sm"}
                mt={6}
                loadingText={"Reseting password..."}
                isLoading={isLoading}
                maxW={"20rem"}
                bg={"#1D90F4"}
                color={"white"}
                _hover={{
                  bg: "#157FDB",
                }}
                _active={{
                  bg: "#1871BF",
                }}
                type={"submit"}
              >
                Change password
              </Button>
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

const TextComponent = ({ title, text }: { title: string; text: string }) => {
  return (
    <Flex gap={2}>
      <Text fontSize={"sm"} color={"brand.gray.medium"} fontWeight={"semibold"}>
        {title}:
      </Text>
      <Text fontSize={"sm"} color={"brand.gray.medium"}>
        {text}
      </Text>
    </Flex>
  );
};

const Container = (props) => {
  return (
    <Flex
      border={"1px"}
      borderRadius={"4px"}
      borderColor={"brand.gray.superLight"}
      boxShadow={"sm"}
      bg={"brand.gray.XLlight"}
      p={4}
    >
      {props.children}
    </Flex>
  );
};

export default ChangePassword;
