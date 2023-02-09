import { Button, Divider, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import {
  ClipboardIcon,
  DocumentIcon,
  PlusCircleIcon,
} from "@heroicons/react/solid";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import ProjectsDashboard from "../components/homeComponents/ProjectsDashboard";
import { IRecentProject } from "../interfaces/projects.interfaces";
import { getRecentProjects } from "../services/projects.services";
import IconCButton from "../UI/buttons/IconCButton";
import HeadingTitle from "../UI/titles/HeadingTitle";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [recentProjectsList, setRecentProjectsList] = useState<
    IRecentProject[] | null
  >([]);
  const [itemSelected, setItemSelected] = useState<IRecentProject | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecentProjects = async () => {
      try {
        setIsLoading(true);
        const response = await getRecentProjects(user.token);
        setRecentProjectsList(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchRecentProjects();
  }, []);

  return (
    <Fragment>
      <Flex w={"100%"} flexDir={"column"}>
        <Flex justifyContent={"space-between"} alignItems={"center"}>
          <Flex flexDir={"column"}>
            <HeadingTitle title="Home" />
            <Text fontSize={"sm"} fontWeight={"600"} color={"brand.gray.dark"}>
              {`Welcome back, ${user.fullName}!.`}
            </Text>
            <Text fontSize={"sm"} color={"brand.gray.dark"}>
              {`Check your recent proyects in here.`}
            </Text>
          </Flex>
          {/* <IconCButton
            text={"Manage all projects"}
            icon={<Icon as={ClipboardIcon} w={4} h={4} />}
            onClick={() => {
              navigate("/projects");
            }}
          /> */}
        </Flex>
        <Divider my={4} />
        <ProjectsDashboard
          isloading={isLoading}
          recentProjectsList={recentProjectsList}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
        />
      </Flex>
    </Fragment>
  );
};
export default Home;
