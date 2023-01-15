import { Checkbox, Tag, TagLabel, Tbody, Td, Tr } from "@chakra-ui/react";
import React, { Fragment } from "react";
import { useContext } from "react";
import { SitesCTX } from "../../contexts/sites.context";
import { TemplatesCTX } from "../../contexts/templates.context";
import TableOptions from "./TableOptions";
import TemplatesTableOptions from "./TemplatesTableOptions";

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
  } = useContext(TemplatesCTX);

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
        <TemplatesTableOptions
          addPicturesLabel={"Add pictures to template"}
          editLabel={"Edit template"}
          deleteLabel={"Delete Template"}
          detailsLabel={"View template details"}
          onClickAddPics={onOpenAddPicsModal}
          onClickEdit={onOpenEditModal}
          onClickDelete={onOpenDeleteModal}
          onClickViewDetails={onOpenTemplatDetails}
        />
      </Td>
    </Tr>
  );
};
export default TemplatesTableRows;
