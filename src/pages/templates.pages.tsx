import { Divider, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { PlusCircleIcon } from "@heroicons/react/solid";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddPicsToTemplateModal from "../components/modals/templatesModals/AddPicsToTemplateModal";
import AddTemplateModal from "../components/modals/templatesModals/AddTemplateModal";
import DeleteTemplateModal from "../components/modals/templatesModals/DeleteTemplateModal";
import TemplateDetailsModal from "../components/modals/templatesModals/TemplateDetailsModal";
import UpdateTemplateModal from "../components/modals/templatesModals/UpdateTemplateModal";
import TemplatesTableRows from "../components/tableRows/TemplatesTableRows";
import { ITemplateCTX, TemplatesCTX } from "../contexts/templates.context";
import { IPicture } from "../interfaces/pictures.interfaces";
import { ITemplate, ITemplateInfo } from "../interfaces/template.interfaces";
import { getAllPictures } from "../services/pictures.services";
import {
  getAllTemplates,
  getTemplateInfo,
} from "../services/templates.services";
import IconCButton from "../UI/buttons/IconCButton";
import MainCard from "../UI/containers/MainCard";
import TableBase from "../UI/TableBase";
import HeadingTitle from "../UI/titles/HeadingTitle";
import SecongTitle from "../UI/titles/SecongTitle";
import { paginationI } from "./pictures.pages";

const tableColumns = [
  { heading: "name", value: "name" },
  { heading: "description", value: "description" },
  // { heading: "longitude", value: "longitude" },
];

export const picturesPaginationIV: paginationI = {
  totalPages: "",
  currentPage: 1,
  pageSize: 5,
  name: "",
};

const Templates = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<ITemplate | null>(null);
  const [templatesList, setTemplatesList] = useState<ITemplate[] | null>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [templateInfo, setTemplateInfo] = useState<ITemplateInfo | null>(null);
  const [loadingInfo, setLoadingInfo] = useState<boolean>(false);
  const [loadingPics, setLoadingPics] = useState<boolean>(false);
  const [picturesList, setPicturesList] = useState<IPicture[] | null>([]);
  const [picturesPaginationInfo, setPicturesPaginationInfo] =
    useState<paginationI>(picturesPaginationIV);

  const [searchValue, setSearchValue] = useState<string>("");

  const {
    isOpen: isOpenAddTemplate,
    onOpen: onOpenAddTemplate,
    onClose: onCloseAddTemplate,
  } = useDisclosure();
  const {
    isOpen: isOpenEditTemplate,
    onOpen: onOpenEditTemplate,
    onClose: onCloseEditTemplate,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteTemplate,
    onOpen: onOpenDeleteTemplate,
    onClose: onCloseDeleteTemplate,
  } = useDisclosure();

  const {
    isOpen: isOpenAddPicsToTemp,
    onOpen: onOpenAddPicsToTemp,
    onClose: onCloseAddPicsToTemp,
  } = useDisclosure();

  const {
    isOpen: isOpenTempDetails,
    onOpen: onOpenTempDetails,
    onClose: onCloseTempDetails,
  } = useDisclosure();

  const componentCTX: ITemplateCTX = {
    templatesList: templatesList,
    selectedTemplate: itemSelected,
    templateInfo: templateInfo,
    refreshList: refresh,
    isLoading: isLoading,
    loadingInfo: loadingInfo,
    setTemplatesList: setTemplatesList,
    setSelectedTemplate: setItemSelected,
    setTemplateInfo: setTemplateInfo,
    setRefresh: setRefresh,
    setIsLoading: setIsLoading,
    setLoadingInfo: setLoadingInfo,
    onOpenEditModal: onOpenEditTemplate,
    onOpenDeleteModal: onOpenDeleteTemplate,
    onOpenAddPicsModal: onOpenAddPicsToTemp,
    onOpenTemplatDetails: onOpenTempDetails,
    picturesPaginationInfo: picturesPaginationInfo,
    setPicturesPaginationInfo: setPicturesPaginationInfo,
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        const response = await getAllTemplates(user.token);
        setTemplatesList(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchTemplates();
  }, [refresh]);

  useEffect(() => {
    const fetchTemplateInfo = async () => {
      if (itemSelected) {
        try {
          setLoadingInfo(true);
          const response = await getTemplateInfo(user.token, itemSelected?.id);
          setTemplateInfo(response.data);
          setLoadingInfo(false);
        } catch (error) {
          console.log(error);
          setLoadingInfo(false);
        }
      }
    };
    fetchTemplateInfo();
  }, [itemSelected]);

  useEffect(() => {
    const fetchPictures = async () => {
      if (itemSelected) {
        try {
          setLoadingPics(true);
          const response = await getAllPictures(
            user.token,
            picturesPaginationInfo?.currentPage,
            picturesPaginationInfo?.pageSize,
            picturesPaginationInfo?.name
          );
          setPicturesList(response.data.results);

          console.log(response.data);
          const paginationObj = {
            totalPages: response.data.totalPages,
            currentPage: response.data.currentPage,
          };

          setPicturesPaginationInfo((prevState: any) => {
            return { ...prevState, ...paginationObj };
          });

          setLoadingPics(false);
        } catch (error) {
          setLoadingPics(false);
          console.log(error);
        }
      }
    };
    fetchPictures();
  }, [
    itemSelected,
    picturesPaginationInfo?.currentPage,
    picturesPaginationInfo?.name,
    picturesPaginationInfo?.pageSize,
  ]);

  return (
    <Fragment>
      <TemplatesCTX.Provider value={componentCTX}>
        <Flex w={"100%"} flexDir={"column"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex flexDir={"column"}>
              <HeadingTitle title="Templates" />
              <Text fontSize={"sm"} color={"brand.gray.dark"}>
                Manage your templates list here.
              </Text>
            </Flex>

            <IconCButton
              text={"Add Template"}
              icon={<Icon as={PlusCircleIcon} w={4} h={4} />}
              onClick={onOpenAddTemplate}
            />
          </Flex>
          <Divider my={4} />

          <TableBase
            tableColumns={tableColumns}
            isCheckAll={isCheckAll}
            setIsCheckAll={setIsCheckAll}
            loadingTitle={"Loading templates..."}
            isLoading={isLoading}
            list={templatesList}
            emptyTitle={"Templates list empty!"}
          >
            <TemplatesTableRows tableColumns={tableColumns} />
          </TableBase>
        </Flex>

        <AddTemplateModal
          isOpen={isOpenAddTemplate}
          onClose={onCloseAddTemplate}
        />

        <UpdateTemplateModal
          isOpen={isOpenEditTemplate}
          onClose={onCloseEditTemplate}
        />
        <DeleteTemplateModal
          isOpen={isOpenDeleteTemplate}
          onClose={onCloseDeleteTemplate}
        />

        <AddPicsToTemplateModal
          isOpen={isOpenAddPicsToTemp}
          onClose={onCloseAddPicsToTemp}
          picturesList={picturesList}
          loadingPics={loadingPics}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />

        <TemplateDetailsModal
          isOpen={isOpenTempDetails}
          onClose={onCloseTempDetails}
          picturesList={picturesList}
          loadingPics={loadingPics}
        />
      </TemplatesCTX.Provider>
    </Fragment>
  );
};
export default Templates;
