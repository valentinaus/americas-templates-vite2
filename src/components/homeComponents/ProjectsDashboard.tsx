import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { Dispatch } from "@reduxjs/toolkit";
import React, { SetStateAction } from "react";
import { Fragment } from "react";
import { IRecentProject } from "../../interfaces/projects.interfaces";
import MoreProjectDetailsModal from "../modals/homeModals/MoreProjectDetailsModal";
import { LoadingRecentProjectSkeletons } from "../spinners/loadingSkeletons";

interface ProjectsDashboardI {
  isloading: boolean;
  recentProjectsList: IRecentProject[] | null;
  itemSelected: IRecentProject | null;
  setItemSelected: any;
}

const ProjectsDashboard = ({
  isloading,
  recentProjectsList,
  itemSelected,
  setItemSelected,
}: ProjectsDashboardI) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                  <ProjectCard
                    project={item}
                    onOpen={onOpen}
                    setItemSelected={setItemSelected}
                  />
                ))}
            </SimpleGrid>
          ) : (
            <></>
          )}
        </Fragment>
      )}

      {itemSelected && (
        <MoreProjectDetailsModal
          isOpen={isOpen}
          onClose={onClose}
          projectSelected={itemSelected}
          setItemSelected={setItemSelected}
        />
      )}
    </Fragment>
  );
};

interface projectCardI {
  project: IRecentProject;
  onOpen: any;
  setItemSelected: any;
}
const ProjectCard = ({ project, onOpen, setItemSelected }: projectCardI) => {
  return (
    <Tooltip label={"Show more details"}>
      <Card
        size={"md"}
        onClick={() => {
          setItemSelected(project);
          onOpen();
        }}
      >
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
        </CardBody>
      </Card>
    </Tooltip>
  );
};

export default ProjectsDashboard;
