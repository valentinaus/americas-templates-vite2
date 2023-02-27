import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import {
  DotsVerticalIcon,
  InformationCircleIcon,
} from "@heroicons/react/solid";
import { Dispatch } from "@reduxjs/toolkit";
import React, { SetStateAction } from "react";
import { Fragment } from "react";
import { IRecentProject } from "../../interfaces/projects.interfaces";
import EmptyTable from "../emptyStates/EmptyTable";
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
            <SimpleGrid w={"100%"} spacing={4} columns={[1, 2, 3, 3, 5, 5]}>
              {recentProjectsList &&
                recentProjectsList.map((item) => (
                  <ProjectCard
                    key={item.id}
                    project={item}
                    onOpen={onOpen}
                    setItemSelected={setItemSelected}
                  />
                ))}
            </SimpleGrid>
          ) : (
            <EmptyTable emptyTitle={"There are no project created."} />
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
          pb={2}
          borderRadius={"6px 6px 0 0"}
          cursor={"pointer"}
          h={"80px"}
          display={"flex"}
          alignItems={"flex-end"}
        >
          <Tooltip label={project.name}>
            <Text
              fontWeight={"600"}
              color={"white"}
              textTransform={"capitalize"}
              noOfLines={2}
            >
              {project.name}
            </Text>
          </Tooltip>
        </CardHeader>
        <CardBody
          fontSize={"sm"}
          px={4}
          p={2}
          color={"brand.gray.dark"}
          cursor={"pointer"}
          display={"flex"}
          justifyContent={"space-between"}
        >
          <Flex flexDir={"column"}>
            <Text fontSize={"12px"} color={"brand.gray.mediumLight"}>
              Site
            </Text>
            <Text fontWeight={"500"} color={"brand.gray.superDark"}>
              {project.siteName}
            </Text>
          </Flex>

          <Flex py={2}>
            <Icon
              as={InformationCircleIcon}
              w={4}
              h={4}
              color={"brand.gray.dark"}
            />
          </Flex>
        </CardBody>
      </Card>
    </Tooltip>
  );
};

export default ProjectsDashboard;
