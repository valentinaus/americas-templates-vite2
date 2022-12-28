import { Tbody, Td, Tr } from "@chakra-ui/react";
import React, { useContext } from "react";
import { PhoneNumbersCTX } from "../../contexts/phoneNumber.context";
import TableOptions from "./TableOptions";

const PhoneNumTableRows = (props: any) => {
  const { tableColumns } = props;
  const {
    phoneNumberList,
    setSelectedPhoneNumber: setItemSelected,
    selectedPhoneNumber: itemSelected,
  } = useContext(PhoneNumbersCTX);

  return (
    <Tbody>
      {phoneNumberList &&
        phoneNumberList.map((phoneNum, index) => (
          <TableRow
            key={index}
            item={phoneNum}
            tableColumns={tableColumns}
            setItemSelected={setItemSelected}
            itemSelected={itemSelected}
          />
        ))}
    </Tbody>
  );
};

const TableRow = ({ tableColumns, item, setItemSelected, itemSelected }) => {
  const { onOpenDeleteModal, onOpenEditModal } = useContext(PhoneNumbersCTX);

  return (
    <Tr
      w={"6rem"}
      _hover={{
        background: "brand.gray.extraLight",
      }}
      onClick={() => {
        setItemSelected(item);
      }}
    >
      {/* <Td>
        <Checkbox
          color="brand.primary.dark"
          mr={4}
          border={1}
          borderColor="brand.primary.dark"
          // isChecked={checkedItemList.includes(item.id)}
          // onChange={() => {
          //     handleChecked(item.id);
          // }}
        />
      </Td> */}
      {tableColumns.map((columnItem, indexx) => (
        <Td key={indexx} w={"15rem"} fontSize="sm" color="brand.gray.superDark">
          {item[`${columnItem.value}`] + ""}
        </Td>
      ))}

      <Td display={"flex"} justifyContent={"flex-end"}>
        <TableOptions
          editLabel={"Edit Client Phone"}
          deleteLabel={"Delete Client Phone"}
          onClickEdit={onOpenEditModal}
          onClickDelete={onOpenDeleteModal}
        />
      </Td>
    </Tr>
  );
};
export default PhoneNumTableRows;
