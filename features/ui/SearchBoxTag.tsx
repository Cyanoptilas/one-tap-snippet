import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

interface SearchBoxTagProps {
  searchTag: string;
  setSearchTag: (value: string) => void;
}

function SearchBoxTag({ searchTag, setSearchTag }: SearchBoxTagProps) {
  return (
    <InputGroup
      size="md"
      maxWidth="220px"
      pr={{ base: 0, lg: 4 }}
      pb={2}
      mb={{ base: 4, md: 0 }}
    >
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        placeholder="タグで検索"
        value={searchTag}
        onChange={(e) => setSearchTag(e.target.value)}
      />
    </InputGroup>
  );
}

export default SearchBoxTag;
