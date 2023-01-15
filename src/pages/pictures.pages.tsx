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
const Pictures = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<IPicture | null>(null);
  const [picturesList, setPicturesList] = useState<IPicture[] | null>([]);
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
  };

  useEffect(() => {
    const fetchPictures = async () => {
      try {
        setIsLoading(true);
        const response = await getAllPictures(user.token);

        setPicturesList(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchPictures();
  }, [refresh]);

  return (
    <Fragment>
      <PIcturesCTX.Provider value={componentCTX}>
        <Flex w={"100%"} flexDir={"column"}>
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
          <PicturesShower />
        </Flex>

        <AddPicsModal isOpen={isOpenAddPics} onClose={onCloseAddPics} />
        <DeletePicModal isOpen={isOpenDeletePics} onClose={onCloseDeletePics} />
      </PIcturesCTX.Provider>
    </Fragment>
  );
};
export default Pictures;
