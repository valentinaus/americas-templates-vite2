import {
  Checkbox,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Center,
  Heading,
  Image,
  Icon,
} from "@chakra-ui/react";
import React, { Fragment, useContext } from "react";
import LoadingSpinner from "../components/spinners/LoadingSpinner";
import { UsersCTX } from "../contexts/users.context";

import emptyBox from "../assets/empty-boxx.png";
import { ArchiveIcon } from "@heroicons/react/solid";

const TableBase = (props) => {
  const { tableColumns, loadingTitle, isLoading, list, emptyTitle } = props;

  return (
    <Flex
      w={"full"}
      borderRadius={"8px"}
      border={"1px"}
      borderColor={"brand.gray.superLight"}
      boxShadow={"sm"}
      bg={"brand.gray.XLlight"}
    >
      {isLoading ? (
        <Center
          height={"full"}
          w={"full"}
          justifyContent={"center"}
          alignItems={"center"}
          p={6}
        >
          <Flex
            flexDir={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <LoadingSpinner />
            <Text fontWeight={700} color={"brand.gray.dark"} mt={4}>
              {loadingTitle}
            </Text>
          </Flex>
        </Center>
      ) : (
        <Fragment>
          {list.length > 0 ? (
            <TableContainer
              w={"100%"}
              scrollBehavior="auto"
              sx={{
                "&::-webkit-scrollbar": {
                  width: "10px",
                  borderRadius: "8px",
                  backgroundColor: `rgba(0, 0, 0, 0.05)`,
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: `rgba(0, 0, 0, 0.05)`,
                },
              }}
            >
              <Table variant="simple" size="md" w={"100%"}>
                <Thead>
                  <Tr>
                    {/* <Th>
                  <Checkbox
                    colorScheme={"blue"}
                    mr={4}
                    border={1}
                    borderColor="brand.primary.dark"
                    // isChecked={isCheckAll}
                    // onChange={handleAllChecked}
                  />
                </Th> */}

                    {tableColumns.map((item, index) => (
                      <TableHeadItem key={index} item={item} />
                    ))}
                    <Th
                      display={"flex"}
                      justifyContent={"flex-end"}
                      pr={"4rem"}
                    >
                      <Text
                        textTransform={"capitalize"}
                        color="brand.gray.dark"
                        fontSize={"sm"}
                        fontWeight="semibold"
                        display={"flex"}
                        justifyContent={"center"}
                      >
                        ...
                      </Text>
                    </Th>
                  </Tr>
                </Thead>

                {props.children}
              </Table>
            </TableContainer>
          ) : (
            <Center
              height={"full"}
              w={"full"}
              justifyContent={"center"}
              alignItems={"center"}
              p={6}
            >
              <Flex
                flexDir={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                {/* <Image w={"10rem"} src={emptyBox} /> */}

                <Icon
                  as={ArchiveIcon}
                  w={"10rem"}
                  h={"10rem"}
                  color={"brand.gray.superLight"}
                />
                <Text fontWeight={700} color={"brand.gray.dark"} mt={4}>
                  {emptyTitle}
                </Text>
              </Flex>
            </Center>
          )}
        </Fragment>
      )}
    </Flex>
  );
};

const TableHeadItem = ({ item }) => (
  <Th
    textTransform={"capitalize"}
    color="brand.gray.dark"
    fontSize={"sm"}
    fontWeight="semibold"
  >
    {item.heading}
  </Th>
);

export default TableBase;
