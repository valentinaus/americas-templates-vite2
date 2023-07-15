import { Flex, useDisclosure, Text, Icon, Divider } from "@chakra-ui/react";
import { DocumentAddIcon, UserAddIcon } from "@heroicons/react/solid";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MoreProjectDetailsModal from "../components/modals/homeModals/MoreProjectDetailsModal";
import AddProjectModal from "../components/modals/projectsModals/AddProjectModal";
import ChangeProjectStatusModal from "../components/modals/projectsModals/ChangeProjectStatusModal";
import DeleteProjectModal from "../components/modals/projectsModals/DeleteProjectModal";
import UpdateProjectModal from "../components/modals/projectsModals/UpdateProjectModal";
import ProjectsTableRows from "../components/tableRows/ProjectsTableRows";
import { IProjectCTX, ProjectsCTX } from "../contexts/projects.context";
import { IPhoneNumber } from "../interfaces/phoneNumber.interfaces";
import { IProject } from "../interfaces/projects.interfaces";
import { ISite } from "../interfaces/sites.interfaces";
import { ITemplate } from "../interfaces/template.interfaces";
import { getAllPhoneNumbers } from "../services/phoneNumbers.services";
import { getAllProjects, getProjectById } from "../services/projects.services";
import { getAllSites } from "../services/sites.services";
import { getAllTemplates } from "../services/templates.services";
import IconCButton from "../UI/buttons/IconCButton";
import TableBase from "../UI/TableBase";
import HeadingTitle from "../UI/titles/HeadingTitle";
import SearchBar from "../components/searchBar/SearchBar";

const tableColumns = [
  { heading: "name", value: "name" },
  { heading: "status", value: "isFinished" },
  { heading: "technician", value: "technician" },
  { heading: "Device", value: "phoneClientName" },
  { heading: "site", value: "siteName" },
];

const Projects = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<IProject | null>(null);
  const [projectsList, setProjectsList] = useState<IProject[] | null>([]);
  const [filteredData, setFilteredData] = useState<IProject[] | null>([]);
  const [searchValue, setSearchValue] = useState<string>("");
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
  const {
    isOpen: isOpenDetailsProject,
    onOpen: onOpenDetailsProject,
    onClose: onCloseDetailsProject,
  } = useDisclosure();

  const {
    isOpen: isOpenChangeStatusProject,
    onOpen: onOpenChangeStatusProject,
    onClose: onCloseChangeStatusProject,
  } = useDisclosure();

  const componentCTX: IProjectCTX = {
    projectsList: filteredData,
    selectedProject: itemSelected,
    refreshList: refresh,
    isLoading: isLoading,
    setProjectsList: setProjectsList,
    setSelectedProject: setItemSelected,
    setRefresh: setRefresh,
    setIsLoading: setIsLoading,
    onOpenEditModal: onOpenEditProject,
    onOpenDeleteModal: onOpenDeleteProject,
    onOpenChangeStatusModal: onOpenChangeStatusProject,
    onOpenDetailsProject: onOpenDetailsProject,
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true);
        const response = await getAllProjects(user.token);

        setProjectsList(response.data);
        setFilteredData(response.data);
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

  useEffect(() => {
    if (itemSelected?.id) {
      const fetchProject = async () => {
        try {
          const response = await getProjectById(user.token, itemSelected.id);
          setItemSelected(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProject();
    }
  }, [itemSelected?.id]);

  useEffect(() => {
    //console.log("Effect");
    const myReg = new RegExp("^.*" + searchValue.toLowerCase() + ".*");
    if (projectsList !== null) {
      const newArray = projectsList.filter((f) =>
        f.name.toLowerCase().match(myReg)
      );
      setFilteredData(newArray);
    }
  }, [projectsList, searchValue]);

  const onSearchValueChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleEnterSearch = (e: any) => {
    if (e.key === "Enter") {
      console.log("ok");
    }
  };

  const handleNoSearch = () => {
    setSearchValue("");
  };

  return (
    <Fragment>
      <ProjectsCTX.Provider value={componentCTX}>
        <Flex w={"100%"} flexDir={"column"} overflow={"auto"}>
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
          <SearchBar
            placeHolderText="Search for a project"
            onSearchValueChange={onSearchValueChange}
            searchValue={searchValue}
            handleEnterSearch={handleEnterSearch}
            handleNoSearch={handleNoSearch}
          />
          <Flex>
            <TableBase
              tableColumns={tableColumns}
              isCheckAll={isCheckAll}
              setIsCheckAll={setIsCheckAll}
              loadingTitle={"Loading projects..."}
              isLoading={isLoading}
              list={filteredData}
              emptyTitle={"Projects list empty!"}
            >
              <ProjectsTableRows tableColumns={tableColumns} />
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

        <ChangeProjectStatusModal
          isOpen={isOpenChangeStatusProject}
          onClose={onCloseChangeStatusProject}
        />

        {itemSelected && (
          <MoreProjectDetailsModal
            isOpen={isOpenDetailsProject}
            onClose={onCloseDetailsProject}
            projectSelected={itemSelected}
            setItemSelected={setItemSelected}
          />
        )}
      </ProjectsCTX.Provider>
    </Fragment>
  );
};
export default Projects;
