import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import LoginBase from "../../UI/LoginBase";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import { postResetPassword } from "../../services/login.services";
import { EyeIcon } from "@heroicons/react/solid";
import queryString from "query-string";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toast = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowPConfirmPassword] = useState(false);

  const queryInfo = queryString.parse(window.location.search);
  const schema = Yup.object().shape({
    password: Yup.string()
      .required("No password provided.")
      .max(15, "Password must be 15 characters or less."),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .max(15, "Password must be 15 characters or less."),
  });

  const submitHandler = async (values, actions) => {
    if (queryInfo.email && queryInfo.Token) {
      const userObj = {
        email: queryInfo.email as string,
        token: queryInfo.Token as string,
        password: values.password,
      };

      try {
        setIsLoading(true);
        const response = await postResetPassword(userObj);

        actions.setSubmitting(false);
        actions.resetForm();

        toast({
          title: "Password reset",
          description: "Your password has been reset. Please log in",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setIsLoading(false);
        navigate("/login");
      } catch (error) {
        actions.setSubmitting(false);
        setIsLoading(false);
        actions.resetForm();
        console.log(error);
        toast({
          title: "Error",
          description: "Your password couldn't be reset. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Error",
        description: "Reset info incorrect. Please try again",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: submitHandler,
  });

  return (
    <LoginBase>
      <Heading>Reset your password</Heading>
      <Flex justifyContent={"flex-start"} mt={2}>
        {queryInfo && (
          <Text
            fontSize={"sm"}
            fontWeight={"semibold"}
            color={"brand.gray.superDark"}
          >
            {queryInfo.email}
          </Text>
        )}
      </Flex>
      <Text fontSize={"sm"} color={"brand.gray.medium"} px={10}>
        Enter your new password
      </Text>

      <Flex
        as="form"
        flexDir={"column"}
        mt={8}
        w={"80%"}
        onSubmit={formik.handleSubmit as any}
      >
        <FormControl
          display={"flex"}
          flexDir={"column"}
          isInvalid={(formik.errors.password as any) && formik.touched.password}
        >
          <FormLabel fontWeight="medium">Password:</FormLabel>
          <InputGroup size="md">
            <Input
              {...formik.getFieldProps("password")}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={"Insert password"}
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

          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        <FormControl
          display={"flex"}
          flexDir={"column"}
          mt={4}
          isInvalid={
            (formik.errors.confirmPassword as any) &&
            formik.touched.confirmPassword
          }
        >
          <FormLabel fontWeight="medium">Confirm Password:</FormLabel>
          <InputGroup size="md">
            <Input
              {...formik.getFieldProps("confirmPassword")}
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder={"Insert password"}
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

          <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
        </FormControl>
        <Button
          mt={6}
          loadingText={"Reseting password..."}
          isLoading={isLoading}
          w={"100%"}
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
          Reset password
        </Button>
        <Button
          fontSize={"sm"}
          variant={"outline"}
          mt={4}
          loadingText={"Loading"}
          w={"100%"}
          borderColor={"blue.300"}
          color={"blue.300"}
          onClick={() => {
            navigate("/login");
          }}
        >
          Go back home
        </Button>
      </Flex>
    </LoginBase>
  );
};
export default ResetPassword;
