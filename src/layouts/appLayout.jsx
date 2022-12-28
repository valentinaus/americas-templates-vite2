import { Flex, Box } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/nav/NavBar";
import SideBar from "../components/sidenav/SideNav";

const AppLayout = () => {
  return (
    <Flex
      flexDir={"column"}
      height={"100vh"}
      justifyContent={"flex-start"}
      w={"100vw"}
    >
      <Box height={"3rem"}>
        <NavBar />
      </Box>
      <Flex height={"94vh"} pl={"5rem"} pt={6} pr={4} pb={4}>
        <SideBar />
        <Outlet />
      </Flex>
    </Flex>
  );
};
export default AppLayout;
