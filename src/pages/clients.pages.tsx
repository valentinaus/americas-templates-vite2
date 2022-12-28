import {
  Divider,
  Flex,
  Icon,
  IconButton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { UserAddIcon } from "@heroicons/react/solid";

import React, { Fragment, useState, useEffect } from "react";

import HeadingTitle from "../UI/titles/HeadingTitle";
import IconCButton from "../UI/buttons/IconCButton";
import UsersTableRows from "../components/tableRows/UsersTableRows";
import SecongTitle from "../UI/titles/SecongTitle";
import MainCard from "../UI/containers/MainCard";
import TableBase from "../UI/TableBase";
import AddUserModal from "../components/modals/usersModals/AddUserModal";
import { IUsers } from "../interfaces/users.interfaces";
import { UsersCTX } from "../contexts/users.context";
import { getAllUsers } from "../services/users.services";
import { useSelector } from "react-redux";
import UpdateUserModal from "../components/modals/usersModals/UpdateUserModal";
import DeleteUserModal from "../components/modals/usersModals/DeleteUserModal";

const tableColumns = [
  { heading: "name", value: "fullName" },
  { heading: "email", value: "email" },
  { heading: "phone Number", value: "phoneNumber" },
];

const Clients = () => {
  const { user } = useSelector((state: any) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [itemSelected, setItemSelected] = useState(null);
  const [usersList, setUsersList] = useState<IUsers[] | null>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const {
    isOpen: isOpenAddUser,
    onOpen: onOpenAddUser,
    onClose: onCloseAddUser,
  } = useDisclosure();
  const {
    isOpen: isOpenEditUser,
    onOpen: onOpenEditUser,
    onClose: onCloseEditUser,
  } = useDisclosure();
  const {
    isOpen: isOpenDeleteUser,
    onOpen: onOpenDeleteUser,
    onClose: onCloseDeleteUser,
  } = useDisclosure();

  const componentCTX = {
    usersList: usersList,
    selectedUser: itemSelected,
    refreshList: refresh,
    isLoading: isLoading,
    setUsersList: setUsersList,
    setSelectedUser: setItemSelected,
    setRefresh: setRefresh,
    setIsLoading: setIsLoading,
    onOpenEditModal: onOpenEditUser,
    onOpenDeleteModal: onOpenDeleteUser,
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await getAllUsers(user.token);
        setUsersList(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchUsers();
  }, [refresh]);

  return (
    <Fragment>
      <UsersCTX.Provider value={componentCTX}>
        <Flex w={"100%"} flexDir={"column"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Flex flexDir={"column"}>
              <HeadingTitle title="Users" />
              <Text fontSize={"sm"} color={"brand.gray.dark"}>
                Manage your users list here.
              </Text>
            </Flex>

            <IconCButton
              text={"Add User"}
              icon={<Icon as={UserAddIcon} w={4} h={4} />}
              onClick={onOpenAddUser}
            />
          </Flex>
          <Divider my={4} />

          <Flex>
            <TableBase
              tableColumns={tableColumns}
              isCheckAll={isCheckAll}
              setIsCheckAll={setIsCheckAll}
              loadingTitle={"Loading users..."}
              isLoading={isLoading}
              list={usersList}
              emptyTitle={"Users list empty!"}
            >
              <UsersTableRows tableColumns={tableColumns} />
            </TableBase>
          </Flex>
        </Flex>

        <AddUserModal isOpen={isOpenAddUser} onClose={onCloseAddUser} />
        <UpdateUserModal isOpen={isOpenEditUser} onClose={onCloseEditUser} />
        <DeleteUserModal
          isOpen={isOpenDeleteUser}
          onClose={onCloseDeleteUser}
        />
      </UsersCTX.Provider>
    </Fragment>
  );
};
export default Clients;
