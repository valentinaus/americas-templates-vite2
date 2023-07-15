import {
  Checkbox,
  Flex,
  Tag,
  TagLabel,
  TagRightIcon,
  Tbody,
  Td,
  Text,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useContext } from "react";
import { SitesCTX } from "../../contexts/sites.context";
import { TemplatesCTX } from "../../contexts/templates.context";
import TableOptions from "./TableOptions";
import TemplatesTableOptions from "./TemplatesTableOptions";
import { PencilIcon } from "@heroicons/react/solid";

const TemplatesTableRows = (props: any) => {
  const { tableColumns } = props;

  const {
    templatesList,
    setSelectedTemplate: setItemSelected,
    selectedTemplate: itemSelected,
  } = useContext(TemplatesCTX);

  return (
    <Tbody>
      {templatesList &&
        templatesList.map((template, index) => (
          <TableRow
            key={index}
            item={template}
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
    onOpenAddPicsModal,
    onOpenTemplatDetails,
    onOpenDuplicateModal,
  } = useContext(TemplatesCTX);

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
          /* w={"15rem"} */ fontSize="sm"
          color="brand.gray.superDark"
        >
          {item[`${columnItem.value}`] === null ||
          item[`${columnItem.value}`] === undefined ||
          item[`${columnItem.value}`] === "" ? (
            <Text fontWeight={"600"} color="brand.red.medium">
              Not assigned
            </Text>
          ) : (
            <Fragment>
              {columnItem.heading === "Allow empty" ? (
                <Flex width={"6.5rem"} justifyContent={"center"}>
                  <Tag
                    size="sm"
                    borderRadius="full"
                    variant="solid"
                    cursor={"pointer"}
                    bg={
                      item[`${columnItem.value}`] === true
                        ? "#38A169"
                        : "brand.gray.mediumLight"
                    }
                  >
                    {item[`${columnItem.value}`] === true
                      ? "Allowed"
                      : "Not Allowed"}
                  </Tag>
                </Flex>
              ) : (
                <Text>{item[`${columnItem.value}`] + ""}</Text>
              )}
            </Fragment>
          )}
        </Td>
      ))}

      <Td display={"flex"} justifyContent={"flex-end"}>
        <TemplatesTableOptions
          addPicturesLabel={"Add pictures to template"}
          editLabel={"Edit template"}
          deleteLabel={"Delete Template"}
          detailsLabel={"View template details"}
          duplicateLabel={"Duplicate template"}
          onClickAddPics={onOpenAddPicsModal}
          onClickEdit={onOpenEditModal}
          onClickDelete={onOpenDeleteModal}
          onClickViewDetails={onOpenTemplatDetails}
          onClickDuplicate={onOpenDuplicateModal}
        />
      </Td>
    </Tr>
  );
};
export default TemplatesTableRows;
