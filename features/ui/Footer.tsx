import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import Link from "next/link";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="gray.800"
      color="white"
      height={{ base: "45px", md: "28px" }}
      width="100%"
      display="flex"
      justifyContent="center"
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        justify={{ base: "center", sm: "space-between" }}
        align="center"
        maxW="1200px"
        width="100%"
        px={{ base: 4, md: 6 }}
      >
        <Flex fontSize="xs" width="280px" justify="space-between">
          <Link href="/contactme" passHref>
            <ChakraLink
              color="whiteAlpha.800"
              _hover={{ textDecoration: "underline" }}
            >
              Contact Me
            </ChakraLink>
          </Link>
          <Link href="/terms-of-service" passHref>
            <ChakraLink
              color="whiteAlpha.800"
              _hover={{ textDecoration: "underline" }}
            >
              利用規約
            </ChakraLink>
          </Link>
          <Link href="/privacy-policy" passHref>
            <ChakraLink
              color="whiteAlpha.800"
              _hover={{ textDecoration: "underline" }}
            >
              プライバシーポリシー
            </ChakraLink>
          </Link>
        </Flex>

        <Text fontSize="xs">
          &copy; 2023{" "}
          <ChakraLink
            href="https://twitter.com/cyanoptilas"
            mx={2}
            color="teal.500"
            isExternal
            _hover={{ textDecoration: "underline" }}
          >
            Cyanoptilas
          </ChakraLink>{" "}
          ONE-TAP-SNIPPET
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
