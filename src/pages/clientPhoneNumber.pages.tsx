import { Flex, useDisclosure, Text, Icon, Divider } from "@chakra-ui/react";
import { DeviceMobileIcon } from "@heroicons/react/solid";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddClientPhoneModal from "../components/modals/clientsPhoneModals/AddClientPhoneModal";
import DeleteClientPhoneModal from "../components/modals/clientsPhoneModals/DeleteClientPhoneModal";
import UpdateClientPhoneModal from "../components/modals/clientsPhoneModals/UpdateClientPhoneModal";
import PhoneNumTableRows from "../components/tableRows/PhoneNumTableRows";
import {
  IPhoneNumberCTX,
  PhoneNumbersCTX,
} from "../contexts/phoneNumber.context";
import { IPhoneNumber } from "../interfaces/phoneNumber.interfaces";
import { getAllPhoneNumbers } from "../services/phoneNumbers.services";
import IconCButton from "../UI/buttons/IconCButton";
import TableBase from "../UI/TableBase";
import HeadingTitle from "../UI/titles/HeadingTitle";

const tableColumns = [
  { heading: "name", value: "name" },
  { heading: "description", value: "description" },
  { heading: "ApiKey", value: "apiKey" },
];

const ClientPhoneNumber = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState<IPhoneNumber | null>(null);
  const [phoneNumberList, setPhoneNumberList] = useState<IPhoneNumber[] | null>(
    []
  );
  const [isCheckAll, setIsCheckAll] = useState(false);

  const {
    isOpen: isOpenAddPhoneNumber,
    onOpen: onOpenAddPhoneNumber,
    onClose: onCloseAddPhoneNumber,
  } = useDisclosure();
  const {
    isOpen: isOpenEditPhoneNumber,
    onOpen: onOpenEditPhoneNumber,
    onClose: onCloseEditPhoneNumber,
  } = useDisclosure();
  const {
    isOpen: isOpenDeletePhoneNumber,
    onOpen: onOpenDeletePhoneNumber,
    onClose: onCloseDeletePhoneNumber,
  } = useDisclosure();

  const componentCTX: IPhoneNumberCTX = {
    phoneNumberList: phoneNumberList,
    selectedPhoneNumber: itemSelected,
    refreshList: refresh,
    isLoading: isLoading,
    setPhoneNumberList: setPhoneNumberList,
    setSelectedPhoneNumber: setItemSelected,
    setRefresh: setRefresh,
    setIsLoading: setIsLoading,
    onOpenEditModal: onOpenEditPhoneNumber,
    onOpenDeleteModal: onOpenDeletePhoneNumber,
  };

  useEffect(() => {
    const fetchPhoneNumbers = async () => {
      try {
        setIsLoading(true);
        const response = await getAllPhoneNumbers(user.token);
        setPhoneNumberList(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchPhoneNumbers();
  }, [refresh]);

  return (
    <Fragment>
      <PhoneNumbersCTX.Provider value={componentCTX}>
        <Flex w={"100%"} flexDir={"column"} overflow={"auto"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex flexDir={"column"}>
              <HeadingTitle title="Devices" />
              <Text fontSize={"sm"} color={"brand.gray.dark"}>
                Manage your devices list here.
              </Text>
            </Flex>

            <IconCButton
              text={"Add Device"}
              icon={<Icon as={DeviceMobileIcon} w={4} h={4} />}
              onClick={onOpenAddPhoneNumber}
            />
          </Flex>
          <Divider my={4} />
          <Flex>
            <TableBase
              tableColumns={tableColumns}
              isCheckAll={isCheckAll}
              setIsCheckAll={setIsCheckAll}
              loadingTitle={"Loading devices..."}
              isLoading={isLoading}
              list={phoneNumberList}
              emptyTitle={"Device list empty!"}
            >
              <PhoneNumTableRows tableColumns={tableColumns} />
            </TableBase>
          </Flex>
        </Flex>

        <AddClientPhoneModal
          isOpen={isOpenAddPhoneNumber}
          onClose={onCloseAddPhoneNumber}
        />

        <UpdateClientPhoneModal
          isOpen={isOpenEditPhoneNumber}
          onClose={onCloseEditPhoneNumber}
        />

        <DeleteClientPhoneModal
          isOpen={isOpenDeletePhoneNumber}
          onClose={onCloseDeletePhoneNumber}
        />
      </PhoneNumbersCTX.Provider>
    </Fragment>
  );
};
export default ClientPhoneNumber;
