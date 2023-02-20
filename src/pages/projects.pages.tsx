import { Flex, useDisclosure, Text, Icon, Divider } from "@chakra-ui/react";
import { DocumentAddIcon, UserAddIcon } from "@heroicons/react/solid";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddProjectModal from "../components/modals/projectsModals/AddProjectModal";
import DeleteProjectModal from "../components/modals/projectsModals/DeleteProjectModal";
import UpdateProjectModal from "../components/modals/projectsModals/UpdateProjectModal";
import ProjectsTableRows from "../components/tableRows/ProjectsTableRows";
import { IProjectCTX, ProjectsCTX } from "../contexts/projects.context";
import { IPhoneNumber } from "../interfaces/phoneNumber.interfaces";
import { IProject } from "../interfaces/projects.interfaces";
import { ISite } from "../interfaces/sites.interfaces";
import { ITemplate } from "../interfaces/template.interfaces";
import { getAllPhoneNumbers } from "../services/phoneNumbers.services";
import { getAllProjects } from "../services/projects.services";
import { getAllSites } from "../services/sites.services";
import { getAllTemplates } from "../services/templates.services";
import IconCButton from "../UI/buttons/IconCButton";
import TableBase from "../UI/TableBase";
import HeadingTitle from "../UI/titles/HeadingTitle";

const tableColumns = [
  { heading: "name", value: "name" },
  { heading: "status", value: "isFinished" },
  { heading: "technician", value: "technician" },
  { heading: "client phone", value: "phoneClientId" },
  { heading: "site", value: "siteId" },
  { heading: "template", value: "templateId" },
];

const Projects = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<IProject | null>(null);
  const [projectsList, setProjectsList] = useState<IProject[] | null>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [sitesList, setSitesList] = useState<ISite[] | null>([]);
  const [phoneNumberList, setPhoneNumberList] = useState<IPhoneNumber[] | null>(
    []
  );
  const [templatesList, setTemplatesList] = useState<ITemplate[] | null>([]);

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
        console.log("response", response);
        setProjectsList(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchProjects();
  }, [refresh]);

  useEffect(() => {
    const fetchSites = async () => {
      try {
        const response = await getAllSites(user.token);
        setSitesList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchPhoneNumbers = async () => {
      try {
        const response = await getAllPhoneNumbers(user.token);
        setPhoneNumberList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchTemplates = async () => {
      try {
        const response = await getAllTemplates(user.token);
        setTemplatesList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTemplates();
    fetchSites();
    fetchPhoneNumbers();
  }, []);

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
              list={projectsList}
              emptyTitle={"Projects list empty!"}
            >
              <ProjectsTableRows
                tableColumns={tableColumns}
                sitesList={sitesList}
                phoneNumberList={phoneNumberList}
                templatesList={templatesList}
              />
            </TableBase>
          </Flex>
        </Flex>

        <AddProjectModal
          isOpen={isOpenAddProject}
          onClose={onCloseAddProject}
          sitesList={sitesList}
          phoneNumberList={phoneNumberList}
          templatesList={templatesList}
        />

        <UpdateProjectModal
          isOpen={isOpenEditProject}
          onClose={onCloseEditProject}
          sitesList={sitesList}
          phoneNumberList={phoneNumberList}
          templatesList={templatesList}
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
