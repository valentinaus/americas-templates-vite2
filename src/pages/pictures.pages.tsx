import { Divider, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import React, { Fragment, useEffect, useState } from "react";
import HeadingTitle from "../UI/titles/HeadingTitle";
import IconCButton from "../UI/buttons/IconCButton";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { IPictureCTX, PIcturesCTX } from "../contexts/pictures.context";
import { useSelector } from "react-redux";
import { IPicture } from "../interfaces/pictures.interfaces";
import AddPicsModal from "../components/modals/picturesModals/AddPicsModal";
import Dropzone from "react-dropzone";
import { getAllPictures } from "../services/pictures.services";
import PicturesShower from "../components/picturesComponents/PicturesShower";
import DeletePicModal from "../components/modals/picturesModals/DeletePicModal";
import PaginationComponent from "../components/PaginationComponent";
import SearchBar from "../components/searchBar/SearchBar";

export interface paginationI {
  totalPages: number | string | any;
  currentPage: number;
  pageSize: number;
  name: string | null;
}

export const paginationInitialValues: paginationI = {
  totalPages: "",
  currentPage: 1,
  pageSize: 36,
  name: "",
};

const Pictures = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<IPicture | null>(null);
  const [picturesList, setPicturesList] = useState<IPicture[] | null>([]);
  const [paginationInfo, setPaginationInfo] = useState<paginationI | null>(
    paginationInitialValues
  );
  const [searchValue, setSearchValue] = useState<string>("");
  const {
    isOpen: isOpenAddPics,
    onOpen: onOpenAddPics,
    onClose: onCloseAddPics,
  } = useDisclosure();

  const {
    isOpen: isOpenEditPics,
    onOpen: onOpenEditPics,
    onClose: onCloseEditPics,
  } = useDisclosure();
  const {
    isOpen: isOpenDeletePics,
    onOpen: onOpenDeletePics,
    onClose: onCloseDeletePics,
  } = useDisclosure();

  const componentCTX: IPictureCTX = {
    picturesList: picturesList,
    selectedPicture: itemSelected,
    refreshList: refresh,
    isLoading: isLoading,
    setPicturesList: setPicturesList,
    setSelectedPicture: setItemSelected,
    setRefresh: setRefresh,
    setIsLoading: setIsLoading,
    onOpenEditModal: onOpenEditPics,
    onOpenDeleteModal: onOpenDeletePics,
    paginationInfo: paginationInfo,
    setPaginationInfo: setPaginationInfo,
  };

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        setIsLoading(true);
        const response = await getAllPictures(
          user.token,
          paginationInfo?.currentPage,
          paginationInfo?.pageSize,
          paginationInfo?.name
        );

        setPicturesList(response.data.results);
        const paginationObj = {
          totalPages: response.data.totalPages,
          currentPage: response.data.currentPage,
        };

        setPaginationInfo((prevState: any) => {
          return { ...prevState, ...paginationObj };
        });

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchPictures();
  }, [
    refresh,
    paginationInfo?.currentPage,
    paginationInfo?.name,
    paginationInfo?.pageSize,
  ]);

  const onSearchValueChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = (value: string) => {
    setPaginationInfo((prevState: any) => {
      return { ...prevState, name: value, currentPage: 1 };
    });
  };

  const handleEnterSearch = (e: any) => {
    if (e.key === "Enter") {
      handleSearch(searchValue);
    }
  };

  const handleNoSearch = () => {
    setSearchValue(() => {
      setPaginationInfo((prevState: any) => {
        return { ...prevState, currentPage: 1, name: "" };
      });
      return "";
    });
  };

  return (
    <Fragment>
      <PIcturesCTX.Provider value={componentCTX}>
        <Flex w={"100%"} flexDir={"column"} justifyContent={"space-between"}>
          <Flex
            flexDir={"column"}
            position={"relative"}
            overflowY={"auto"}
            sx={{
              "&::-webkit-scrollbar": {
                width: "10px",
                borderRadius: "8px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
            }}
          >
            <Flex
              flexDir={"column"}
              position={"sticky"}
              top={0}
              zIndex={1}
              bg={"white"}
            >
              <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Flex flexDir={"column"}>
                  <HeadingTitle title="Pictures" />
                  <Text fontSize={"sm"} color={"brand.gray.dark"}>
                    Manage your pictures here.
                  </Text>
                </Flex>
                <IconCButton
                  text={"Add file"}
                  icon={<Icon as={PlusCircleIcon} w={4} h={4} />}
                  onClick={onOpenAddPics}
                />
              </Flex>
              <Divider my={4} />
              <SearchBar
                placeHolderText="Search for a picture"
                onSearchValueChange={onSearchValueChange}
                searchValue={searchValue}
                handleEnterSearch={handleEnterSearch}
                handleNoSearch={handleNoSearch}
              />
            </Flex>

            <PicturesShower />
          </Flex>

          <Flex w={"100%"} flexDir={"column"}>
            <Divider />
            <PaginationComponent
              paginationInfo={paginationInfo}
              setPaginationInfo={setPaginationInfo}
            />
          </Flex>
        </Flex>

        <AddPicsModal isOpen={isOpenAddPics} onClose={onCloseAddPics} />
        <DeletePicModal isOpen={isOpenDeletePics} onClose={onCloseDeletePics} />
      </PIcturesCTX.Provider>
    </Fragment>
  );
};
export default Pictures;
