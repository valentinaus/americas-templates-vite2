import { SearchIcon } from "@chakra-ui/icons";
import {
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { XCircleIcon } from "@heroicons/react/solid";
import React from "react";

interface SearchBarTypes {
  placeHolderText: string;
  searchValue: string;
  onSearchValueChange: any;
  handleNoSearch: any;
  handleEnterSearch: any;
}

const SearchBar = ({
  placeHolderText,
  searchValue,
  onSearchValueChange,
  handleNoSearch,
  handleEnterSearch,
}: SearchBarTypes) => {
  return (
    <InputGroup size="md" w="100%" bgColor="white" borderRadius="8px" mb={4}>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="#AFAFAF" />}
      />
      <Input
        fontSize="sm"
        type="text"
        placeholder={placeHolderText}
        value={searchValue}
        color="brand.gray.superDark"
        onChange={onSearchValueChange}
        onKeyDown={handleEnterSearch}
      />
      <InputRightElement>
        <IconButton
          m={"0 !important"}
          p={"0 !important"}
          aria-label="Cancel search"
          w={6}
          h={6}
          color="brand.gray.dark"
          bg={"transparent"}
          _hover={{
            color: "brand.primary.hover",
          }}
          _active={{
            color: "brand.primary.active",
          }}
          _focus={{
            outline: "0 !important",
          }}
          icon={
            <Icon
              as={XCircleIcon}
              w={6}
              h={6}
              color={"brand.gray.mediumLight"}
              _hover={{
                color: "brand.gray.dark",
              }}
            />
          }
          onClick={handleNoSearch}
        />
      </InputRightElement>
    </InputGroup>
  );
};
export default SearchBar;
