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

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { DownloadIcon } from "@chakra-ui/icons";
import SearchBar from "../components/searchBar/SearchBar";

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
  const [filteredData, setFilteredData] = useState<ISite[] | null>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [searchValue, setSearchValue] = useState<string>("");

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
    sitesList: filteredData,
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
        setFilteredData(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchSites();
  }, [refresh]);

  useEffect(() => {
    const myReg = new RegExp("^.*" + searchValue.toLowerCase() + ".*");
    if (sitesList !== null) {
      const newArray = sitesList.filter((f) =>
        f.name.toLowerCase().match(myReg)
      );
      setFilteredData(newArray);
    }
  }, [sitesList, searchValue]);

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

  const submitExport = async () => {
    try {
      //setIsLoading(true);
      const response = await getAllSites(user.token);

      const fileName = `Sites`;
      const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
      const fileExtension = ".xlsx";
      const ws = XLSX.utils.json_to_sheet(response.data);
      const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
      const excelBuffer = XLSX.write(wb, {
        bookType: "xlsx",
        type: "array",
      });

      const data = new Blob([excelBuffer], { type: fileType });
      FileSaver.saveAs(data, fileName + fileExtension);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

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
            <Flex>
              <IconCButton
                text={"Export sites"}
                icon={<Icon as={DownloadIcon} w={4} h={4} />}
                onClick={submitExport}
              />
              <IconCButton
                text={"Add Site"}
                icon={<Icon as={PlusCircleIcon} w={4} h={4} />}
                onClick={onOpenAddSite}
                ml={2}
              />
            </Flex>
          </Flex>
          <Divider my={4} />
          <SearchBar
            placeHolderText="Search for a site"
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
              loadingTitle={"Loading sites..."}
              isLoading={isLoading}
              list={filteredData}
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
