import { Box, Flex, Text, Link } from "@chakra-ui/react";

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
        <Box>
          <Link href="/contactme" color="whiteAlpha.800" mr={4} fontSize="xs">
            Contact Me
          </Link>
          <Link
            href="/terms-of-service"
            color="whiteAlpha.800"
            mr={4}
            fontSize="xs"
          >
            利用規約
          </Link>
          <Link href="/privacy-policy" color="whiteAlpha.800" fontSize="xs">
            プライバシーポリシー
          </Link>
        </Box>
        <Text fontSize="xs">
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
