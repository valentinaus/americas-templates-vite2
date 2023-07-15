import { Checkbox, Flex, Tbody, Td, Text, Tooltip, Tr } from "@chakra-ui/react";
import TableOptions from "./TableOptions";
import React, { Fragment, useContext } from "react";
import { UsersCTX } from "../../contexts/users.context";

const UsersTableRows = (props) => {
  const { tableColumns } = props;

  const {
    usersList,
    setSelectedUser: setItemSelected,
    selectedUser: itemSelected,
  } = useContext(UsersCTX);
  return (
    <Tbody>
      {usersList &&
        usersList.map((user, index) => (
          <TableRow
            key={index}
            item={user}
            tableColumns={tableColumns}
            setItemSelected={setItemSelected}
            itemSelected={itemSelected}
          />
        ))}
    </Tbody>
  );
};

const TableRow = ({ tableColumns, item, setItemSelected, itemSelected }) => {
  const { onOpenDeleteModal, onOpenEditModal } = useContext(UsersCTX);

  return (
    <Tr
      /*  w={"6rem"} */
      _hover={{
        background: "brand.gray.extraLight",
      }}
      onClick={() => {
        setItemSelected(item);
      }}
    >
      {tableColumns.map((columnItem, indexx) => (
        <Td
          key={indexx}
          /*  w={"15rem"} */ fontSize="sm"
          color="brand.gray.superDark"
        >
          <Tooltip label={item[`${columnItem.value}`] + ""}>
            <Text
              maxWidth={"11rem"}
              overflow={"hidden"}
              whiteSpace={"nowrap"}
              textOverflow="ellipsis"
            >
              {item[`${columnItem.value}`] + ""}
            </Text>
          </Tooltip>
        </Td>
      ))}

      <Td display={"flex"} justifyContent={"flex-end"}>
        <TableOptions
          editLabel={"Edit User"}
          deleteLabel={"Delete User"}
          onClickEdit={onOpenEditModal}
          onClickDelete={onOpenDeleteModal}
        />
      </Td>
    </Tr>
  );
};
export default UsersTableRows;
