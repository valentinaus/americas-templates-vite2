import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Fragment } from "react";
import { IRecentProject } from "../../interfaces/projects.interfaces";
import { LoadingRecentProjectSkeletons } from "../spinners/loadingSkeletons";

interface ProjectsDashboardI {
  isloading: boolean;
  recentProjectsList: IRecentProject[] | null;
}

const ProjectsDashboard = ({
  isloading,
  recentProjectsList,
}: ProjectsDashboardI) => {
  return (
    <Fragment>
      {isloading ? (
        <LoadingRecentProjectSkeletons />
      ) : (
        <Fragment>
          {recentProjectsList && recentProjectsList.length > 0 ? (
            <SimpleGrid w={"100%"} spacing={4} columns={[1, 2, 3, 5, 6]}>
              {recentProjectsList &&
                recentProjectsList.map((item) => (
                  <ProjectCard project={item} />
                ))}
            </SimpleGrid>
          ) : (
            <></>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

interface projectCardI {
  project: IRecentProject;
}
const ProjectCard = ({ project }: projectCardI) => {
  return (
    <Card size={"md"}>
      <CardHeader
        bg={"blue.300"}
        p={4}
        borderRadius={"6px 6px 0 0"}
        cursor={"pointer"}
      >
        <Text fontWeight={"600"} color={"white"} textTransform={"capitalize"}>
          {project.name}
        </Text>
      </CardHeader>
      <CardBody
        fontSize={"sm"}
        p={2}
        color={"brand.gray.dark"}
        cursor={"pointer"}
      >
        <Flex flexDir={"column"}>
          <Text fontSize={"12px"} color={"brand.gray.mediumLight"}>
            Site
          </Text>
          <Text fontWeight={"500"} color={"brand.gray.superDark"}>
            {project.siteName}
          </Text>
        </Flex>

        {/* <Text>{project.description}</Text> */}
        {/* 
        <Divider my={2} />
        <Text>{project.description}</Text> */}
      </CardBody>
    </Card>
  );
};

const recentProjectSkeletons = () => {};
export default ProjectsDashboard;
