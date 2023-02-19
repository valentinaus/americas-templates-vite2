import { Checkbox, Tbody, Td, Tr, Text } from "@chakra-ui/react";
import React from "react";
import { Fragment } from "react";
import { useContext } from "react";
import { ProjectsCTX } from "../../contexts/projects.context";
import TableOptions from "./TableOptions";

const ProjectsTableRows = (props: any) => {
  const { tableColumns, sitesList, phoneNumberList, templatesList } = props;

  const {
    projectsList,
    setSelectedProject: setItemSelected,
    selectedProject: itemSelected,
  } = useContext(ProjectsCTX);

  return (
    <Tbody>
      {projectsList &&
        projectsList.map((project, index) => (
          <TableRow
            key={index}
            item={project}
            tableColumns={tableColumns}
            setItemSelected={setItemSelected}
            itemSelected={itemSelected}
            sitesList={sitesList}
            phoneNumberList={phoneNumberList}
            templatesList={templatesList}
          />
        ))}
    </Tbody>
  );
};

const TableRow = ({
  tableColumns,
  item,
  setItemSelected,
  itemSelected,
  sitesList,
  phoneNumberList,
  templatesList,
}) => {
  const { onOpenDeleteModal, onOpenEditModal } = useContext(ProjectsCTX);

  const findItemsNames = (itemId, list) => {
    const itemFound = list.find((item) => {
      if (item.id === itemId) {
        return item;
      }
    });

    if (itemFound) {
      return itemFound.name;
    } else {
      return "Not found";
    }
  };

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
          {item[`${columnItem.value}`] === null ||
          item[`${columnItem.value}`] === undefined ||
          item[`${columnItem.value}`] === "" ? (
            <Text fontWeight={"600"} color="brand.red.medium">
              Not assigned
            </Text>
          ) : (
            <Fragment>
              {columnItem.heading === "client phone" ? (
                <Fragment>
                  {findItemsNames(item[`${columnItem.value}`], phoneNumberList)}
                </Fragment>
              ) : columnItem.heading === "site" ? (
                <Fragment>
                  {findItemsNames(item[`${columnItem.value}`], sitesList)}
                </Fragment>
              ) : columnItem.heading === "template" ? (
                <Fragment>
                  {findItemsNames(item[`${columnItem.value}`], templatesList)}
                </Fragment>
              ) :columnItem.heading === "project status" ? (
                <Fragment>
                  {item[`${columnItem.value}`] === true ? "Finished":"Active"}
                </Fragment>
              ) : (
                <Fragment> {item[`${columnItem.value}`] + ""}</Fragment>
              )}
            </Fragment>
          )}
        </Td>
      ))}

      <Td display={"flex"} justifyContent={"flex-end"}>
        <TableOptions
          editLabel={"Edit Project"}
          deleteLabel={"Delete Project"}
          onClickEdit={onOpenEditModal}
          onClickDelete={onOpenDeleteModal}
        />
      </Td>
    </Tr>
  );
};

export default ProjectsTableRows;
