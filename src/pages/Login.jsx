import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import backgroundImg from "../assets/background/background2.jpg";
import HeadingTitle from "../UI/titles/HeadingTitle";
import logo from "../assets/logo.png";
import { Field, useFormik } from "formik";
import * as Yup from "yup";
import { getStoredCredentials } from "../utilities/localStorage.utils";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../contexts/slices/auth";
import { clearMessage } from "../contexts/slices/message";
import { EyeIcon } from "@heroicons/react/solid";

const Login = () => {
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const initialValues = {
    username: "",
    password: "",
  };

  const submitLoginHandler = async (values, actions) => {
    const obj = {
      email: values.userName,
      password: values.password,
    };
    setLoading(true);

    dispatch(login(obj))
      .unwrap()
      .then(() => {
        navigate("/home");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    } else {
      navigate("");
    }
  }, [isLoggedIn]);

  const loginSchema = Yup.object().shape({
    userName: Yup.string().email().required("Email required"),
    password: Yup.string()
      .required("No password provided.")
      .max(15, "Password must be 15 characters or less."),
    rememberMe: Yup.boolean().notRequired(),
  });

  const formik = useFormik({
    initialValues: userCredentials,
    validationSchema: loginSchema,
    onSubmit: submitLoginHandler,
  });

  return (
    <Grid height={"100vh"} w={"100vw"} templateColumns={"3fr 2fr"}>
      <GridItem
      // backgroundImage={backgroundImg}
      // backgroundPosition="55% 55%"
      // backgroundRepeat="no-repeat"
      // background-size="contain"
      >
        <Image src={backgroundImg} height={"100%"} alt="Dan Abramov" />
      </GridItem>
      <GridItem
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
      >
        <Flex w={"12rem"} mb={8}>
          <Image src={logo} alt="Americas Logo" />
        </Flex>
        <Heading>Welcome back!</Heading>
        <Text fontSize={"sm"} color={"brand.gray.medium"}>
          Enter your email and password to log in.{" "}
        </Text>
        <Flex
          as="form"
          flexDir={"column"}
          mt={8}
          w={"60%"}
          onSubmit={formik.handleSubmit}
        >
          <VStack spacing={4}>
            <FormControl
              display={"flex"}
              flexDir={"column"}
              isInvalid={formik.errors.userName && formik.touched.userName}
            >
              <FormLabel fontWeight="medium">Email:</FormLabel>
              <Input
                {...formik.getFieldProps("userName")}
                id="userName"
                name="userName"
                placeholder={"Insert email"}
                size="sm"
                borderRadius="4px"
                borderColor={"brand.gray.mediumLight"}
              />
              <FormErrorMessage>{formik.errors.userName}</FormErrorMessage>
            </FormControl>
            <FormControl
              display={"flex"}
              flexDir={"column"}
              isInvalid={formik.errors.password && formik.touched.password}
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
              isInvalid={formik.errors.rememberMe && formik.touched.rememberMe}
            >
              {/* <Flex justifyContent={"space-between"}>
                <Checkbox
                  id={"rememberMe"}
                  onChange={formik.handleChange}
                  name="rememberMe"
                  isChecked={formik.values.rememberMe}
                  checked={formik.values.rememberMe}
                >
                  <Text color={"brand.gray.mediumLight"} fontSize={"sm"}>
                    Remember me
                  </Text>
                </Checkbox>

                <Link
                  onClick={() => {
                    navigate("recover-password");
                  }}
                  color={"blue.400"}
                  fontSize={"sm"}
                >
                  Forgot your password?
                </Link>
              </Flex> */}
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Button
              loadingText={"Loading"}
              isLoading={loading}
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
              Log in
            </Button>

            {message && (
              <Text
                fontSize={"sm"}
                color={"brand.red.medium"}
                textAlign={"center"}
                fontWeight={"semibold"}
              >
                {"We couldn’t find any account with this email and password. "}
                {"Please check your email and password and try again."}
              </Text>
            )}
          </VStack>
        </Flex>
      </GridItem>
    </Grid>
  );
};
export default Login;
