import { SearchIcon } from "@chakra-ui/icons";
import { Flex, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";

interface SearchBarTypes {
  placeHolderText: string;
  onSearchValueChange: any;
}

const SearchBar = ({
  placeHolderText,
  onSearchValueChange,
}: SearchBarTypes) => {
  return (
    <InputGroup size="md" w="100%" bgColor="white" borderRadius="8px">
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="#AFAFAF" />}
      />
      <Input
        fontSize="sm"
        type="text"
        placeholder={placeHolderText}
        color="brand.gray.superDark"
        onChange={onSearchValueChange}
      />
    </InputGroup>
  );
};
export default SearchBar;
