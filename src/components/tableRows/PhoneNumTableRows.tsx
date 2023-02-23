import { CopyIcon } from "@chakra-ui/icons";
import {
  Icon,
  IconButton,
  Tbody,
  Td,
  Tooltip,
  Tr,
  useClipboard,
} from "@chakra-ui/react";
import React, { useContext, Fragment, useEffect } from "react";
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
            key={phoneNum.id}
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
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  useEffect(() => {
    if (item && item.apiKey) {
      setValue(item.apiKey);
    }
  }, []);

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
        <Fragment key={columnItem.heading}>
          {columnItem.heading === "ApiKey" ? (
            <Td
              key={columnItem.heading}
              w={"15rem"}
              fontSize="sm"
              color="brand.gray.superDark"
              cursor={"pointer"}
            >
              {item[`${columnItem.value}`] + ""}

              <Tooltip
                label={hasCopied ? "Copied!" : "Copy apiKey"}
                fontSize={"13px"}
                color={"white"}
                closeDelay={600}
              >
                <IconButton
                  aria-label="copy clipboard"
                  size={"sm"}
                  _hover={{
                    color: "brand.primary.hover",
                    bg: "brand.primary.light",
                  }}
                  _active={{
                    color: "brand.primary.active",
                  }}
                  icon={<CopyIcon />}
                  color={"brand.gray.dark"}
                  ml={2}
                  onClick={onCopy}
                />
              </Tooltip>
            </Td>
          ) : (
            <Td
              key={indexx}
              w={"15rem"}
              fontSize="sm"
              color="brand.gray.superDark"
            >
              {item[`${columnItem.value}`] + ""}
            </Td>
          )}
        </Fragment>
      ))}

      <Td display={"flex"} justifyContent={"flex-end"}>
        <TableOptions
          editLabel={"Edit device"}
          deleteLabel={"Delete device"}
          onClickEdit={onOpenEditModal}
          onClickDelete={onOpenDeleteModal}
        />
      </Td>
    </Tr>
  );
};
export default PhoneNumTableRows;
