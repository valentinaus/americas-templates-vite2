import { Flex, useDisclosure, Text, Icon, Divider } from "@chakra-ui/react";
import { DocumentAddIcon, UserAddIcon } from "@heroicons/react/solid";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddProjectModal from "../components/modals/projectsModals/AddProjectModal";
import DeleteProjectModal from "../components/modals/projectsModals/DeleteProjectModal";
import UpdateProjectModal from "../components/modals/projectsModals/UpdateProjectModal";
import ProjectsTableRows from "../components/tableRows/ProjectsTableRows";
import { IProjectCTX, ProjectsCTX } from "../contexts/projects.context";
import { IProject } from "../interfaces/projects.interfaces";
import { getAllProjects } from "../services/projects.services";
import IconCButton from "../UI/buttons/IconCButton";
import TableBase from "../UI/TableBase";
import HeadingTitle from "../UI/titles/HeadingTitle";

const tableColumns = [
  { heading: "name", value: "name" },
  { heading: "description", value: "description" },
];

const Projects = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<IProject | null>(null);
  const [projectsList, setProjectsList] = useState<IProject[] | null>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const {
    isOpen: isOpenAddProject,
    onOpen: onOpenAddProject,
    onClose: onCloseAddProject,
  } = useDisclosure();
  const {
    isOpen: isOpenEditProject,
    onOpen: onOpenEditProject,
    onClose: onCloseEditProject,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteProject,
    onOpen: onOpenDeleteProject,
    onClose: onCloseDeleteProject,
  } = useDisclosure();

  const componentCTX: IProjectCTX = {
    projectsList: projectsList,
    selectedProject: itemSelected,
    refreshList: refresh,
    isLoading: isLoading,
    setProjectsList: setProjectsList,
    setSelectedProject: setItemSelected,
    setRefresh: setRefresh,
    setIsLoading: setIsLoading,
    onOpenEditModal: onOpenEditProject,
    onOpenDeleteModal: onOpenDeleteProject,
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await getAllProjects(user.token);
        setProjectsList(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchProjects();
  }, [refresh]);

  return (
    <Fragment>
      <ProjectsCTX.Provider value={componentCTX}>
        <Flex w={"100%"} flexDir={"column"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex flexDir={"column"}>
              <HeadingTitle title="Projects" />
              <Text fontSize={"sm"} color={"brand.gray.dark"}>
                Manage your projects list here.
              </Text>
            </Flex>

            <IconCButton
              text={"Add Project"}
              icon={<Icon as={DocumentAddIcon} w={4} h={4} />}
              onClick={onOpenAddProject}
            />
          </Flex>
          <Divider my={4} />
          <Flex>
            <TableBase
              tableColumns={tableColumns}
              isCheckAll={isCheckAll}
              setIsCheckAll={setIsCheckAll}
              loadingTitle={"Loading projects..."}
              isLoading={isLoading}
            >
              <ProjectsTableRows tableColumns={tableColumns} />
            </TableBase>
          </Flex>
        </Flex>

        <AddProjectModal
          isOpen={isOpenAddProject}
          onClose={onCloseAddProject}
        />

        <UpdateProjectModal
          isOpen={isOpenEditProject}
          onClose={onCloseEditProject}
        />

        <DeleteProjectModal
          isOpen={isOpenDeleteProject}
          onClose={onCloseDeleteProject}
        />
      </ProjectsCTX.Provider>
    </Fragment>
  );
};
export default Projects;
