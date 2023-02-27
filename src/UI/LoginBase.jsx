import { Flex, Grid, GridItem, Image } from "@chakra-ui/react";
import React from "react";
import backgroundImg from "../assets/background/background2.jpg";
import logo from "../assets/logo.png";
const LoginBase = (props) => {
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
        </Flex>{" "}
        {props.children}
      </GridItem>
    </Grid>
  );
};
export default LoginBase;
