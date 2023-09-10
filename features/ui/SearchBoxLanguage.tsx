import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";

interface SearchBoxLanguageProps {
  searchLanguage: string;
  setSearchLanguage: (value: string) => void;
}

function SearchBoxLanguage({
  searchLanguage,
  setSearchLanguage,
}: SearchBoxLanguageProps) {
  return (
    <InputGroup
      size="md"
      maxWidth="220px"
      pr={0}
      pb={{ base: 4, md: 0 }}
      mr={2}
      mb={{ base: 4, md: 0 }}
    >
      <InputLeftElement pointerEvents="none">
        <SearchIcon color="gray.300" />
      </InputLeftElement>
      <Input
        value={searchLanguage}
        onChange={(e) => setSearchLanguage(e.target.value)}
        placeholder="言語で検索"
      />
      {searchLanguage && (
        <InputRightElement>
          <CloseIcon
            color="gray.300"
            cursor="pointer"
            onClick={() => setSearchLanguage("")}
          />
        </InputRightElement>
      )}
    </InputGroup>
  );
}

export default SearchBoxLanguage;
