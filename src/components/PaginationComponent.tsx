import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Flex,
  Tooltip,
  IconButton,
  Icon,
  Center,
  Text,
} from "@chakra-ui/react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useReducer } from "react";

const types = {
  increment: "INCREMENT",
  decrement: "DECREMENT",
  insert: "INSERT",
  goStart: "GO_START",
  goEnd: "GO_END",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case types.increment: {
      if (state < action.totalPages) {
        let newState = state + 1;

        return newState;
      } else {
        return state;
      }
    }
    case types.decrement: {
      if (state > 0) {
        let newState = state - 1;

        return newState;
      } else {
        return state;
      }
    }
    case types.goStart: {
      if (state > 0) {
        return 1;
      } else {
        return state;
      }
    }
    case types.goEnd: {
      if (state < action.totalPages) {
        let newState = action.totalPages;
        return newState;
      } else {
        return state;
      }
    }

    default: {
      return state;
    }
  }
};

const PaginationComponent = ({ paginationInfo, setPaginationInfo }) => {
  const [pageCounter, dispatch] = useReducer(
    reducer,
    paginationInfo ? paginationInfo.currentPage : 1
  );

  useEffect(() => {
    setPaginationInfo((prevState: any) => {
      return { ...prevState, currentPage: pageCounter };
    });
  }, [pageCounter]);

  return (
    <Flex
      w={"100%"}
      mt={4}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Text
        fontSize={"sm"}
      >{`${paginationInfo.currentPage} of ${paginationInfo.totalPages} pages`}</Text>
      <Flex>
        <Tooltip label={"Start"}>
          <IconButton
            size={"sm"}
            mr={2}
            icon={<Icon as={ChevronDoubleLeftIcon} w={"5"} h={"5"} />}
            fontSize="sm"
            bg="brand.primary.mediumLight"
            // border={"1px"}
            // borderColor={"brand.primary.medium"}
            color={"blue.500"}
            variant="solid"
            fontWeight="medium"
            onClick={() => {
              dispatch({
                type: types.goStart,
              });
            }}
            _hover={{
              bg: "brand.primary.mediumLight",
            }}
            _active={{
              background: "brand.primary.mediumLight",
            }}
            disabled={paginationInfo && pageCounter === 1 ? true : false}
            aria-label={""}
          />
        </Tooltip>

        <Tooltip label={"Previous"}>
          <IconButton
            size={"sm"}
            icon={<Icon as={ChevronLeftIcon} w={"5"} h={"5"} />}
            fontSize="sm"
            bg="brand.primary.mediumLight"
            // border={"1px"}
            // borderColor={"brand.primary.medium"}
            color={"blue.500"}
            variant="solid"
            fontWeight="medium"
            onClick={() => {
              dispatch({ type: types.decrement });
            }}
            _hover={{
              bg: "brand.primary.mediumLight",
            }}
            _active={{
              background: "brand.primary.mediumLight",
            }}
            disabled={paginationInfo && pageCounter === 1 ? true : false}
            aria-label={""}
          />
        </Tooltip>

        <Center
          borderRadius={"4px"}
          bg={"white"}
          mx={2}
          px={2}
          color={"blue.500"}
          fontWeight={"medium"}
        >
          {pageCounter}
        </Center>

        <Tooltip label={"Next"}>
          <IconButton
            size={"sm"}
            icon={<Icon as={ChevronRightIcon} w={"5"} h={"5"} />}
            fontSize="sm"
            bg="brand.primary.mediumLight"
            // border={"1px"}
            // borderColor={"brand.primary.medium"}
            color={"blue.500"}
            variant="solid"
            fontWeight="medium"
            onClick={() => {
              dispatch({
                type: types.increment,
                totalPages: paginationInfo.totalPages,
              });
            }}
            _hover={{
              bg: "brand.primary.mediumLight",
            }}
            _active={{
              background: "brand.primary.mediumLight",
            }}
            disabled={
              paginationInfo && pageCounter === paginationInfo.totalPages
                ? true
                : false
            }
            aria-label={""}
          />
        </Tooltip>

        <Tooltip label={"End"}>
          <IconButton
            size={"sm"}
            ml={2}
            icon={<Icon as={ChevronDoubleRightIcon} w={"5"} h={"5"} />}
            fontSize="sm"
            // border={"1px"}
            // borderColor={"brand.primary.medium"}
            bg="brand.primary.mediumLight"
            color={"blue.500"}
            variant="solid"
            fontWeight="medium"
            onClick={() => {
              dispatch({
                type: types.goEnd,
                totalPages: paginationInfo.totalPages,
              });
            }}
            _hover={{
              bg: "brand.primary.mediumLight",
            }}
            _active={{
              background: "brand.primary.mediumLight",
            }}
            disabled={
              paginationInfo && pageCounter === paginationInfo.totalPages
                ? true
                : false
            }
            aria-label={""}
          />
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default PaginationComponent;
