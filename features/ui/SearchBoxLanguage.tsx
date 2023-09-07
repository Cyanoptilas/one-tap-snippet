import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";

interface SearchBoxLanguageProps {
  searchLanguage: string;
  setSearchLanguage: (value: string) => void;
}

function SearchBoxLanguage({
  searchLanguage,
  setSearchLanguage,
}: SearchBoxLanguageProps) {
  return (
    <InputGroup size="md" maxWidth="220px" pr={4} mb={{ base: 4, md: 0 }}>
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        value={searchLanguage}
        onChange={(e) => setSearchLanguage(e.target.value)}
        placeholder="言語で検索"
      />
    </InputGroup>
  );
}

export default SearchBoxLanguage;
