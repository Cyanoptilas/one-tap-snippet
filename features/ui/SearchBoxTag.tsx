import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";

interface SearchBoxTagProps {
  searchTag: string;
  setSearchTag: (value: string) => void;
}

function SearchBoxTag({ searchTag, setSearchTag }: SearchBoxTagProps) {
  return (
    <InputGroup
      size="md"
      maxWidth="220px"
      mr={2}
    >
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        placeholder="タグで検索"
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
        pr={{ base: "1.75rem", lg: "2.5rem" }}
      />
      {searchTag && (
        <InputRightElement>
          <CloseIcon color="gray.300" cursor="pointer" onClick={() => setSearchTag("")} />
        </InputRightElement>
      )}
    </InputGroup>
  );
}

export default SearchBoxTag;
