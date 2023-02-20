import { EditIcon } from "@chakra-ui/icons";
import {
  Checkbox,
  Tbody,
  Td,
  Tr,
  Text,
  Tag,
  TagLabel,
  TagCloseButton,
  TagRightIcon,
  Tooltip,
} from "@chakra-ui/react";
import { PencilAltIcon, PencilIcon } from "@heroicons/react/solid";
import React from "react";
import { Fragment } from "react";
import { useContext } from "react";
import { ProjectsCTX } from "../../contexts/projects.context";
import TableOptions from "./TableOptions";

const ProjectsTableRows = (props: any) => {
  const { tableColumns, sitesList } = props;

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
          />
        ))}
    </Tbody>
  );
};

const TableRow = ({ tableColumns, item, setItemSelected, itemSelected }) => {
  const {
    onOpenDeleteModal,
    onOpenEditModal,
    onOpenChangeStatusModal,
    onOpenDetailsProject,
  } = useContext(ProjectsCTX);

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
              {columnItem.heading === "status" ? (
                <Tag
                  // size="sm"
                  borderRadius="full"
                  variant="solid"
                  cursor={"pointer"}
                  bg={
                    item[`${columnItem.value}`] === true
                      ? "brand.gray.mediumLight"
                      : "#38A169"
                  }
                >
                  <TagLabel>
                    {item[`${columnItem.value}`] === true
                      ? "Completed "
                      : "In progress"}
                  </TagLabel>
                  <Tooltip label={"Change status"}>
                    <TagRightIcon
                      as={PencilIcon}
                      opacity="40%"
                      _hover={{
                        opacity: "100%",
                      }}
                      onClick={onOpenChangeStatusModal}
                    />
                  </Tooltip>
                </Tag>
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
          detailsLabel={"View project details"}
          onClickEdit={onOpenEditModal}
          onClickDelete={onOpenDeleteModal}
          onClickDetails={onOpenDetailsProject}
        />
      </Td>
    </Tr>
  );
};

export default ProjectsTableRows;
