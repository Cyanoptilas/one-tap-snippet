import { Box, Flex, Text } from "@chakra-ui/react";
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
          <Link href="/contactme" color="whiteAlpha.800">
            Contact Me
          </Link>
          <Link href="/terms-of-service" color="whiteAlpha.800">
            利用規約
          </Link>
          <Link href="/privacy-policy" color="whiteAlpha.800">
            プライバシーポリシー
          </Link>
        </Flex>
        <Text fontSize="xs" _hover={{ textDecoration: "underline" }}>
          &copy; 2023{" "}
          <Link href="https://twitter.com/cyanoptilas" color="teal.500">
            Cyanoptilas
          </Link>{" "}
          ONE-TAP-SNIPPET
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;
