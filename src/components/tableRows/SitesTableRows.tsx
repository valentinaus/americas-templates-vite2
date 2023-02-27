import {
  Checkbox,
  Tag,
  TagLabel,
  Tbody,
  Td,
  Tr,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useContext } from "react";
import { SitesCTX } from "../../contexts/sites.context";
import TableOptions from "./TableOptions";

const SitesTableRows = (props: any) => {
  const { tableColumns } = props;

  const {
    sitesList,
    setSelectedSite: setItemSelected,
    selectedSite: itemSelected,
  } = useContext(SitesCTX);

  return (
    <Tbody>
      {sitesList &&
        sitesList.map((project, index) => (
          <TableRow
            key={index}
            item={project}
            tableColumns={tableColumns}
            setItemSelected={setItemSelected}
            itemSelected={itemSelected}
          />
        ))}
    </Tbody>
  );
};

const TableRow = ({ tableColumns, item, setItemSelected, itemSelected }) => {
  const { onOpenDeleteModal, onOpenEditModal } = useContext(SitesCTX);

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
      {tableColumns.map((columnItem, index) => {
        return (
          <Td
            key={index}
            w={"15rem"}
            fontSize="sm"
            color="brand.gray.superDark"
          >
            {item[`${columnItem.value}`] === null ||
            item[`${columnItem.value}`] === undefined ||
            item[`${columnItem.value}`] === "" ? (
              <Text fontWeight={"600"} color="brand.red.medium">
                {" "}
                Not assigned
              </Text>
            ) : (
              <Fragment>
                {columnItem.heading === "name" ||
                columnItem.heading === "description" ? (
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
                ) : (
                  <Tag variant="subtle" colorScheme="blue" cursor={"default"}>
                    <TagLabel> {item[`${columnItem.value}`] + ""}</TagLabel>
                  </Tag>
                )}
              </Fragment>
            )}
          </Td>
        );
      })}

      <Td display={"flex"} justifyContent={"flex-end"}>
        <TableOptions
          editLabel={"Edit Site"}
          deleteLabel={"Delete Site"}
          onClickEdit={onOpenEditModal}
          onClickDelete={onOpenDeleteModal}
        />
      </Td>
    </Tr>
  );
};
export default SitesTableRows;

// <Tag variant="subtle" colorScheme="cyan">
//             <TagLabel> {item[`${columnItem.value}`] + ""}</TagLabel>
//           </Tag>
