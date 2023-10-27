import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

interface SearchBoxProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
}

function SearchBox({ searchValue, setSearchValue }: SearchBoxProps) {
  return (
    <InputGroup size="md" width="200px" mr={2}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder="タグor言語で検索"
        pr={{ base: "1.75rem", lg: "2.0rem" }}
      />
      {searchValue && (
        <InputRightElement>
          <CloseIcon
            color="gray.300"
            cursor="pointer"
            onClick={() => setSearchValue("")}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
}

export default SearchBox;
