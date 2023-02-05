import React, { Fragment, useEffect, useState } from "react";
import { Divider, Flex, Icon, useDisclosure, Text } from "@chakra-ui/react";
import HeadingTitle from "../UI/titles/HeadingTitle";
import { useSelector } from "react-redux";
import { ISite } from "../interfaces/sites.interfaces";
import { ISiteCTX, SitesCTX } from "../contexts/sites.context";
import { getAllSites } from "../services/sites.services";
import { PlusCircleIcon } from "@heroicons/react/solid";
import IconCButton from "../UI/buttons/IconCButton";
import TableBase from "../UI/TableBase";
import SitesTableRows from "../components/tableRows/SitesTableRows";
import AddSiteModal from "../components/modals/sitesModals/AddSiteModal";
import UpdateSiteModal from "../components/modals/sitesModals/UpdateSiteModal";
import DeleteSiteModal from "../components/modals/sitesModals/DeleteSiteModal";

const tableColumns = [
  { heading: "name", value: "name" },
  { heading: "description", value: "description" },
  { heading: "latitude", value: "latitude" },
  { heading: "longitude", value: "longitude" },
];

const Sites = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<ISite | null>(null);
  const [sitesList, setSitesList] = useState<ISite[] | null>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const {
    isOpen: isOpenAddSite,
    onOpen: onOpenAddSite,
    onClose: onCloseAddSite,
  } = useDisclosure();
  const {
    isOpen: isOpenEditSite,
    onOpen: onOpenEditSite,
    onClose: onCloseEditSite,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteSite,
    onOpen: onOpenDeleteSite,
    onClose: onCloseDeleteSite,
  } = useDisclosure();

  const componentCTX: ISiteCTX = {
    sitesList: sitesList,
    selectedSite: itemSelected,
    refreshList: refresh,
    isLoading: isLoading,
    setSitesList: setSitesList,
    setSelectedSite: setItemSelected,
    setRefresh: setRefresh,
    setIsLoading: setIsLoading,
    onOpenEditModal: onOpenEditSite,
    onOpenDeleteModal: onOpenDeleteSite,
  };

  useEffect(() => {
    const fetchSites = async () => {
      try {
        setIsLoading(true);
        const response = await getAllSites(user.token);
        setSitesList(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchSites();
  }, [refresh]);

  return (
    <Fragment>
      <SitesCTX.Provider value={componentCTX}>
        <Flex w={"100%"} flexDir={"column"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex flexDir={"column"}>
              <HeadingTitle title="Sites" />
              <Text fontSize={"sm"} color={"brand.gray.dark"}>
                Manage your sites list here.
              </Text>
            </Flex>

            <IconCButton
              text={"Add Site"}
              icon={<Icon as={PlusCircleIcon} w={4} h={4} />}
              onClick={onOpenAddSite}
            />
          </Flex>
          <Divider my={4} />
          <Flex>
            <TableBase
              tableColumns={tableColumns}
              isCheckAll={isCheckAll}
              setIsCheckAll={setIsCheckAll}
              loadingTitle={"Loading sites..."}
              isLoading={isLoading}
              list={sitesList}
              emptyTitle={"Sites list empty!"}
            >
              <SitesTableRows tableColumns={tableColumns} />
            </TableBase>
          </Flex>
        </Flex>

        <AddSiteModal isOpen={isOpenAddSite} onClose={onCloseAddSite} />
        <UpdateSiteModal isOpen={isOpenEditSite} onClose={onCloseEditSite} />
        <DeleteSiteModal
          isOpen={isOpenDeleteSite}
          onClose={onCloseDeleteSite}
        />
      </SitesCTX.Provider>
    </Fragment>
  );
};
export default Sites;
