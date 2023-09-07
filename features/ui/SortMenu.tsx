import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { BsSortDown, BsSortDownAlt } from "react-icons/bs";

interface SortMenuProps {
  sort: string;
  setSort: (value: string) => void;
  order: string;
  setPage: (page: number) => void;
}

function SortMenu({ sort, setSort, order, setPage }: SortMenuProps) {
  const handleSortChange = (value: string) => {
    setSort(value);
    setPage(0); // ソート条件が変更されたらページをリセット
  };

  const sortOptions = [
    { value: "title", display: "タイトル" },
    { value: "language", display: "プログラミング言語" },
    { value: "createdAt", display: "作成日時" },
    { value: "updatedAt", display: "更新日時" },
  ];

  return (
    <Menu>
      <MenuButton
        as={Button}
        leftIcon={order === "desc" ? <BsSortDown /> : <BsSortDownAlt />}
        colorScheme="gray"
      >
        {sortOptions.find((opt) => opt.value === sort)?.display}
      </MenuButton>
      <MenuList>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleSortChange(option.value)}
            color={sort === option.value ? "blue.500" : "black"}
          >
            {option.display}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default SortMenu;
