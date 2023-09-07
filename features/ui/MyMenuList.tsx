import {
  Box,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "../configs/site";

interface Props {
  imageHref: string;
}

const MyMenuList = (props: Props) => {
  const { imageHref } = props;
  const {
    isOpen: isOpenProfileMenu,
    onOpen: onOpenProfileMenu,
    onClose: onCloseProfileMenu,
  } = useDisclosure();

  return (
    <Menu onClose={onCloseProfileMenu}>
      <MenuButton as={Box} cursor="pointer" onClick={() => onOpenProfileMenu()}>
        <Box boxSize="45px" borderRadius="full" overflow="hidden">
          <Image src={imageHref} alt="profile" width={100} height={100} />
        </Box>
      </MenuButton>
      {isOpenProfileMenu && (
        <MenuList
          minW="max"
          bg="white"
          overflow="hidden"
          rounded="lg"
          border="none"
          boxShadow="lg"
        >
          {siteConfig.profileMenu.map((item) => {
            return (
              <CustomMenuItem
                key={item.title}
                title={item.title}
                href={item.href}
              />
            );
          })}
        </MenuList>
      )}
    </Menu>
  );
};

interface CustomMenuItemProps {
  title: string;
  href?: string;
  onClick?: () => void;
}

const CustomMenuItem = (props: CustomMenuItemProps) => {
  const { title, href } = props;
  return (
    <MenuItem
      key={title}
      as={Link}
      href={href}
      bg="transparent"
      px={4}
      fontSize="sm"
      fontWeight="normal"
      color="black"
      whiteSpace="nowrap"
      _hover={{ bg: "blue.800", color: "white" }}
      _active={{ color: "blue.600", textDecoration: "none" }}
      onClick={
        title === "Sign Out" ? () => signOut({ callbackUrl: "/" }) : undefined
      }
    >
      {title}
    </MenuItem>
  );
};

export default MyMenuList;
