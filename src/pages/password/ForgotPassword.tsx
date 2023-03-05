import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import LoginBase from "../../UI/LoginBase";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { postForgotPassword } from "../../services/login.services";

const ForgotPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state.auth);
  const toast = useToast();
  const schema = Yup.object().shape({
    email: Yup.string().email().required("Email required"),
  });

  const submitHandler = async (values, actions) => {
    try {
      setIsLoading(true);
      const response = await postForgotPassword(values);
    
      actions.setSubmitting(false);
      actions.resetForm();

      toast({
        title: "Email sent",
        description: "Check your email for the reset instructions",
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
        description: "Email couldn't be send. Try again latet",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: schema,
    onSubmit: submitHandler,
  });

  return (
    <LoginBase>
      <Heading>Forgot your password?</Heading>
      <Text fontSize={"sm"} color={"brand.gray.medium"} px={10} mt={2}>
        Enter your email address and we’ll send you instructions to reset your
        password.
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
          isInvalid={(formik.errors.email as any) && formik.touched.email}
        >
          <FormLabel fontWeight="medium">Email:</FormLabel>
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
        <Button
          mt={4}
          loadingText={"Sending email..."}
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
          Send reset instructions
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
export default ForgotPassword;
